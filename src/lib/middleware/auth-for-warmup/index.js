/**
 * Created by hakumar on 10/31/16.
 */
'use strict';

const warmupAuth = function() {
    return function(req, res, next) {
        req.mesell = req.mesell || {};
        req.mesell.warmup = false;

        if (req.query._warmup && req.ebay &&
            req.ebay.isInternalRequest()) {
            req.headers.host = 'www.ebay.com';
            req.headers.referer = 'http://www.ebay.com';
            req.mesell.warmup = true;
            // force warmup to HTTPS.
            req.ebay.isSecure = () => true;
            // why: warmup script has bug which is shutting down incorrectly and starts the server in port 8082
            req.setTimeout(0, () => {
                // eslint-disable-next-line no-console
                console.log('request timeout', req.url);
            });
            next();
        } else {
            next(new Error('not a warmup request - fallback to next middleware'));
        }
    };
};

module.exports = {
    warmupByPassAuth: warmupAuth
};
