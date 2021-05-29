const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    onHandleFilterClick(trackingList, event) {
        const actionParams = event.target.getAttribute('data-action-params');
        const action = event.target.getAttribute('data-action');

        trackingHelper.emitPulsarTracking(trackingList, true);

        this.emit('handleFilterRequest', {
            actionParams: actionParams,
            action: action
        });
    }
};
