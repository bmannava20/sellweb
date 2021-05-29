'use strict';

module.exports = class {
    onCreate(input) {
        this.state = {
            model: input,
            showModal: false
        };
    }

    show() {
        this.setState('showModal', true);
    }

    close() {
        this.setState('showModal', false);
    }
};
