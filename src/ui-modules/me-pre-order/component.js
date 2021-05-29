'use strict';
const safeGet = require('just-safe-get');
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;

module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            myebayPageContent: input.myebayPageContent
        };
    }
    processSIOtxnWrapper(url) {
        this.getComponent('txn-wrapper').openTxnWrapper(url, 'update-module');
    }
    updatePreOrderPaymentModule() {
        this.getComponent('spinner').showSpinner();

        fetch('/mys/ajx/spa/OVERVIEW')
            .then(response => {
                this.getComponent('spinner').hideSpinner();
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                // update pre Order payment module
                this.setState({
                    model: safeGet(response, 'modules.sioModule')
                });

                this.emit('emptyStatus', {
                    model: safeGet(response, 'modules.emptyStateModule')
                });
            })
            .catch((err) => {
                console.error(err);
                this.getComponent('spinner').hideSpinner();
            });
    }
};
