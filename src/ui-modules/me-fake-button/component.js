'use strict';

const safeGet = require('just-safe-get');
const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');


module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    onInput(input) {
        this.state = input;
    }
    onButtonClick(originalEvent) {
        this.emit('button-click', originalEvent);
        const trackingList = safeGet(this.state, 'action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
    }
};
