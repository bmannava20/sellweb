'use strict';

const template = require('./template.marko');
const upgradebrowsercontent = require('../../../utils/i18n').upgradebrowsercontent;

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    template.render({
        contentMap: upgradebrowsercontent(req, res),
        lassoFlags: res.locals.flags || [],
        warmup: (req.mesell && req.mesell.warmup) || false
    }, res);
};

