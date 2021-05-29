'use strict';

module.exports = class {
    onCreate() {
        this.state = {
            delegateEmitEvent: undefined
        };
    }
    openTxnWrapper(sioUrl, delegateEmitEvent) {
        this.state.delegateEmitEvent = delegateEmitEvent;

        this.getComponent('txn-wrapper').emit('txn-wrapper__open', {
            url: sioUrl
        });
    }
    onTxnWrapperClose(e) {
        // emit event when success is retured by close event
        if (e && e.success) {
            this.emit(this.state.delegateEmitEvent);
        }
    }
};
