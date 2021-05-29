'use strict';
module.exports = class {
    onInput() {
        this.state = {
            showModal: false
        };
    }

    onOpenModal() {
        this.state.showModal = true;
    }

    onCloseModal() {
        this.state.showModal = false;
    }

    onConfirm() {
        this.onCloseModal();
        this.emit('confirm');
    }
};
