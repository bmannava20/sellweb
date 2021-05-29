'use strict';

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    updateListingModule(scheduledListingsModule) {
        this.setState('model', scheduledListingsModule);
    }
    onAddNote(event) {
        const data = event.eventData || event;
        // get the add modal
        this.getComponent('addNoteModal').openAddNoteHandler(data.listingId, data.existingUserNote, data.transactionId);
    }
};
