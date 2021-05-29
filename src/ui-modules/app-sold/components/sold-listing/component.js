'use strict';

module.exports = class {
    onInput(input) {
        this.state = input;
    }
    showTrackingDetails(data) {
        this.getComponent('tracking-details').show(data.url, data.closeBtnTxt);
    }
    onAddNote(event) {
        const data = event.eventData || event;
        // get the add modal
        this.getComponent('addNoteModal').openAddNoteHandler(data.listingId, data.existingUserNote, data.transactionId);
    }
};
