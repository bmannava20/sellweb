'use strict';

module.exports = function(req) {
    return {
        'locale': req && req.locality && req.locality.locale ? req.locality.locale : 'en-US'
    };
};
