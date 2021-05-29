const trackingUtils = require('./tracking-utils');

function emitPulsarTracking(data, isLink) {
    let trackingList;
    if (!data) {
        return;
    }
    if (isLink) {
        // extract NAVSRC or CLICK tracking list for link tracking
        trackingList = trackingUtils.getTrackingInfoByKind(data, 'NAVSRC') ||
            trackingUtils.getTrackingInfoByKind(data, 'CLICK');
    } else {
        // button doesnt need to extract NAVSRC tracking list, directly pass the trackingData object to pulsar
        trackingList = data;
    }

    if (window.triggerTracking) {
        window.triggerTracking('pulsar', trackingList);
    }
}

module.exports = {
    emitPulsarTracking
};
