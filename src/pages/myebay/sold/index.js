'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const constants = require('../../../utils/helpers/constants');
const soldExpsvcPath = constants.EXPSVC_PATH.SOLD;
const commonModulesExpsvcPath = constants.EXPSVC_PATH.COMMON_MODULES;
const navModuleParams = constants.EXPSVC_PATH.NAV_MODULES_PARAMS;
const soldPageName = constants.SPA_COMMAND.SOLD.COMMAND_NAME;
const soldModulesDataProvider = require('../../../utils/module-provider/sold_modules');
const navModulesDataProvider = require('../../../utils/module-provider/nav');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName: soldPageName,
        expsvcPath: soldExpsvcPath,
        commonModulesExpsvcPath: commonModulesExpsvcPath,
        navModuleParams: navModuleParams,
        pageModulesDataProvider: soldModulesDataProvider,
        navModulesDataProvider: navModulesDataProvider,
        expSvcConfigBean: 'MesellSoldExpSvcSSE',
        navSvcConfigBean: 'MesellwebExpSvcSSENoTracking',
        lassoFlags: res.locals.flags || []
    });

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
