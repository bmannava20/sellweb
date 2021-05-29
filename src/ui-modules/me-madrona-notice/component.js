const safeGet = require('just-safe-get');

module.exports = {
    onMount() {
        const viewedImpressionTracking = safeGet(this.input, ['model', 'cards', [0], 'creatives', [0], 'viewedImpressionTracking']);
        const eventAction = safeGet(this.input, ['model', 'cards', [0], 'creatives', [0], 'viewedImpressionTracking', 'eventAction']);
        if (window.triggerTracking && viewedImpressionTracking && eventAction === 'VIEW') {
            window.triggerTracking('pulsar', viewedImpressionTracking);
        }
    },
    clickHandler(action) {
        if (window.triggerTracking && action.type === 'NAV') {
            window.triggerTracking('pulsar', action.trackingList);
        }
    }
};
