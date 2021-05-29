'use strict';
const safeGet = require('just-safe-get');
const trackingHelper = require('../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onCtaClick(trackingList) {
        trackingHelper.emitPulsarTracking(trackingList.trackingList, true);
    }
    processButtonClickOperation(data) {
        const el = data.target;
        const targetFunction = el.getAttribute('data-target-fn');
        switch (targetFunction) {
            case 'AddNote':
            case 'EditNote':
                this.onEditAddNote();
                break;
            default:
                break;
        }
    }
    onEditAddNote() {
        // get the add modal
        const listingId = safeGet(this, 'input.item.itemCard.listingId');
        const existingUserNote = safeGet(this, 'input.item.__me.noteToSelf.note.textSpans.0.text');
        const emitData = {
            listingId,
            existingUserNote
        };

        this.emit('add-note', emitData);
    }
};
