'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const getInsightsModules = mesellExpSSEClient.getModules(req, res, path, params, configName).getModule;

    const data = {
        modulePromises: {
            browserTitleModule: getInsightsModules('BROWSERTITLE', 'browserTitleModule'),
            reviseItModule: getInsightsModules('REVISEIT', 'reviseItModule')
        }
    };
    return data;
};
