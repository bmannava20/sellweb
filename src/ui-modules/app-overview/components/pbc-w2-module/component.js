'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    onCreate(input) {
        this.state = {
            items: safeGet(input, 'model.lineItems'),
            title: safeGet(input, 'model.title'),
            seeAll: safeGet(input, 'model.seeAll'),
            disclaimerText: safeGet(input, 'model.disclaimerText')
        };
    }
    onAppUpdate(e) {
        this.emit('appUpdate', e);
    }
};
