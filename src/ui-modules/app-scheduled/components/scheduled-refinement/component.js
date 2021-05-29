
module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    handleSortFilterRequest(data) {
        this.emit('scheduledPageUpdate', data);
    }
    updateRefinementModule(scheduledRefinementModule) {
        this.setState('model', scheduledRefinementModule);
    }
};
