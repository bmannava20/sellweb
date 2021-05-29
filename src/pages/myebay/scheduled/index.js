'use strict';
'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const constants = require('../../../utils/helpers/constants');
const expsvcPath = constants.EXPSVC_PATH.SCHEDULED;
const commonModulesExpsvcPath = constants.EXPSVC_PATH.COMMON_MODULES;
const navModuleParams = constants.EXPSVC_PATH.NAV_MODULES_PARAMS;
const pageName = constants.SPA_COMMAND.SCHEDULED.COMMAND_NAME;
const pageModulesDataProvider = require('../../../utils/module-provider/scheduled_modules');
const navModulesDataProvider = require('../../../utils/module-provider/nav');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName,
        expsvcPath,
        commonModulesExpsvcPath,
        navModuleParams,
        pageModulesDataProvider,
        navModulesDataProvider,
        expSvcConfigBean: 'MesellScheduledExpSvcSSE',
        navSvcConfigBean: 'MesellwebExpSvcSSENoTracking',
        lassoFlags: res.locals.flags || []

    });

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
