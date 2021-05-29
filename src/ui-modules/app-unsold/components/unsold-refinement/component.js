
module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            multiItemSelected: input.multiItemSelected
        };
    }
    handleSortFilterRequest(data) {
        this.emit('unsoldPageUpdate', data);
    }
};
