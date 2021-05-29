'use strict';

module.exports = class {
    handleMultiSelectClick(event) {
        this.emit('checkbox-select', event);
    }
    deleteSelectedItems() {
        this.emit('delete-items');
    }
    // open confirmation modal
    openConfirmationModal(event) {
        this.getComponent('confirmationModal').onOpenModal(event);
    }
};
