'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const history = require('../../utils/helpers/history');
const redirect = require('../../utils/redirect');
const windowUrl = `${constants.SPA_COMMAND.UNSOLD.WINDOW_URL}/rf/`;
const safeGet = require('just-safe-get');
const bulkDeleteUtil = require('../../utils/bulk-delete-util/index');

module.exports = class {
    onCreate(input) {
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

    handleMultiSelectClick(e) {
        bulkDeleteUtil.handleMultiSelectClick(e, this, null, null, this.listingIdCollection);
    }

    handleSingleCheckboxClick(e) {
        bulkDeleteUtil.handleSingleCheckboxClick(e, this, null, null, this.listingIdCollection);
    }

    getActionParams(actionParams) {
        if (actionParams === undefined) {
            const rfIndex = window.location.pathname.lastIndexOf('rf/');
            actionParams = rfIndex >= 0 ?
                window.location.pathname.slice(rfIndex + 3) : constants.SPA_COMMAND.UNSOLD.COMMAND_NAME;
        }
        return actionParams;
    }

    updateUnsoldContainer(eventData) {
        const action = eventData.action;
        const actionParams = this.getActionParams(eventData.actionParams);

        // show spinner
        this.showSpinner();
        if (!action) {
            return this.errorCallback();
        }
        const ajaxUrl = `${constants.SPA_COMMAND.UNSOLD.AJAX_URL}/${action}/${actionParams}`;

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

        if (response.msgType === '500') {
            return;
        }

        // check if the redirect is set
        if (safeGet(response, 'modules.redirectModule')) {
            return redirect(response);
        }

        // set state for only update summary and listing module
        const unsoldRefinementModule = safeGet(response, 'modules.unsoldRefinementModule');
        const unsoldListingsModule = safeGet(response, 'modules.unsoldListingsModule');
        const emptyStateModule = safeGet(response, 'modules.emptyStateModule');
        const errorStateModule = safeGet(response, 'modules.errorStateModule');

        this.getComponent('unsold-refinement').setState('model', unsoldRefinementModule);
        this.getComponent('unsold-listing').setState('model', unsoldListingsModule);
        this.getComponent('unsold-empty').setState('model', emptyStateModule);
        this.getComponent('unsold-error').setState('model', errorStateModule);

        // set the data in browser history
        const refreshUrl = this.getRefreshUrl(action, actionParams);

        // seting the unsoldListingsModule in state model and passing it to browser history
        this.state.model.data.modules.unsoldRefinementModule = unsoldRefinementModule;
        this.state.model.data.modules.unsoldListingsModule = unsoldListingsModule;
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
                const firstTitleAchor = this.getEl('unsold-container').querySelector('.title a');
                firstTitleAchor && firstTitleAchor.focus();
            }, 10);
        }
    }

    deleteItems() {
        const unsoldToDelete = {};

        const selectedActionParams = this.getEl('unsold-container').querySelector('.me-carousel__pill.selected').getAttribute('data-action-params');
        const action = constants.SPA_COMMAND.UNSOLD.RELOAD_MAIN_CONTAINER_ACTION_NAME;

        // The refetch=true is needed for the refetch of the response after the delete.
        // Once added in all the other services this can be moved to src/pages/browser-expsvc/constants.js as a helper function
        const ajaxUrl = `${constants.SPA_COMMAND.UNSOLD.AJAX_URL}/delete/${selectedActionParams}&refetch=true`;

        const rfIndex = window.location.pathname.lastIndexOf('rf/');
        const actionParams = rfIndex >= 0 ? selectedActionParams : constants.SPA_COMMAND.UNSOLD.COMMAND_NAME;

        unsoldToDelete.listingIds = this.state.selectedIdList;

        try {
            this.showSpinner();
            fetch(ajaxUrl, unsoldToDelete, 'POST')
                .then(response => this.successCallback(response, ajaxUrl, action, actionParams))
                .catch((err) => this.errorCallback(err));
        } catch (err) {
            this.errorCallback(err);
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

    getRefreshUrl(action, actionParams) {
        const selectedActionParams = actionParams || this.getEl('unsold-container').querySelector('.me-carousel__pill.selected').getAttribute('data-action-params');
        switch (action) {
            // actionParams can just be 'unsold' or 'sort=...&filter=..&'
            case constants.SPA_COMMAND.UNSOLD.RELOAD_MAIN_CONTAINER_ACTION_NAME:
                return actionParams === constants.SPA_COMMAND.UNSOLD.COMMAND_NAME ?
                    `${constants.SPA_COMMAND.UNSOLD.WINDOW_URL}` : `${windowUrl}${selectedActionParams}`;
            default:
                return `${windowUrl}${actionParams}`;
        }
    }
};
