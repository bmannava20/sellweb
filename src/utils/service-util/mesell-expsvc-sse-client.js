'use strict';
const client = require('service-client-ebay');
const Adaptor = require('./adaptor').Adaptor;
const safeGet = require('just-safe-get');
// const Cal = require('cal');

// 1) Get refresh params
// 2) or return default path '/'

module.exports = {
    getModules: function(req, res, path, params, configName = 'MesellwebExpSvcSSE', isRaptorIO = false) {
        if (req.mesell && req.mesell.warmup) {
            return {
                getModule: function() {
                    return new Promise((resolve) => {
                        resolve({});
                    });
                }
            };
        }

        const mesellExpsvcSSEClient = client.context(req).getClient(configName);
        const adaptor = new Adaptor();

        mesellExpsvcSSEClient
            .get(params)
            .path(path)
            .end(adaptor.getHandler());

        return {
            getModule: function(eventName, moduleName) {
                return adaptor.get(eventName)
                    .then(result => {
                        let data;
                        // response structure is different between RaptorIO & existing RaptorSvc
                        if (isRaptorIO) {
                            data = safeGet(result, 'data');
                        } else {
                            data = (moduleName === 'diagInfo') ?
                                safeGet(result, 'data.diagInfo') :
                                result && safeGet(result, `data.modules.${moduleName}`);
                        }

                        if (data) {
                            return data;
                        }
                        // console.error(new Error(`module ${moduleName} not found, event ${eventName}`));
                    })
                    .catch(err => {
                        console.error(err);
                        throw createError({
                            err, moduleName, eventName
                        });
                    });
            }
        };

        function createError({ err, moduleName, eventName }) {
            const message = `module ${moduleName} not found, sse_event ${eventName}`;
            // Cal.createEvent('SSE_Event', message, {
            //     "message": message
            // }).complete();

            return {
                err,
                status: 404,
                details: message
            };
        }
    }
};

