'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');

module.exports = (req, res, svcPath, params) => {
    const getNavModules = mesellExpSSEClient.getModules(req, res, svcPath, params).getModule;

    const data = {
        modulePromises: {
            topNavModule: getNavModules('TOPNAV', 'topNavModule'),
            leftNavModule: getNavModules('LEFTNAV', 'leftNavModule'),
            preferenceModule: getNavModules('PREFERENCE', 'preferenceModule'),
            mfeAdsModule: getNavModules('MFEADS', 'mfeAdsModule'),
            browserTitleModule: getNavModules('BROWSERTITLE', 'browserTitleModule'),
            welcomeScreenModule: getNavModules('WELCOMESCREEN', 'welcomeScreenModule'),
            switchToClassicModule: getNavModules('SWITCHTOCLASSIC', 'switchToClassicModule'),
            switchToAllSellingModule: getNavModules('SWITCHTOALLSELLING', 'switchToAllSellingModule')
        }
    };
    return data;
};
