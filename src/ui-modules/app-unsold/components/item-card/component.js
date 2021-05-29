'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    checkboxHandler(event) {
        this.emit('checkbox-change', event);
    }
    // event.eventData - from me-line-actions
    // event - from usernote
    onEditAddNote() {
        const listingId = safeGet(this, 'input.model.listingId');
        const existingUserNote = safeGet(this, 'input.model.__me.noteToSelf.note.textSpans.0.text');

        const emitData = {
            listingId,
            existingUserNote
        };

        this.emit('onAddNote', emitData);
    }
    onLineActionSelect(e) {
        const targetFn = e.target.getAttribute('data-target-fn').toLowerCase();
        switch (targetFn) {
            case 'addnote':
            case 'editnote':
                this.onEditAddNote();
                break;
            default:
                // do something here?
        }
    }
};
