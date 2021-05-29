'use strict';

const pageUtil = require('../controller-util');
const template = require('./template.marko');
const constants = require('../../../utils/helpers/constants');
const insightsReviseModulesDataProvider = require('../../../utils/module-provider/insights-revise_modules');
const insightsSioModulesDataProvider = require('../../../utils/module-provider/insights-sio_modules');
const insightsReturnsModulesDataProvider = require('../../../utils/module-provider/insights-manage-returns_modules');
const insightsOutbackModulesDataProvider = require('../../../utils/module-provider/insights-manage-outback-lots_modules');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // set page view model
    const path = req.path;
    const pathArr = path.split('/');
    if (!pathArr) {
        return;
    }
    const insightsType = pathArr[pathArr.length - 1];
    let pageName, expsvcPath, pageModulesDataProvider, tagName;
    switch (insightsType) {
        case 'revise':
            pageName = constants.SPA_COMMAND.INSIGHTS_REVISE.COMMAND_NAME;
            expsvcPath = constants.EXPSVC_PATH.INSIGHTS_REVISE;
            pageModulesDataProvider = insightsReviseModulesDataProvider;
            tagName = `${insightsType}`;
            break;
        case 'offers-to-buyers':
            pageName = constants.SPA_COMMAND.INSIGHTS_SIO.COMMAND_NAME;
            expsvcPath = constants.EXPSVC_PATH.INSIGHTS_SIO;
            pageModulesDataProvider = insightsSioModulesDataProvider;
            tagName = 'sio';
            break;
        case 'manage-returns':
            pageName = constants.SPA_COMMAND.INSIGHTS_MANAGE_RETURNS.COMMAND_NAME;
            expsvcPath = constants.EXPSVC_PATH.INSIGHTS_MANAGE_RETURNS;
            pageModulesDataProvider = insightsReturnsModulesDataProvider;
            tagName = 'manageReturns';
            break;
        case 'manage-outback-lots':
            pageName = constants.SPA_COMMAND.INSIGHTS_MANAGE_OUTBACK_LOTS.COMMAND_NAME;
            expsvcPath = constants.EXPSVC_PATH.INSIGHTS_MANAGE_OUTBACK_LOTS;
            pageModulesDataProvider = insightsOutbackModulesDataProvider;
            tagName = 'manageOutbackLots';
            break;
        default:
            break;
    }
    const viewModel = pageUtil.processPageRequest(req, res, {
        pageName,
        expsvcPath,
        pageModulesDataProvider,
        expSvcConfigBean: 'MesellwebExpSvcSSE',
        lassoFlags: res.locals.flags || []
    });

    viewModel.data.tagName = tagName;

    pageUtil.getPageTemplate(req, res, viewModel, template);
};
