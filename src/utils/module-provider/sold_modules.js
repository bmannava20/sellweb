'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const isRaptorIO = true;
    const getSoldModules = mesellExpSSEClient.getModules(req, res, path, params, configName, isRaptorIO).getModule;

    const data = {
        modulePromises: {
            soldListingsModule: getSoldModules('SOLDLISTINGSMODULE', 'soldListingsModule'),
            soldRefinementModule: getSoldModules('SOLDREFINEMENTMODULE', 'soldRefinementModule'),
            emptyStateModule: getSoldModules('EMPTYSTATEMODULE', 'emptyStateModule'),
            errorStateModule: getSoldModules('ERRORSTATEMODULE', 'errorStateModule'),
            sellerMessageModule: getSoldModules('SELLERMESSAGEMODULE', 'sellerMessageModule'),
            MadronaAdsModule: getSoldModules('MADRONAADSMODULE', 'MadronaAdsModule')
        }
    };
    return data;
};
