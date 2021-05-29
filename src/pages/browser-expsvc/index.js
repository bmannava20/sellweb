'use strict';

require('marko/browser-refresh').enable();
const safeGet = require('just-safe-get');
const csrf = require('../../utils/meCsrfToken');

const doGet = require('./browser-get').doGet;
const doPost = require('./browser-post').doPost;
const setRedirectModule = require('../fe-ajax/redirect-module').setRedirectHeader;

module.exports = function(req, res, next) {
    const isCsrfValidationError = safeGet(req, 'ebay.myEbay.is_csrf_validation_error');

    if (isCsrfValidationError) {
        setRedirectModule(req, res);
        return;
    }


    csrf.generateToken(req)
        .then(token => {
            if (req.method === 'GET') {
                doGet(req, res, token);
            } else if (req.method === 'POST') {
                doPost(req, res, token);
            }
        })
        .catch(next);
};
