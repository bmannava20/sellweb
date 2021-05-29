'use strict';
const safeGet = require('just-safe-get');
const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onButtonClick(trackingList, event) {
        trackingHelper.emitPulsarTracking(trackingList, true);
        if (safeGet(this.input, 'model.callToAction.action.type') === 'OPERATION') {
            this.emit('button-click', {
                target: event.originalEvent.target
            });
        }
    }

    onPrimaryButtonClick(event) {
        const originalEvent = safeGet(event, 'data.meuiNavlinkEvent');
        const target = event.data.meuiNavlinkEvent.target;
        const targetFn = safeGet(this.input, 'model.callToAction.action.name');
        const targetUrl = safeGet(this.input, 'model.callToAction.action.URL');
        target.setAttribute('data-target-fn', targetFn);
        target.setAttribute('data-url', targetUrl);
        // Stop navigation if the action is an operation
        if (safeGet(this.input, 'model.callToAction.action.type') === 'OPERATION') {
            originalEvent.preventDefault();
        }
        this.emit('button-click', {
            target,
            originalEvent
        });
    }
};
