'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const windowUrl = `${constants.SPA_COMMAND.DRAFTS.WINDOW_URL}/rf/`;
const history = require('../../utils/helpers/history');

module.exports = class {
    onCreate(input) {
        this.state = {
            model: input.model,
            isEditMode: false
        };
    }
    toggleEditMode() {
        this.state.isEditMode = !this.state.isEditMode;
    }
    deleteItems(selectedIdList) {
        const action = 'deleteDrafts';
        const ajaxUrl = `${constants.SPA_COMMAND.DRAFTS.AJAX_URL}${constants.SPA_COMMAND.DRAFTS.DELETE_URL}`;

        const actionParams = constants.SPA_COMMAND.DRAFTS.COMMAND_NAME;
        this.showSpinner();
        fetch(
            ajaxUrl,
            {
                itemIds: selectedIdList
            },
            'POST'
        )
            .then(response => this.successCallback(
                response,
                actionParams,
                ajaxUrl,
                action))
            .catch(err => this.errorCallback(err));
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

    updateDraftContainer(eventData) {
        const action = eventData.action || constants.SPA_COMMAND.DRAFTS.RELOAD_MAIN_CONTAINER_ACTION_NAME;

        const actionParams = this.getActionParams(eventData.actionParams);
        // show spinner
        this.showSpinner();
        if (!action) {
            return this.errorCallback();
        }
        const ajaxUrl = `${constants.SPA_COMMAND.DRAFTS.AJAX_URL}/${action}/${actionParams}`;
        fetch(ajaxUrl, {}, 'GET')
            .then(response =>
                this.successCallback(
                    response,
                    actionParams,
                    ajaxUrl,
                    action
                )
            )
            .catch(err => this.errorCallback(err));
    }

    successCallback(response, actionParams, ajaxUrl, action) {
        const model = this.state.model || {};
        model.data.modules.draftRefinementModule =
            response.modules.draftRefinementModule;
        model.data.modules.draftListingsModule =
            response.modules.draftListingsModule;
        model.data.modules.errorStateModule = response.modules.errorStateModule;
        model.data.modules.emptyStateModule = response.modules.emptyStateModule;
        model.data.modules.resellBulkData = response.modules.resellBulkData;
        this.setState('model', model);
        this.forceUpdate();
        this.hideSpinner();
        // set the data in browser history
        const refreshUrl = this.getRefreshUrl(action, actionParams);
        history.setBrowserHistory(this.state.model.data, ajaxUrl, refreshUrl);
    }
    getActionParams(actionParams) {
        if (actionParams === undefined) {
            const rfIndex = window.location.pathname.lastIndexOf('rf/');
            actionParams =
                rfIndex >= 0
                    ? window.location.pathname.slice(rfIndex + 3)
                    : constants.SPA_COMMAND.DRAFTS.COMMAND_NAME;
        }
        return actionParams;
    }


    // todo: We this function in sold, unsold, active. Need to be added to util

    getRefreshUrl(action, actionParams) {
        actionParams = this.getActionParams(actionParams);
        switch (action) {
            // actionParams can just be 'Drafts' or 'sort=...&filter=..&'
            case 'deleteDrafts':
                return window.location.pathname;
            case 'pagination':
                return `${windowUrl}${actionParams}`;
            default:
                return `${constants.SPA_COMMAND.DRAFTS.WINDOW_URL}`;
        }
    }

    refreshDrafts() {
        // "ajax" reload the page itself, so no need to send additional params
        this.updateDraftContainer({});
    }
};
