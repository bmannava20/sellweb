const safeGet = require('just-safe-get');
const queryString = require('query-string');
const logger = require('logging-inc').logger('mesellweb:debug');
const serviceClient = require('service-client-ebay');
const constants = require('../../utils/helpers/constants');
const unsoldCmd = constants.SPA_COMMAND.UNSOLD.COMMAND_NAME;
const unsoldExpsvcPath = constants.EXPSVC_PATH.UNSOLD;
const unsoldWindowUrl = constants.SPA_COMMAND.UNSOLD.WINDOW_URL;
const overviewCmd = constants.SPA_COMMAND.OVERVIEW.COMMAND_NAME;
const overviewWindowUrl = constants.SPA_COMMAND.OVERVIEW.WINDOW_URL;
const overviewExpsvcPath = constants.EXPSVC_PATH.OVERVIEW;
const overviewReloadPath = constants.EXPSVC_PATH.OVERVIEW_RELOAD;
const headerUtil = require('../../utils/helpers/custom-header');
const headerConstants = constants.HEADERS;

function sendError(res, err) {
    const viewModel = {};
    const reqStatus = {
        'msg': 'OK',
        'msgType': '200'
    };

    viewModel.msg = 'ops! something went wrong';
    viewModel.msgType = err.statusCode || err.code || 500;
    viewModel.systemMsg = safeGet(err, 'message');
    viewModel.fullMessage = err.stack;
    logger.debug(`experiance srv response: ${viewModel}`);
    reqStatus.msg = 'oops! something went wrong';
    reqStatus.msgType = '500';
    res.json(reqStatus);
}

module.exports = {
    doGet: (req, res, config, token) => {
        const configModule = {};
        let path = '/';

        let params = {};
        let serviceType = '';
        const action = safeGet(req, 'params.action');
        const actionType = safeGet(req, 'params.actiontype');
        let targetUrl = '';

        if (action && (action).toLowerCase() === 'container_filter'
            || action.toLowerCase() === 'container_sort'
            || action.toLowerCase() === constants.SPA_COMMAND.UNSOLD.RELOAD_MAIN_CONTAINER_ACTION_NAME) {
            configModule.pageName = unsoldCmd;
            serviceType = 'MesellwebExpSvcSortFilter';
            params = actionType && queryString.parse(actionType);
            params.modules = 'UNSOLD';
        } else if (action && (action).toLowerCase() === 'pagination') {
            configModule.pageName = unsoldCmd;
            serviceType = 'MesellwebExpSvcPagination';
            params = actionType && queryString.parse(actionType);
            params.modules = 'UNSOLD';
        } else if (action && ((action).toLowerCase() === 'finishit') || (action).toLowerCase() === 'relistit') {
            serviceType = 'MesellwebExpSvcUpdateFinisIt';
            params.module_groups = 'OVERVIEW';
        } else if (action && (action).toLowerCase() === 'lagacy_preferences') {
            serviceType = 'MesellwebExpSvcUpdateLagacyPreferences';
            params = actionType && queryString.parse(actionType);
        } else if (action && (action).toLowerCase() === 'spa') {
            serviceType = 'MesellwebSPA';
            if (actionType === unsoldCmd) {
                configModule.pageName = unsoldCmd;
                path = unsoldExpsvcPath;
                targetUrl = unsoldWindowUrl;
            } else if (actionType === overviewCmd) {
                configModule.pageName = overviewCmd;
                path = overviewExpsvcPath;
                targetUrl = overviewWindowUrl;
            }
        } else if (action && (action).toLowerCase() === 'overview') {
            serviceType = 'MesellwebSPA';
            configModule.pageName = overviewCmd;
            if (actionType === 'reload') {
                path = overviewReloadPath;
            }
        }

        const redirectURL = headerUtil.createRuUrl(req, targetUrl);

        function mergeCsrfToken(data) {
            if (data && data.modules) {
                data.modules.csrfTokenModule = token;
            }
        }

        serviceClient.context(req)
            .getClient(serviceType)
            .get(
                params
            )
            .header(headerConstants.CUSTOM_HEADER)
            .set(headerConstants.REDIRECT_URL_KEY, `${redirectURL}`)
            .build()
            .path(path)
            .end((err, result) => {
                // logger.debug("experiance srv response: " + JSON.stringify(result.body));
                // logger.debug("experiance error : " + err);
                if (err) {
                    return sendError(res, err);
                }

                const jsonData = safeGet(result, 'body') || {};
                jsonData.modules = (jsonData.modules) ? jsonData.modules : {};
                jsonData.modules.configModule = Object.assign(configModule, config);
                mergeCsrfToken(jsonData);
                res.setHeader('Content-Type', 'application/json');
                res.json(jsonData);
                return true;
            });
        return true;
    }
};
