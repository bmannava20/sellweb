'use strict';
const redirectModule = require('../../../model/error');

module.exports = function() {
    return function authForAjax(req, res, next) {
        if (/^\/mys\/ajx\//.test(req.path)) {
            res.redirect = function() {
                res.json(redirectModule);
            };
        }
        next();
    };
};
