'use strict';

module.exports = class {
    onInput(input) {
        this.state = input;
    }
    onButtonClick(data) {
        const target = data.target;
        const targetFunc = target.getAttribute('data-target-fn');
        switch (targetFunc) {
            case 'SIO_SEND_OFFER':
                this.processSIOtxnWrapper(target);
                break;
            default:
                break;
        }
    }
    processSIOtxnWrapper(target) {
        const sioUrl = target.getAttribute('data-url');
        this.emit('sio-txn-wrapper', sioUrl);
    }
};
