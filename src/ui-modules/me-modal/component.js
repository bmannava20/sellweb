'use strict';

module.exports = class {
    onMount() {
        this.dialog = this.getComponent('me-dialog');
    }

    show() {
        this.dialog.emit('dialog-show');
    }

    close() {
        this.dialog.emit('dialog-close');
    }
};
