'use strict';

module.exports = class {
    onCreate(input) {
        this.state = {
            model: input.model,
            showModal: false
        };
    }

    show() {
        this.state.showModal = true;
    }

    close() {
        this.state.showModal = false;
        this.emit('dialog-close');
    }
};
