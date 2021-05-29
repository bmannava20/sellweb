'use strict';

module.exports = class {
    onInput(input) {
        this.state = {
            isExpanded: false,
            controlText: input.expandLabel
        };
    }
    toggleView() {
        this.state.isExpanded = !this.state.isExpanded;
        this.state.controlText = (this.state.isExpanded) ?
            this.input.collapseLabel : this.input.expandLabel;
    }
};
