'use strict';

module.exports = class {
    onMount() {
        const parent = document.getElementById(this.input.draftId);
        parent && parent.querySelector('.delete').focus();
    }
    deleteDraft() {
        this.emit('deleteDraft', {});
    }
    cancelDeleteDraft() {
        this.emit('cancelDeleteDraft', {});
    }
};
