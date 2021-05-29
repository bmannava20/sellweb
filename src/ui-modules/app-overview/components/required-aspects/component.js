'use strict';
const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;
const safeGet = require('just-safe-get');
const CONSTANTS = require('../../../../utils/helpers/constants');
module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            qaId: input.qaId,
            targetItemCardWidget: undefined
        };
    }
    initiateReqAspectsIframe(data) {
        if (data.targetItemCardWidget) {
            this.state.targetItemCardWidget = data.targetItemCardWidget;
        }
        if (data.dataUrl && this.getComponent('req-aspects-iframe')) {
            this.getComponent('req-aspects-iframe').show(data);
        }
    }
    processSuccess(event) {
        this.state.targetItemCardWidget.showItemCardNotice({
            successMessage: event.successMessage
        });
    }
    updateContainer() {
        this.getComponent('req-aspect-spinner').showSpinner();
        const module = safeGet(this, 'state.qaId');
        fetch(CONSTANTS.SPA_COMMAND.OVERVIEW.SPA_URL)
            .then(response => {
                this.getComponent('req-aspect-spinner').hideSpinner();
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                // update module
                if (module) {
                    this.setState({
                        model: safeGet(response, `modules.${module}`)
                    });
                }

                this.emit('emptyStatus', {
                    model: safeGet(response, 'modules.emptyStateModule')
                });
            })
            .catch(err => {
                console.error(err);
                this.getComponent('req-aspect-spinner').hideSpinner();
            });
    }
};
