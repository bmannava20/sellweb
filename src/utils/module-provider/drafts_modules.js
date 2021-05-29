'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const isRaptorIO = true;
    const getDraftModules = mesellExpSSEClient.getModules(req, res, path, params, configName, isRaptorIO).getModule;
    const data = {
        modulePromises: {
            draftRefinementModule: getDraftModules('DRAFTREFINEMENTMODULE', 'draftRefinementModule'),
            draftListingsModule: getDraftModules('DRAFTLISTINGSMODULE', 'draftListingsModule'),
            emptyStateModule: getDraftModules('EMPTYSTATEMODULE', 'emptyStateModule'),
            errorStateModule: getDraftModules('ERRORSTATEMODULE', 'errorStateModule'),
            resellBulkData: getDraftModules('RESELLBULKDATA', 'resellBulkData')
        }
    };
    return data;
};
