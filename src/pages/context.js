'use strict';

const Context = require('runtime-context-ebay');
module.exports = new Proxy({}, {
    get: function(obj, prop) {
        if (!obj[prop] && typeof prop === 'string') {
            obj[prop] = Context.expressHandler('home', {
                controllersDomain: 'pages'
            });
        }
        return obj[prop];
    }
});
