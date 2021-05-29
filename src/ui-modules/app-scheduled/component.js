'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const history = require('../../utils/helpers/history');
const redirect = require('../../utils/redirect');
const windowUrl = `${constants.SPA_COMMAND.SCHEDULED.WINDOW_URL}/rf/`;
const safeGet = require('just-safe-get');
// const m = require('./mock-data/data');

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    updateScheduledContainer(eventData) {
        const action = eventData.action;
        const actionParams = eventData.actionParams;
        // show spinner
        this.showSpinner();
        if (!action) {
            return this.errorCallback();
        }
        const ajaxUrl = `${constants.SPA_COMMAND.SCHEDULED.AJAX_URL}/${action}/${actionParams}`;
        try {
            fetch(ajaxUrl, {}, 'GET')
                .then(response => this.successCallback(response, actionParams, ajaxUrl, action))
                .catch((err) => this.errorCallback(err));
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
        const scheduledRefinementModule = safeGet(response, 'modules.scheduledRefinementModule');
        const scheduledListingsModule = safeGet(response, 'modules.scheduledListingsModule');
        const emptyStateModule = safeGet(response, 'modules.emptyStateModule');
        const errorStateModule = safeGet(response, 'modules.errorStateModule');

        this.getComponent('scheduled-refinement').updateRefinementModule(scheduledRefinementModule);
        this.getComponent('scheduled-listing').updateListingModule(scheduledListingsModule);
        this.getComponent('scheduled-empty').updateEmptyModule(emptyStateModule);
        this.getComponent('scheduled-error').updateErrorModule(errorStateModule);

        // set the data in browser history
        const reFreshUrl = `${windowUrl}${actionParams}`;

        // seting the scheduledRefinementModule and scheduledListingsModule in state model and passing it to browser history
        this.state.model.data.modules.scheduledRefinementModule = scheduledRefinementModule;
        this.state.model.data.modules.scheduledListingsModule = scheduledListingsModule;
        this.state.model.data.modules.errorStateModule = errorStateModule;
        this.state.model.data.modules.emptyStateModule = emptyStateModule;

        history.setBrowserHistory(this.state.model.data, ajaxUrl, reFreshUrl);

        if (action === 'pagination') {
            // set focus to first item title anchor
            setTimeout(() => {
                const firstTitleAchor = this.getEl('scheduledContainer').querySelector('.scheduled-item .item-title a');
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
};
