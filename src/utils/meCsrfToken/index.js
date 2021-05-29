/**
 *  csrf is a token generater of for myebay pages.
 *  author: aganeshalingam@ebay.com
 */

'use strict';
const csrf = require('csrf-ebay');
/**
 *
 * @param req
 */
const csrfToken = function(req) {
    const csrfTokenPromise = new Promise((resolve, reject) => {
        csrf.generateToken(req, {
            targetAppName: req.ebay.appContext.appName,
            targetPageName: 'mys_ajax_post'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
    return csrfTokenPromise;
};
/**
 * Main API for my ebay pages.
 * @param req
 * @param configModule
 * @param callback
 */
module.exports.generateToken = csrfToken;
