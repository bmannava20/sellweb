'use strict';

module.exports = class {
    onInput(input) {
        this.state = input;
    }
    unsoldPageUpdate(data) {
        this.emit('unsoldUpdate', data);
    }
    // event.eventData - from me-line-actions
    onAddNote(event) {
        const data = event.eventData || event;
        // get the add modal
        this.getComponent('addNoteModal').openAddNoteHandler(
            data.listingId,
            data.existingUserNote
        );
    }
};
