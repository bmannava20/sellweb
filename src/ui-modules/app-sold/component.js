'use strict';
const safeGet = require('just-safe-get');
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const history = require('../../utils/helpers/history');
const redirect = require('../../utils/redirect');
const windowUrl = `${constants.SPA_COMMAND.SOLD.WINDOW_URL}/rf/`;
const bulkDeleteUtil = require('../../utils/bulk-delete-util/index');

module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            selectedIdList: [],
            enableMultiSelect: false,
            enableDeleteButton: false,
            isEditMode: false
        };
    }
    toggleEditMode() {
        this.state.isEditMode = !this.state.isEditMode;
    }
    handleItemActionButtonClick(data) {
        this.getComponent('upi-sold').showSpinner(data);
    }
    handleMultiSelectClick(e) {
        bulkDeleteUtil.handleMultiSelectClick(e, this, null, null, this.orderIdCollection);
    }
    handleSingleCheckboxClick(e) {
        bulkDeleteUtil.handleSingleCheckboxClick(e, this, null, null, this.orderIdCollection);
    }
    updateSoldContainer(eventData) {
        const action = eventData.action;
        const actionParams = this.getActionParams(eventData.actionParams);

        // show spinner
        this.showSpinner();
        if (!action) {
            return this.errorCallback();
        }
        const ajaxUrl = `${constants.SPA_COMMAND.SOLD.AJAX_URL}/${action}/${actionParams}`;
        try {
            fetch(ajaxUrl, {}, 'GET')
                .then(response => this.successCallback(response, ajaxUrl, action, actionParams))
                .catch((err) => this.errorCallback(err));
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
    successCallback(response, ajaxUrl, action, actionParams) {
        // hide spinner
        this.hideSpinner();

        // check if the redirect is set
        if (safeGet(response, 'modules.redirectModule')) {
            return redirect(response);
        }
        // set state for only update summary and listing module
        const soldRefinementModule = safeGet(response, 'modules.soldRefinementModule');
        const soldListingsModule = safeGet(response, 'modules.soldListingsModule');
        const emptyStateModule = safeGet(response, 'modules.emptyStateModule');
        const errorStateModule = safeGet(response, 'modules.errorStateModule');

        this.getComponent('sold-refinement').setState('model', soldRefinementModule);
        this.getComponent('sold-listing').setState('model', soldListingsModule);
        this.getComponent('sold-empty').setState('model', emptyStateModule);
        this.getComponent('sold-error').setState('model', errorStateModule);

        // set the data in browser history
        const refreshUrl = this.getRefreshUrl(action, actionParams);

        // seting the soldSummaryModule and soldListingsModule in state model and passing it to browser history
        this.state.model.data.modules.soldRefinementModule = soldRefinementModule;
        this.state.model.data.modules.soldListingsModule = soldListingsModule;
        this.state.model.data.modules.errorStateModule = errorStateModule;
        this.state.model.data.modules.emptyStateModule = emptyStateModule;
        this.setState({
            selectedIdList: [],
            enableDeleteButton: false,
            enableMultiSelect: false
        });
        history.setBrowserHistory(this.state.model.data, ajaxUrl, refreshUrl);

        if (action === 'pagination') {
            // set focus to first item title anchor
            setTimeout(() => {
                const firstTitleAchor = this.getEl('soldContainer').querySelector('.item-title a');
                firstTitleAchor && firstTitleAchor.focus();
            }, 10);
        }
    }
    errorCallback(err) {
        console.error(err);
        this.hideSpinner();
    }
    showSpinner() {
        this.getComponent('spinner').showSpinner();
    }
    hideSpinner() {
        this.getComponent('spinner').hideSpinner();
    }
    getActionParams(actionParams) {
        if (actionParams === undefined) {
            const rfIndex = window.location.pathname.lastIndexOf('rf/');
            actionParams = rfIndex >= 0 ?
                window.location.pathname.slice(rfIndex + 3) : constants.SPA_COMMAND.SOLD.COMMAND_NAME;
        }
        return actionParams;
    }
    getRefreshUrl(action, actionParams) {
        actionParams = this.getActionParams(actionParams);
        switch (action) {
            // actionParams can just be 'Sold' or 'sort=...&filter=..&'
            case 'reloadMainContainer':
                return (actionParams === constants.SPA_COMMAND.SOLD.COMMAND_NAME) ?
                    `${constants.SPA_COMMAND.SOLD.WINDOW_URL}` : `${windowUrl}${actionParams}`;
            default:
                return `${windowUrl}${actionParams}`;
        }
    }
    deleteItems() {
        const soldToDelete = {};

        // get applied filter value
        const carouselComponent = this.getComponent('sold-refinement').getComponent('sold-carousel');
        const selectedActionParams = carouselComponent.getEl().querySelector('.me-carousel__pill.selected').getAttribute('data-action-params');
        const action = constants.SPA_COMMAND.SOLD.RELOAD_MAIN_CONTAINER_ACTION_NAME;
        const ajaxUrl = `${constants.SPA_COMMAND.SOLD.AJAX_URL}${constants.SPA_COMMAND.SOLD.DELETE_URL}/${selectedActionParams}`;

        const rfIndex = window.location.pathname.lastIndexOf('rf/');
        const actionParams = rfIndex >= 0 ? selectedActionParams : constants.SPA_COMMAND.SOLD.COMMAND_NAME;

        soldToDelete.orderIds = this.state.selectedIdList;
        try {
            this.showSpinner();
            fetch(ajaxUrl, soldToDelete, 'POST')
                .then(response => this.successCallback(response, ajaxUrl, action, actionParams))
                .catch((err) => this.errorCallback(err));
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
};
