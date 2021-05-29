'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const isRaptorIO = true;
    const getActiveModules = mesellExpSSEClient.getModules(req, res, path, params, configName, isRaptorIO).getModule;

    const data = {
        modulePromises: {
            activeSummaryModule: getActiveModules('ACTIVESUMMARYMODULE', 'activeSummaryModule'),
            activeListingsModule: getActiveModules('ACTIVELISTINGSMODULE', 'activeListingsModule'),
            emptyStateModule: getActiveModules('EMPTYSTATEMODULE', 'emptyStateModule'),
            errorStateModule: getActiveModules('ERRORSTATEMODULE', 'errorStateModule'),
            MadronaAdsModule: getActiveModules('MADRONAADSMODULE', 'MadronaAdsModule'),
            sellerMessageModule: getActiveModules('SELLERMESSAGEMODULE', 'sellerMessageModule')
        }
    };
    return data;
};
