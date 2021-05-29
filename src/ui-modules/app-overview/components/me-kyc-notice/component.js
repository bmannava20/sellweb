'use strict';

module.exports = class {
    onCreate(input) {
        if (input && input.model) {
            input.model.showModal = false;
        }
        this.state = input.model;
    }

    openKycAltersDialog(el) {
        this.focusElOnDialogClose = (el.originalEvent && el.originalEvent.target);
        this.state.showModal = true;
    }

    close() {
        this.state.showModal = false;
        if (this.focusElOnDialogClose) {
            this.focusElOnDialogClose.focus();
        }
    }
};
