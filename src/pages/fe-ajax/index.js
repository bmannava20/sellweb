'use strict';

require('marko/browser-refresh').enable();
const safeGet = require('just-safe-get');
const csrf = require('../../utils/meCsrfToken');
const queryUtils = require('./action-items');
const doGet = require('./browser-get').doGet;
const doPost = require('./browser-post').doPost;
const doPut = require('./browser-put').doPut;
const doDelete = require('./browser-delete').doDelete;
const setRedirectModule = require('./redirect-module').setRedirectHeader;
const getConfig = require('../../utils/me-config').getConfig;
const logger = require('logging-inc').logger('mesellweb:debug');
const shSubClient = require('../../services/sh-subscription-service');

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

function wrapGetConfig(res, req, ajaxMethod, token) {
    getConfig((cfgerr, config) => {
        if (cfgerr) {
            return sendError(res, cfgerr);
        }
        ajaxMethod(req, res, config, token);
    }, req);
}

module.exports = function(req, res, next) {
    const isCsrfValidationError = safeGet(req, 'ebay.myEbay.is_csrf_validation_error');

    if (isCsrfValidationError) {
        setRedirectModule(req, res);
    } else if (req.method === 'POST') {
        const actObj = queryUtils.getActionItems(req);
        // LB in prod not allowing DELETE operation so we make a POST call from Client to Node-server and a DELETE
        // operation to exp svc
        if (actObj.action === 'delete_draft') {
            wrapGetConfig(res, req, doDelete);
        } else if (actObj.action === 'revise_pbc') {
            wrapGetConfig(res, req, doPut);
        } else if (actObj.action === 'update_sh_subscription') {
            // Subscribe to seller hub
            const siteId = req.ebay.getSiteId();
            const userId = req.ebay.getAccountId();
            shSubClient.subscribeToSH(req, { siteId, userId });
            wrapGetConfig(res, req, doPost);
        } else {
            wrapGetConfig(res, req, doPost);
        }
    } else if (req.method === 'PUT') {
        wrapGetConfig(res, req, doPut);
    } else if (req.method === 'GET') {
        csrf.generateToken(req)
            .then(token => {
                wrapGetConfig(res, req, doGet, token);
            })
            .catch(next);
    }
};

