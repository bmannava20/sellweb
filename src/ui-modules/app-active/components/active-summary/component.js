const emitAndFire = require('../../../../utils/helpers/custom-event');

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    handleSortFilterRequest(data) {
        this.emit('activePageUpdate', data);
    }
    updateSummaryModule(activeSummaryModule) {
        this.setState('model', activeSummaryModule);
        // work around on Carousel for issue : https://github.com/eBay/ebayui-core/issues/177
        setTimeout(() => {
            emitAndFire(window, 'resize');
        }, 0);
    }
};
