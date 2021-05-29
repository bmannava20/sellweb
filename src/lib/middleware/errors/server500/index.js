/* eslint-disable */
'use strict';

const logger = require('logging-inc').logger('myebay-error-pages:500');
const env = require('environment-ebay');

const escapeHtml = s => (s + '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', 
    '<': '&lt;', 
    '>': '&gt;',
    '"': '&quot;', 
    "'": '&#39;',
})[m]);

function serverError500(err, req, res, next) {
    if (env.isDev()) {
        console.error(err);
        res.sendStatus(500).send(`<pre>${escapeHtml(err.stack || err)}</pre>`)
        return;
    }

    if (/server-error/.test(req.path)) {
        return next(err);
    }

    const model = {
        url: req.url,
        err: err.stack
    };

    logger.error('error', JSON.stringify(model));
    const module = req.url.substr(req.url.lastIndexOf('/') + 1);
    console.log('error redirect');
    return res.redirect(`/mys/server-error?path=${module}`);
}

module.exports = function() {
    return serverError500;
};

module.exports.serverError500 = serverError500;
