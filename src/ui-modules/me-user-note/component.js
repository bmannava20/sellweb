'use strict';

module.exports = class {
    editNote() {
        this.emit('edit-note', {
            listingId: this.input.listingId,
            transactionId: this.input.transactionId,
            index: this.input.index
        });
    }
};
