'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const history = require('../../utils/helpers/history');
const redirect = require('../../utils/redirect');
const windowUrl = `${constants.SPA_COMMAND.ACTIVE.WINDOW_URL}/rf/`;
const safeGet = require('just-safe-get');

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    getActionParams(actionParams) {
        if (actionParams === undefined) {
            const rfIndex = window.location.pathname.lastIndexOf('rf/');
            // slice off 'rfl' from rfIndex
            actionParams = rfIndex >= 0 ?
                window.location.pathname.slice(rfIndex + 3) : constants.SPA_COMMAND.ACTIVE.COMMAND_NAME;
        }
        return actionParams;
    }
    updateActiveContainer(eventData) {
        const action = eventData.action || 'reloadMainContainer';
        const actionParams = this.getActionParams(eventData.actionParams);
        // show spinner
        this.showSpinner();
        if (!action) {
            return this.errorCallback();
        }
        const ajaxUrl = `${constants.SPA_COMMAND.ACTIVE.AJAX_URL}/${action}/${actionParams}`;
        try {
            fetch(ajaxUrl, {}, 'GET')
                .then(response => this.successCallback(response, actionParams, ajaxUrl, action))
                .catch(err => this.errorCallback(err));
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
    successCallback(response, actionParams, ajaxUrl, action) {
        // hide spinner
        this.hideSpinner();

        // check if the redirect is set
        if (safeGet(response, 'modules.redirectModule')) {
            return redirect(response);
        }
        // set state for only update summary and listing module
        const activeSummaryModule = safeGet(response, 'modules.activeSummaryModule');
        const activeListingsModule = safeGet(response, 'modules.activeListingsModule');
        const emptyStateModule = safeGet(response, 'modules.emptyStateModule');
        const errorStateModule = safeGet(response, 'modules.errorStateModule');

        this.getComponent('active-summary').updateSummaryModule(activeSummaryModule);
        this.getComponent('active-listing').updateListingModule(activeListingsModule);
        this.getComponent('active-empty').updateEmptyModule(emptyStateModule);
        this.getComponent('active-error').updateErrorModule(errorStateModule);

        // set the data in browser history
        const reFreshUrl = this.getRefreshUrl(action, actionParams);

        // seting the activeSummaryModule and activeListingsModule in state model and passing it to browser history
        this.state.model.data.modules.activeSummaryModule = activeSummaryModule;
        this.state.model.data.modules.activeListingsModule = activeListingsModule;
        this.state.model.data.modules.errorStateModule = errorStateModule;
        this.state.model.data.modules.emptyStateModule = emptyStateModule;

        history.setBrowserHistory(this.state.model.data, ajaxUrl, reFreshUrl);

        if (action === 'pagination') {
            // set focus to first item title anchor
            setTimeout(() => {
                const firstTitleAchor = this.getEl('activeContainer').querySelector('.active-item .item-title a');
                firstTitleAchor && firstTitleAchor.focus();
            }, 10);
        }
    }
    getRefreshUrl(action, actionParams) {
        actionParams = this.getActionParams(actionParams);
        switch (action) {
            // actionParams can just be 'ACTIVE' or 'sort=...&filter=..&'
            case 'reloadMainContainer':
                return (actionParams === constants.SPA_COMMAND.ACTIVE.COMMAND_NAME) ?
                    `${constants.SPA_COMMAND.ACTIVE.WINDOW_URL}` : `${windowUrl}${actionParams}`;
            default:
                return `${windowUrl}${actionParams}`;
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
};
