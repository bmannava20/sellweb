'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, path, params, configName) => {
    const isRaptorIO = true;
    const getScheduledModules = mesellExpSSEClient.getModules(req, res, path, params, configName, isRaptorIO).getModule;

    const data = {
        modulePromises: {
            scheduledRefinementModule: getScheduledModules('SCHEDULEDREFINEMENTMODULE', 'scheduledRefinementModule'),
            scheduledListingsModule: getScheduledModules('SCHEDULEDLISTINGSMODULE', 'scheduledListingsModule'),
            emptyStateModule: getScheduledModules('EMPTYSTATEMODULE', 'emptyStateModule'),
            errorStateModule: getScheduledModules('ERRORSTATEMODULE', 'errorStateModule')
        }
    };
    return data;
};
