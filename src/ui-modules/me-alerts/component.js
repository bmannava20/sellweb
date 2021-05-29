'use strict';

module.exports = class {
    openDialog(e) {
        this.emit('openDialog', {
            originalEvent: e.originalEvent
        });
    }
};
