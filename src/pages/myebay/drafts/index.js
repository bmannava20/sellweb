'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const constants = require('../../../utils/helpers/constants');
const draftsExpsvcPath = constants.EXPSVC_PATH.DRAFTS;
const commonModulesExpsvcPath = constants.EXPSVC_PATH.COMMON_MODULES;
const navModuleParams = constants.EXPSVC_PATH.NAV_MODULES_PARAMS;
const draftsPageName = constants.SPA_COMMAND.DRAFTS.COMMAND_NAME;
const draftsModulesDataProvider = require('../../../utils/module-provider/drafts_modules');
const navModulesDataProvider = require('../../../utils/module-provider/nav');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName: draftsPageName,
        expsvcPath: draftsExpsvcPath,
        commonModulesExpsvcPath: commonModulesExpsvcPath,
        navModuleParams: navModuleParams,
        pageModulesDataProvider: draftsModulesDataProvider,
        navModulesDataProvider: navModulesDataProvider,
        expSvcConfigBean: 'MesellDraftExpSvcSSE',
        navSvcConfigBean: 'MesellwebExpSvcSSENoTracking',
        lassoFlags: res.locals.flags || []
    });

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
