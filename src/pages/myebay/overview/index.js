'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const overviewExpsvcPath = require('../../../utils/helpers/constants').EXPSVC_PATH.OVERVIEW;
const overviewPageName = require('../../../utils/helpers/constants').SPA_COMMAND.OVERVIEW.COMMAND_NAME;
const overViewModulesDataProvider = require('../../../utils/module-provider/overview_modules');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName: overviewPageName,
        expsvcPath: overviewExpsvcPath,
        pageModulesDataProvider: overViewModulesDataProvider,
        expSvcConfigBean: 'MesellwebExpSvcSSE',
        lassoFlags: res.locals.flags || []
    });

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
