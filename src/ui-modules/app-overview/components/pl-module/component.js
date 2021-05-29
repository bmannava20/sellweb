'use strict';
const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;
const safeGet = require('just-safe-get');
const CONSTANTS = require('../../../../utils/helpers/constants');
module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            targetItemCardWidget: undefined
        };
    }
    processPromoteListing(data) {
        if (data.targetItemCardWidget) {
            this.state.targetItemCardWidget = data.targetItemCardWidget;
        }
        if (data.itemId && this.getComponent('overview_promote_listing')) {
            this.getComponent('overview_promote_listing').inputWidget({ 'item_id': data.itemId });
        }
    }
    processPromoteListingsSuccessError(event) {
        this.state.targetItemCardWidget.showItemCardNotice({
            plSuccess: event.success,
            plError: event.error
        });
    }
    updateContainer() {
        this.getComponent('pl-spinner').showSpinner();
        fetch(CONSTANTS.SPA_COMMAND.OVERVIEW.SPA_URL)
            .then(response => {
                this.getComponent('pl-spinner').hideSpinner();
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                // update promote listing module
                this.setState({
                    model: safeGet(response, 'modules.promoteListingModule')
                });

                this.emit('emptyStatus', {
                    model: safeGet(response, 'modules.emptyStateModule')
                });
            })
            .catch((err) => {
                console.error(err);
                this.getComponent('pl-spinner').hideSpinner();
            });
    }
};
