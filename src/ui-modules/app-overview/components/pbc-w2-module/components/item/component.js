'use strict';
const safeGet = require('just-safe-get');
const fetch = require('../../../../../../utils/helpers/fetch-wrapper').fetch;
const trackingHelper = require('../../../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onCreate(input) {
        this.state = {
            showSpinner: false,
            showSuccess: false,
            showError: false,
            pbcItem: input.model,
            listingId: safeGet(input, 'model.listingId'),
            productReferenceId: safeGet(input, 'model.__me.productReferenceId'),
            updateListingProductModule: ''
        };
    }
    showMoreHandler() {
        this.getEl('other-pbc-messages').classList.remove('hide');
        this.getEl('show-more').setAttribute('class', 'hide');
    }
    confirmPBC() {
        // TODO: Add the same page ajax requests in me-fake-button and then remove this code
        const trackingList = safeGet(this.state, 'pbcItem.__me.lineActions.options.0.selections.0.label.action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
        // TODO: Code end

        const pbcBody = {
            productReferenceId: this.state.productReferenceId
        };
        const listingId = safeGet(this, 'state.listingId');
        this.setState('showSpinner', true);

        // Resetting the state in case of retry
        this.setState('showSuccess', false);
        this.setState('showError', false);
        this.setState('updateListingProductModule', '');
        try {
            fetch(`/mys/ajx/revise_pbc/${listingId}`, pbcBody, 'POST')
                .then(resp => this.successCallBack(resp))
                .catch(err => this.errorCallBack(err));
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
    successCallBack(resp) {
        if (!resp.msgType) {
            this.setState('showSpinner', false);
            const updateListingProductModule = safeGet(resp, 'modules.updateListingProductModule');
            const messageType = safeGet(resp, 'modules.updateListingProductModule.updateListingProductMessage.messageType');
            if (messageType === 'SUCCESS') {
                this.setState('showSuccess', true);
                this.setState('updateListingProductModule', updateListingProductModule);
            } else if (messageType === 'ERROR') {
                this.setState('showError', true);
                this.setState('updateListingProductModule', updateListingProductModule);
            }
        } else {
            this.setState('showSpinner', false);
        }
    }
    errorCallBack(err) {
        console.error(err);
        this.setState('showSpinner', false);
    }
};
