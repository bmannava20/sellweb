'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const getInsightsModules = mesellExpSSEClient.getModules(req, res, path, params, configName).getModule;

    const data = {
        modulePromises: {
            browserTitleModule: getInsightsModules('BROWSERTITLE', 'browserTitleModule'),
            csrfTokenModule: getInsightsModules('csrfTokenModule', 'csrfTokenModule'),
            outbackLotsModule: getInsightsModules('OUTBACKLOTS', 'outbackLotsModule'),
            outbackProcessingMessageModule: getInsightsModules('OUTBACKPROCESSINGMESSAGE', 'outbackProcessingMessageModule')
        }
    };
    return data;
};
