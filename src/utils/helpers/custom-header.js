'use strict';

module.exports = {
    createRuUrl: function(req, targetUrl) {
        if (!req) {
            return '';
        }

        // if targetUrl is undefined, just default to overview page.
        return `${req.protocol}://${req.headers.host}${targetUrl || '/mys/overview' }`;
    }
};
