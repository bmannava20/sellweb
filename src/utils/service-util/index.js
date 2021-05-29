'use strict';
const safeGet = require('just-safe-get');
const provider = require('service-client-ebay');

function processRequest(payload, req) {
    const client = provider.context(req).getClient(payload.service);
    return new Promise((resolve, reject) => {
        let options = {};

        if (payload.method === 'post' || payload.method === 'put') {
            if (payload.queryParams) {
                options.qs = payload.queryParams;
            }
            if (payload.reqBody) {
                options.body = JSON.stringify(payload.reqBody);
            }
        } else {
            options = payload.queryParams;
        }

        client[payload.method](options)
            .path(payload.svcPath)
            .end((err, response) => {
                if (err) {
                    return reject(err);
                }
                const jsonData = safeGet(response, 'body') || {};
                return resolve(jsonData);
            });
    });
}

module.exports = {
    processRequest
};
