'use strict';

const safeGet = require('just-safe-get');
const redirect = require('../../../../../../utils/redirect');
const fetch = require('../../../../../../utils/helpers/fetch-wrapper').fetch;
const trackingHelper = require('../../../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    // eslint-disable-next-line
    onCreate(input) {
        this.state = {
            isSingleOrder: !(safeGet(input, 'item.__me.lineItemCountLabel')),
            isLoading: false

        };
    }
    onLineActionSelect(event) {
        const targetEl = event.target;
        const targetFn = targetEl.getAttribute('data-target-fn');
        if (targetFn === 'MARK_PAYMENT_RECEIVED') {
            this.onMarkPaymentReceived(targetEl);
        }
        if (targetFn === 'GET_SHIPPING_TIPS') {
            this.onDelegateShippingTipsModal({ menuButton: event.menuButton });
        }
    }

    processMarkAsPaymentReceived(contractId) {
        const markAsPaidReqBody = {
            contractIds: contractId
        };
        fetch('/mys/ajx/markAsPaid', markAsPaidReqBody, 'POST')
            .then(response => {
                // check if the redirect is set
                if (safeGet(response, 'modules.redirectModule')) {
                    return redirect(response);
                }
                /* some funny logic from markAsPaid service */
                if (response.msgType !== 204 && response.msgType !== '500') {
                    window.location.reload();
                    return;
                }
                this.emit('updateAwaitingPaymentModule', () => {
                    this.setState('isLoading', false);
                });
            })
            .catch(err => {
                console.error(err);
                this.setState('isLoading', false);
            });
    }

    onButtonClickHandler(trackingList, event) {
        // track continue button click
        trackingHelper.emitPulsarTracking(trackingList, true);

        const buttonValue = event.originalEvent.target.getAttribute('data-value');
        if (buttonValue === 'GET_SHIPPING_TIPS') {
            this.onDelegateShippingTipsModal({
                menuButton: this.getEl('actions')
            });
        } else if (buttonValue === 'MARK_PAYMENT_RECEIVED') {
            this.onMarkPaymentReceived(event.originalEvent.target);
        } else if (buttonValue.indexOf('CANCEL') >= 0) {
            this.onDelegateUPICancel();
        }
    }
    onMarkPaymentReceived(targetEl) {
        this.setState('isLoading', true);
        const contractId = targetEl.getAttribute('data-contract-id');
        this.processMarkAsPaymentReceived(contractId);
    }
    onDelegateUPICancel() {
        // Element selector to be passed for the loading and success message
        const data = {
            params: safeGet(this, 'input.item.__me.lineActions.options.0.selections.0.label.action.params'),
            isSingleOrder: this.state.isSingleOrder,
            redirectUrl: safeGet(this, 'input.item.__me.lineActions.options.0.selections.0.label.action.URL'),
            delegateAppUpdate: 'updateAwaitingPaymentModule'
        };
        this.getComponent('upi-overview').showCancelUPIModal(data);
    }
    onDelegateShippingTipsModal(event) {
        this.emit('openShippingTips', event);
    }
};
