'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');
const safeGet = require('just-safe-get');
const spinner = require('../../utils/helpers/spinner');

module.exports = class {
    onCreate(input) {
        this.state = {
            itemId: input.itemId,
            model: input.model,
            token: undefined,
            showModal: input.showModal
        };
    }

    onEmitChannels(media) {
        this.clickShareData(media);
    }
    showShareWidget(data) {
        this.state.itemId = data.itemId;
        this.state.model = undefined;
        this.state.token = undefined;
        this.fetchShareWidgetData(data);
        spinner.show();
    }
    successCallbackForModule(response) {
        // check if the redirect is set
        if (safeGet(response, 'modules.redirectModule')) {
            return this.errorCallback();
        }

        const model = safeGet(response, 'modules.SOCIAL_SHARING');
        if (model) {
            spinner.hide();
            this.state.model = model;
            this.state.showModal = true;
        } else {
            return this.errorCallback();
        }

        const token = safeGet(response, 'modules.csrfTokenModule');
        this.state.token = token;
    }
    errorCallback(err) {
        console.error(err);
        this.state.showModal = false;
        spinner.hide();
    }
    fetchShareWidgetData(data) {
        const ajaxUrl = `${constants.SPA_COMMAND.SOCIAL_SHARE.AJAX_URL}/${data.pageName}/${constants.SPA_COMMAND.SOCIAL_SHARE.MODULE_LOADER}/item_id=${data.itemId}`;

        try {
            fetch(ajaxUrl, {}, 'GET')
                .then(response => this.successCallbackForModule(response))
                .catch((err) => this.errorCallback(err));
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
    clickShareData(media) {
        const dataObject = {
            itemId: this.state.itemId,
            socialShareChannelName: media.charAt(0).toUpperCase() + media.slice(1)
        };
        const ajaxUrl = `${constants.SPA_COMMAND.SOCIAL_SHARE.AJAX_URL}/${constants.SPA_COMMAND.SOCIAL_SHARE.CLICK_SHARE}`;

        try {
            fetch(ajaxUrl, dataObject, 'POST');
        } catch (err) {
            console.error(err);
            this.errorCallback();
        }
    }
};
