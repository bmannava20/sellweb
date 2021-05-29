'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');
const _get = require('just-safe-get');

module.exports = (req, res, svcPath, params) => {
    const getModule = mesellExpSSEClient.getModules(req, res, svcPath, params).getModule;

    if (!req.query.mockModules) return getModule;

    // Debug/Demo trick:
    // To enable the use of fixture for certain module use "mockModules"
    // Ex 1: ?mockModules=kycAlertsModule$src/ui-modules/app-overview/components/information.json
    // Ex 2: ?mockModules=kycAlertsModule${header:'Some Text'}
    // You can use more than one mock module for different modules separating by `,`
    // If the mock does not have 'model' as first key you can use aother '$'
    const moduleMocks = req.query.mockModules.split(/,/).reduce((obj, module) => {
        const [moduleName, path, subKey = 'model'] = module.split('$');
        let data;
        try {
            data = JSON.parse(path);
        } catch (err) {
            // Do nothing
        }
        obj[moduleName] = { path, data, subKey };

        return obj;
    }, {});

    return function debugGetModule(eventName, moduleName) {
        const mock = moduleMocks[moduleName];

        if (mock) {
            // If we asked to use the mock for this module return it
            return Promise.resolve(mock.data ? mock.data : _get(require(mock.path), mock.subKey));
        }
        // Otherwise return what the service responded
        return getModule(eventName, moduleName);
    };
};
