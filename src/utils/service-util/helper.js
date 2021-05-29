'use strict';
const safeGet = require('just-safe-get');
const queryString = require('query-string');
const url = require('url');

function getRefreshPageParms(req) {
    const action = safeGet(req, 'params.action');
    const actionType = safeGet(req, 'params.actiontype');
    let params = '/';

    if (action && action.toLowerCase() === 'rf') {
        params = queryString.parse(actionType);
    }
    if (req.showDiag) {
        params = queryString.parse('_showdiag=1');
    }
    if (safeGet(req, 'query.action')) {
        params = url.parse(req.url, true).query;
    }

    return params;
}
module.exports = {
    getRefreshPageParms
};
