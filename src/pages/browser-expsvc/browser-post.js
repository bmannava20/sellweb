'use strict';

const safeGet = require('just-safe-get');
const serviceUtil = require('./util');
const expSvcConstants = require('./constants');
const queryString = require('query-string');

async function doPost(req, res, token) {
    if (Object.keys(req.params).length === 0) {
        return;
    }

    const pageName = safeGet(req, 'params.pageName');
    let action = safeGet(req, 'params.action');
    const actionType = safeGet(req, 'params.actiontype');
    let parsedQs;

    if (!action || !actionType) {
        return;
    }

    action = action.toLowerCase();

    const serviceTypes = [];
    const allRequestPayloads = [];
    let serviceArray = '';
    switch (action) {
        case 'upicancel':
            serviceArray = 'upicancel';
            break;
        case 'delete':
            serviceArray = 'delete';
            break;
        case 'end_listing':
            serviceArray = 'endListingSubmit';
            parsedQs = req.query;
            break;
        case 'lotitems':
            serviceArray = 'bulktool';
            break;
        default:
            break;
    }

    serviceTypes.push(...expSvcConstants.container_config[pageName][serviceArray]);
    serviceTypes.forEach(t => {
        allRequestPayloads.push(expSvcConstants.container_config[t].payload({
            pageName: expSvcConstants.container_config[pageName].pageName,
            queryParams: parsedQs || queryString.parse(actionType),
            reqBody: req.body,
            method: 'post'
        }));
    });

    serviceUtil.processRequests(allRequestPayloads, req, res, pageName, token);
}


module.exports = {
    doPost
};
