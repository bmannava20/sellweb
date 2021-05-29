'use strict';

const redirect = require('../../utils/redirect');
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;

const requestPayload = (op, input) => ({
    bulkUserNotes: [{
        op: op,
        userNote: op === 'UPSERT' ? input.note : '',
        listingId: input.listingId,
        transactionId: input.transactionId || -1
    }]
});

module.exports = class {
    onInput() {
        this.state = {
            characterLimit: 255,
            note: '',
            isEditMode: false,
            btnDisabled: true
        };
    }

    onUserNoteChange(userNote) {
        this.setState({
            note: userNote,
            btnDisabled: userNote.length === 0
        });
    }

    openAddNoteHandler(listingId, existingUserNote = '', transactionId) {
        this.setState({
            listingId,
            transactionId,
            note: existingUserNote,
            showModal: true,
            btnDisabled: existingUserNote.length === 0,
            isEditMode: existingUserNote.length !== 0
        });
    }

    closeModal() {
        this.setState('showModal', false);
    }
    processNote(action) {
        const postDataObj = requestPayload(action, this.state);
        try {
            fetch(this.input.spaCommand.ADD_NOTE_URL, postDataObj, 'POST')
                .then(resp => this.successHandler(resp))
                .catch((err) => this.errorHandler(err));
        } catch (err) {
            console.error(err);
            this.errorHandler();
        }
        this.closeModal();
    }

    successHandler(response) {
        if (response && response.msgType === '500') {
            this.errorHandler();
            return;
        }
        redirect(response);
        const spaCommand = this.input.spaCommand;
        const action = spaCommand.RELOAD_MAIN_CONTAINER_ACTION_NAME;
        const rfIndex = window.location.pathname.lastIndexOf('rf/');
        // explicitly add a default space to pass the if check in meui-items component.js
        // This is being done to reload the main container when a note is added.
        const actionParams = rfIndex >= 0 ?
            window.location.pathname.slice(rfIndex + 3) : spaCommand.COMMAND_NAME;
        this.emit('addNote', { action, actionParams });
    }

    errorHandler(err) {
        console.error(err);
        // TODO: show some message?
    }
};
