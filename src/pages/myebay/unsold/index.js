'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const constants = require('../../../utils/helpers/constants');
const unsoldExpsvcPath = require('../../../utils/helpers/constants').EXPSVC_PATH.UNSOLD;
const commonModulesExpsvcPath = constants.EXPSVC_PATH.COMMON_MODULES;
const unsoldPageName = require('../../../utils/helpers/constants').SPA_COMMAND.UNSOLD.COMMAND_NAME;
const unsoldModulesDataProvider = require('../../../utils/module-provider/unsold_modules');
const navModulesDataProvider = require('../../../utils/module-provider/nav');
const navModuleParams = constants.EXPSVC_PATH.NAV_MODULES_PARAMS;

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName: unsoldPageName,
        expsvcPath: unsoldExpsvcPath,
        commonModulesExpsvcPath: commonModulesExpsvcPath,
        pageModulesDataProvider: unsoldModulesDataProvider,
        navModulesDataProvider: navModulesDataProvider,
        expSvcConfigBean: 'MesellUnSoldExpSvcSSE',
        navModuleParams: navModuleParams,
        navSvcConfigBean: 'MesellwebExpSvcSSENoTracking',
        lassoFlags: res.locals.flags || []
    });

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
