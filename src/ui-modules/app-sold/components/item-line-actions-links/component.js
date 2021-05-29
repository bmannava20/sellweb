'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    emitTrackingDetails(data) {
        this.emit('emitTrackingDetails', data);
    }
    clickHandler(data) {
        const targetFunc = safeGet(data, 'data.meuiNavlinkState.targetFn');
        switch (targetFunc) {
            case 'ADD_NOTE':
            case 'EDIT_NOTE':
                data.data.meuiNavlinkEvent.preventDefault();
                this.emit('editAddNote');
                break;
            default:
                // do something here?
        }
    }
};
