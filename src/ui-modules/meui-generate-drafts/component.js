const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const safeGet = require('just-safe-get');
const CONSTANTS = require('../../utils/helpers/constants');

module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    onButtonClick(e) {
        this.emit('openProgressIndicator', {
            originalEvent: e.originalEvent
        });
    }
    refreshOutbackModule() {
        this.getComponent('outback-lot-spinner').showSpinner();
        fetch(CONSTANTS.SPA_COMMAND.OVERVIEW.SPA_URL)
            .then(response => {
                this.getComponent('outback-lot-spinner').hideSpinner();
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                // update state
                this.setState('updateModule', safeGet(response, 'modules.outbackLotsModule') || {});
            })
            .catch(err => {
                console.error(err);
                this.getComponent('outback-lot-spinner').hideSpinner();
            });
    }
};
