'use strict';

const safeGet = require('just-safe-get');
const logger = require('logging-inc').logger('mesellweb:debug');
const svcUtils = require('../../utils/service-util/index');
const expSvcConstants = require('./constants');
const getConfigModulePromise = require('../../utils/me-config').getConfigModulePromise;

function sendError(err, res) {
    const reqStatus = {};
    const viewModel = {
        msg: 'ops! something went wrong',
        msgType: err.statusCode || err.code || 500,
        systemMsg: safeGet(err, 'message') || '',
        fullMessage: err.stack
    };
    logger.error('experiance srv response:', viewModel);
    reqStatus.msg = `${'oops! something went wrong error status code:'} ${viewModel.msgType} error message: ${viewModel.systemMsg}`;
    reqStatus.msgType = '500';
    // TODO: Check if setting the status to 500, breaks something?
    res.status(500).json(reqStatus);
}

const isBulkLotsPath = (reqPath) => {
    if (!reqPath) {
        return false;
    }
    return reqPath.toLowerCase().indexOf('lotitems') >= 0;
};

async function processRequests(allRequestPayloads, req, res, pageName, csrftoken) {
    const allPromises = [];
    allRequestPayloads.forEach(payload => {
        allPromises.push(svcUtils.processRequest(payload, req));
        allPromises.push(getConfigModulePromise(expSvcConstants.container_config[pageName].pageName, req));
    });

    try {
        const [...results] = await Promise.all(allPromises);
        const jsonData = {
            modules: {}
        };
        results.forEach(result => {
            const fields = Object.keys(result);

            fields.forEach(field => {
                jsonData[field] = jsonData[field] || {};
                Object.assign(jsonData[field], result[field]);
            });
        });
        Object.assign(jsonData.modules, { csrfTokenModule: csrftoken });

        // check for path to restructure response
        if (isBulkLotsPath(req.path)) {
            res.json(jsonData.modules);
        } else {
            res.json(jsonData);
        }
    } catch (e) {
        sendError(e, res);
    }
}

module.exports = {
    processRequests
};
