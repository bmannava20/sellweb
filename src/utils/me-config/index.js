/* eslint-disable */

'use strict';
const moduleConfig = require('module-config-inc');

function getConfig(callback, req) {
    moduleConfig(module, (err, cfg) => {
        if (err) {
            return callback(err);
        }
        const configModule = {};
        const unsoldPage = {};
        unsoldPage.feAjaxBaseUrl = cfg.get('unsold-page:feAjaxBaseUrl');
        configModule.unsoldPage = unsoldPage;

        const scandalAd = {};
        scandalAd.enable = cfg.get('scandal-ad:enable');
        scandalAd.url = cfg.get('scandal-ad:url');
        configModule.scandalAd = scandalAd;

        const errorPage = {};
        errorPage.pnrUrl = cfg.get('error-page:pnrUrl');
        configModule.errorPage = errorPage;
        configModule.browserUpgrade = cfg.get('error-page:browserUpgrade');
        configModule.EnableSPA = cfg.get("EnableSPA");
        configModule.awaitTimeout = cfg.get("awaitTimeout") || 5000;
        if (isWarmUp(req)) {
            configModule.awaitTimeout = cfg.get("warmupAwaitTimeout");
        }
        return callback(null, configModule);
    });
}

function isWarmUp(req) {
    return req && req.mesell && req.mesell.warmup;
}
function getConfigModulePromise(pageName, req) {
    return new Promise((resolve, reject) => {
        getConfig((cfgerr, config) => {
            if (cfgerr) {
                return reject(cfgerr);
            }
            config.pageName = pageName;
            return resolve({
                modules: {
                    configModule: config
                }
            });
        }, req);
    });
}

module.exports = {
    getConfig,
    getConfigModulePromise
};
