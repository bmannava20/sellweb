'use strict';
const safeGet = require('just-safe-get');
const bulkDeleteUtil = require('../../../../utils/bulk-delete-util');

module.exports = class {
    onInput(input) {
        this.updateDraftListing(input.model);
    }
    updateDraftListing(model) {
        this.state = {
            model: model,
            selectedIdList: [],
            enableMultiSelect: false,
            enableDeleteButton: false
        };
    }
    deleteItems() {
        this.emit('delete-items', this.state.selectedIdList);
    }
    handleMultiSelectClick(e) {
        const items = safeGet(this, 'state.model.draftListings');
        bulkDeleteUtil.handleMultiSelectClick(e, this, items, 'draftId');
    }
    handleSingleCheckboxClick(e) {
        const items = safeGet(this, 'state.model.draftListings');
        bulkDeleteUtil.handleSingleCheckboxClick(e, this, items, 'draftId');
    }
    enableDeleteButton() {
        bulkDeleteUtil.enableDeleteButton(this);
    }
    draftPageUpdate(data) {
        this.emit('draftPageUpdate', data);
    }
};
