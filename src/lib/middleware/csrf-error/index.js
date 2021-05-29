'use strict';

const myebay = {
    'is_csrf_validation_error': true
};

module.exports = function(err, req, res, next) {
    if (req.ebay) {
        req.ebay.myEbay = myebay;
    }
    next();
};
