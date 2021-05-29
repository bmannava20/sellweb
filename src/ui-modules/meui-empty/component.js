'use strict';
const safeGet = require('just-safe-get');
module.exports = class {
    onCreate(input) {
        this.state = {
            'model': safeGet(input, 'model')
        };
    }
    onEmptyStatus(e) {
        const self = this;
        self.setState('model', e.model);
    }
};
