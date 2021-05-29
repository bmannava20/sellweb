'use strict';

module.exports = class {
    onMount() {
        const parent = document.getElementById(this.input.listingId);
        parent && parent.querySelector('.delete').focus();
    }
    deleteitem() {
        this.emit('deleteitem', {});
    }
    cancelDeleteitem() {
        this.emit('cancelDeleteitem', {});
    }
};
