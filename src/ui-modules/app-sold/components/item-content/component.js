'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    emitTrackingDetails(data) {
        this.emit('showTrackingDetails', data);
    }
    emitSoldPageUpdate(data) {
        this.emit('soldPageUpdate', data);
    }
    emitShowLoader() {
        this.emit('show-loader');
    }
    // event.eventData - from me-line-actions
    onEditAddNote() {
        // get the add modal
        const listingId = safeGet(this, 'input.model.itemCard.listingId');
        const transactionId = safeGet(this, 'input.model.transactionId') || safeGet(this, 'input.model.__me.transactionId');
        const existingUserNote = safeGet(this, 'input.model.__me.noteToSelf.note.textSpans.0.text');
        const emitData = {
            listingId,
            transactionId,
            existingUserNote
        };

        this.emit('onAddNote', emitData);
    }
};
