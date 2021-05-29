'use strict';

module.exports = class {
    onHandleItemsPerPageClick(originalEvent) {
        const actionParams = originalEvent.selected[0];
        const action = 'pagination';
        // setting activeElement.blur to remove the focus from element anchor
        // ebay-select element is moving the focus from selection option to the input element,
        // set timeout will give enough time to set the final focus, then blur it, so that window scroll can appy successfully
        // fix for MEBS-7319
        setTimeout(() => {
            document.activeElement.blur();
            this.handlePaginationRequest(actionParams, action);
        }, 0);
    }
    onHandlePageClick(originalEvent) {
        const actionParams = originalEvent.el.getAttribute('data-url');
        const action = originalEvent.el.getAttribute('data-action');
        // setting el.blur to remove the focus from element anchor
        originalEvent.el.blur();
        this.handlePaginationRequest(actionParams, action);
    }
    handlePaginationRequest(actionParams, action) {
        const data = {
            actionParams: actionParams,
            action: action
        };
        // scroll the page to the top
        window.scrollTo(0, 0);
        this.emit(this.input.eventDelegate, data);
    }
};
