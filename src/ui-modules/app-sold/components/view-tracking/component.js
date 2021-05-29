'use strict';

const safeGet = require('just-safe-get');
const trackingHelper = require('../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onButtonClick() {
        this.emit('emitTrackingDetails', {
            url: safeGet(this.input, 'model.action.URL'),
            closeBtnTxt: 'close'
        });

        // track the click
        const trackingList = safeGet(this.input, 'model.action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
    }
};
