const then = Date.now();

const brogan = require('brogan-ebay');

require('arc-server/install');
require('marko/node-require').install({
    compilerOptions: {
        requireTemplates: true
    }
});

require('app-module-path').addPath(__dirname);
require('lasso/node-require-no-op').enable('.less', '.css'); // Allow non-JS modules to be required on the server

require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg');
// require('lasso/src/reader').DEFAULT_READ_TIMEOUT = 60000;

const lineStr = '\n----------------------------------------------------------------------------\n';

const fs = require('fs');
const express = require('express');
const kraken = require('kraken-js');
const https = require('https');
const env = require('environment-ebay');

const warmup = require('warmup');

// TODO: need to move this to config
const cycleConfig = require('./warmup-urls.json');

const warmupOptions = {
    timeout: 0
};
const cpuWaitTime = 5000;

const options = {
    onconfig: function(config, cb) {
        cb(null, config);
    },
    experienceService: ['mesellexp', 'activesvc', 'draftsvc', 'soldsvc', 'scheduledsvc']
};

const app = express();

app.use(kraken(brogan(app, options)));


async function warmupurls() {
    // eslint-disable-next-line no-console
    console.log('======>>> warmup started');

    for (let index = 0; index < cycleConfig.length; index++) {
        const cycle = cycleConfig[index];
        // eslint-disable-next-line no-console
        console.info('======>>> warmup cycle', cycle);
        // eslint-disable-next-line no-console
        console.info(new Date(), 'warmupCyclesTasks');
        if (env.isNotDev()) {
            const tasks = cycle.map(warmupConfig => ({
                path: warmupConfig.url,
                headers: {
                    'User-Agent': warmupConfig.userAgent
                }
            }));

            // eslint-disable-next-line no-console
            console.info('======>>> warmup tasks', tasks);
            await runWarmupTasks(tasks);
        }
    }
}

function runWarmupTasks(tasks) {
    return new Promise(resolve => {
        warmup(app, tasks, warmupOptions, (err) => {
            // eslint-disable-next-line no-console
            console.info('warmup failed', err);
            // eslint-disable-next-line no-console
            console.info('======>>> warmup tasks done', tasks);

            if (err) {
                // eslint-disable-next-line no-console
                console.info(new Date(), err || err.stack);
            }
            setTimeout(() => {
                // eslint-disable-next-line no-console
                console.info(`CPU cool down ${cpuWaitTime}`);
                return resolve();
            }, cpuWaitTime);
        });
    });
}

async function startup() {
    const [config] = await Promise.all([
        // configuration load
        new Promise(resolve => require('./src/config').onConfigured(resolve)),
        // wait for application startup,
        new Promise(resolve => app.once('start', resolve))
    ]);

    const ssl = app.kraken.get('ssl');

    // prevent warmup during the following:
    // Re - deployment / rollback to the previous build
    // Box nuke via Altus / OPS / Montage
    // Worker restart due to uncaught error or OOM

    const deploymentCheckFile = `.existing-deployment-${process.env.pm_id || 0}`;
    if (env.isNotDev() && !fs.existsSync(deploymentCheckFile)) {
        // eslint-disable-next-line no-console
        console.info('======>>> start warmup');
        await warmupurls();
        fs.writeFileSync(deploymentCheckFile, '');
    }

    // eslint-disable-next-line
    console.log(lineStr);

    await Promise.all([
        // if ssl is enabled, start the ssl server
        (new Promise((resolve, reject) => {
            let sslServer;
            let sslPort = process.env.SSLPORT;
            if (ssl && env.isDev()) {
                sslPort = sslPort || 8443;
                sslServer = https.createServer(ssl, app);
            } else {
                sslPort = sslPort || 8082;
                sslServer = app;
            }

            const svr = sslServer.listen(sslPort, error => {
                if (error) {
                    return reject(error);
                }
                // eslint-disable-next-line
                console.info('Application(HTTPS) Listening on port', svr.address().port);
                return resolve();
            });
        })),
        // start the non ssl server anyways
        new Promise((resolve, reject) => {
            // non-secure port
            const port = config.port || process.env.PORT || 8080;
            app.listen(port, error => {
                if (error) {
                    return reject(error);
                }
                // eslint-disable-next-line
                console.info('Application(HTTP) Listening on port', port);
                return resolve();
            });
        })
    ]);

    // eslint-disable-next-line
    console.log(lineStr);

    // once all servers are started, send the online signal to LB
    if (process.send) {
        process.send('online');
    }
    // eslint-disable-next-line
    console.info(`√ Server started in ${Date.now() - then}ms`);
}

startup();

// Code: For dev purpose only

if (env.isDev() && process.env.DETECT_SWALLOWED_ERRORS) {
    const detectSwallowedErrors = process.env.DETECT_SWALLOWED_ERRORS;
    // Sometimes the platform modules are swallowing errors
    if (detectSwallowedErrors) {
        const _EventEmitter = require('events').EventEmitter;
        const _emit = _EventEmitter.prototype.emit;
        _EventEmitter.prototype.emit = function(type, err) {
            if (type === 'error') {
                const error = `${err.stack || err}`;

                if (!error.match(/(SSL routines.ssl3|Error. connect ETIMEDOUT|Error: socket hang up|ENOENT. no such file or directory)/)) {
                    // eslint-disable-next-line no-console
                    console.log('POTENTIALLY SWALLOWED ERROR', error);
                }
            }
            // eslint-disable-next-line
            return _emit.apply(this, arguments);
        };
    }

    app.use((req, res, next) => {
        if (detectSwallowedErrors) {
            res.on('error', (err) => {
                // eslint-disable-next-line no-console
                console.error('MIDDLEWARE CATCH AN ERROR:', err.stack || err);
            });
        }

        // Sometimes there are redirect that are not clear where they are coming from.
        // In dev we want to see what is going on
        if (!process.env.ENABLE_REDIRECT) {
            res.redirect = function(code, path) {
                if (!path) {
                    path = code;
                    code = 302;
                }
                const trace = `\n${lineStr}${new Error(`A REDIRECT ${code} to "${path}" in development mode was INTECEPTED. This is where the redirect cames from:`).stack}${lineStr}\n`;
                res.send(`<pre>${trace}</pre>`);
                // eslint-disable-next-line no-console
                console.log(trace);
            };
        }

        next();
    });
}
