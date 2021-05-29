'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const isRaptorIO = true;
    const getUnsoldModules = mesellExpSSEClient.getModules(req, res, path, params, configName, isRaptorIO).getModule;

    const data = {
        modulePromises: {
            unsoldListingsModule: getUnsoldModules('UNSOLDLISTINGSMODULE', 'unsoldListingsModule'),
            unsoldRefinementModule: getUnsoldModules('UNSOLDREFINEMENTMODULE', 'unsoldRefinementModule'),
            emptyStateModule: getUnsoldModules('EMPTYSTATEMODULE', 'emptyStateModule'),
            errorStateModule: getUnsoldModules('ERRORSTATEMODULE', 'errorStateModule')
        }
    };
    return data;
};
