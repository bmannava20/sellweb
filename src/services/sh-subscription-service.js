'use strict';

let shSubClient = require('sellerhub-xs-client')('shSubscription', 'generic'); // eslint-disable-line prefer-const

function resolveResponse(resolve, reject, response) {
    const statusCode = response.responseStatus;

    if (statusCode === 201) {
        resolve({});
    } else {
        reject({});
    }
}

function rejectResponse(reject) {
    reject({});
}

module.exports = {
    subscribeToSH: function subscribeToSH(req, options) {
        return new Promise(function(resolve, reject) {
            shSubClient(req)
                .postModulesFor('subscription/SellerHub', {
                    headers: {
                        'X-EBAY-SITEID': options.siteId,
                        'X-EBAY-SELLERID': options.userId
                    },
                    body: JSON.stringify({
                        bypassEPAndWaitlistCheck: true
                    })
                })
                .then(resolveResponse.bind(this, resolve, reject))
                .catch(rejectResponse.bind(this, reject));
        });
    }
};
