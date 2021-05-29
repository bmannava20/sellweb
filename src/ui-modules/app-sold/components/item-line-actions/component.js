'use strict';
const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../../../utils/helpers/constants');
const redirect = require('../../../../utils/redirect');
const safeGet = require('just-safe-get');
const trackingHelper = require('../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onMenuSelection(event) {
        // This is invoked from me-line-actions, hence event.target
        const targetFunc = event.target.getAttribute('data-target-fn');
        switch (targetFunc) {
            case 'ADD_NOTE':
            case 'EDIT_NOTE':
                this.emit('editAddNote');
                break;
            case constants.SPA_COMMAND.OVERVIEW.MARK_AS_PAID_FUNC_NAME:
                this.invokeMarkAsPaid(event);
                break;
            default:
                // do something here?
        }
    }

    onSecondaryBtnClick(trackingList, event) {
        trackingHelper.emitPulsarTracking(trackingList, true);

        if (event.originalEvent) {
            this.onMenuSelection(event.originalEvent);
        }
    }
    invokeMarkAsPaid(event) {
        const markAsPaidData = {
            'contractIds': event.target.getAttribute('data-contract-id')
        };
        const ajaxUrl = `${constants.SPA_COMMAND.DEFAULT_AJAX_URL}/${constants.SPA_COMMAND.OVERVIEW.MARK_AS_PAID_COMMAND_NAME}`;
        this.emit('show-loader');
        try {
            fetch(ajaxUrl, markAsPaidData, 'POST')
                .then(response => this.successHandler(response))
                .catch((err) => this.errorHandler(err));
        } catch (err) {
            console.error(err);
            this.errorHandler();
        }
    }
    successHandler(response) {
        if (safeGet(response, 'modules.redirectModule')) {
            return redirect(response);
        }

        if (response.msgType !== 204 && response.msgType !== '500') {
            return;
        }

        const action = constants.SPA_COMMAND.SOLD.RELOAD_MAIN_CONTAINER_ACTION_NAME;
        // Capture the addl params from the url, so that the right state can be maintained when marking item as paid.
        // E.g. http://localhost/mys/sold/rf/sort=MOST_RECENTLY_SOLD&filter=AWAITING_PAYMENT&limit=25&period=LAST_60_DAYS
        // In this case actionParams should be = 'sort=MOST_RECENTLY_SOLD&filter=AWAITING_PAYMENT&limit=25&period=LAST_60_DAYS'
        // Setting actionParam to either pick from the url or to "SOLD" to trigger the /mys/ajx/:pageName/:action/:actiontype route
        const rfIndex = window.location.pathname.lastIndexOf('rf/');
        const actionParams = rfIndex >= 0 ?
            window.location.pathname.slice(rfIndex + 3) : constants.SPA_COMMAND.SOLD.COMMAND_NAME;

        this.emit('soldPageUpdate', { action, actionParams });
    }
    errorHandler(err) {
        console.error(err);
        // Following overview's logic of just reloading the page in case of error.
        window.location.reload();
    }
};
