'use strict';

const errorTemplate = require('./template.marko');
const i18n = require('../../../utils/i18n').globalerrorpage;

function serverErrorView(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    res.setHeader('Expires', '0');
    res.status(req.mesell.warmup ? 200 : 500);

    const model = {
        prevModule: req.query ? req.query.path : '',
        i18n: i18n(req, res),
        lassoFlags: res.locals.flags || [],
        warmup: (req.mesell && req.mesell.warmup) || false
    };

    res.customPageError = true;

    errorTemplate.render(model, res);
    return true;
}

module.exports = function() {
    return serverErrorView;
};

module.exports.serverErrorView = serverErrorView;
