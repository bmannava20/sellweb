'use strict';

const safeGet = require('just-safe-get');
const trackingHelper = require('../../../../utils/tracking-utils/pulsar-helper');


module.exports = class {
    onCreate(input) {
        this.state = {
            trackingList: safeGet(input, 'model.expiredPromosLink.action.trackingList')
        };
    }
    showExpiredPromos() {
        const trackingList = this.state.trackingList;
        trackingHelper.emitPulsarTracking(trackingList, true);
        this.getComponent('expiredPromoModal').show();
    }
};
