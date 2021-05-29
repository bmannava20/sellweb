'use strict';

const safeGet = require('just-safe-get');
const queryString = require('query-string');
const serviceUtil = require('./util');
const expSvcConstants = require('./constants');

async function doGet(req, res, token) {
    if (Object.keys(req.params).length === 0) {
        return;
    }

    const path = '/';
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
        case 'container_filter':
        case 'container_sort':
        case 'pagination':
        case 'filter':
        case 'sort':
        case 'period':
        case 'reloadmaincontainer':
            serviceArray = 'mainContainerSvc';
            break;
        case 'spa':
        case 'overview_seeall':
            serviceArray = 'spa';
            break;
        case 'container_share':
            serviceArray = 'share';
            break;
        case 'end_listing':
            serviceArray = 'endListingGet';
            parsedQs = req.query;
            break;
        case 'lotitems':
            serviceArray = 'getOrderDetails';
            parsedQs = req.query;
            break;
        default:
            break;
    }

    serviceTypes.push(...expSvcConstants.container_config[pageName][serviceArray]);
    serviceTypes.forEach(t => {
        allRequestPayloads.push(expSvcConstants.container_config[t].payload({
            svcPath: path,
            queryParams: parsedQs || queryString.parse(actionType),
            pageName: expSvcConstants.container_config[pageName].pageName,
            method: 'get'
        }));
    });

    serviceUtil.processRequests(allRequestPayloads, req, res, pageName, token);
}

module.exports = {
    doGet
};
