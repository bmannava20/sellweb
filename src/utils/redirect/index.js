'use  strict';

const safeGet = require('just-safe-get');

module.exports = function(data) {
    const redirectModule = safeGet(data, 'modules.redirectModule');
    // session expiration
    if (redirectModule) {
        window.location.reload();
    }
};
