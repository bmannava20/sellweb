const safeGet = require('just-safe-get');
const { fetch } = require('../../utils/helpers/fetch-wrapper');
const { SPA_COMMAND } = require('../../utils/helpers/constants');
const spinner = require('../../utils/helpers/spinner');

module.exports = class {
    onCreate(input) {
        this.state = {
            fetchError: false,
            itemId: '',
            model: input.model,
            responseError: null,
            showModal: input.showModal,
            title: '',
            token: ''
        };
    }

    showDialog(itemId) {
        this.state.itemId = itemId;
        this.fetchData(itemId);
        spinner.show();
    }

    fetchData(itemId) {
        const ajaxUrl = `${SPA_COMMAND.ACTIVE.ENS_LISTING_URL}?listingIds=${itemId}&usecase=MY_EBAY`;

        try {
            fetch(ajaxUrl, {}, 'GET', true)
                .then(response => {
                    const { errors = [], modules = {}, meta = {} } = response;
                    const responseError = errors[0];
                    const module = modules.END_LISTINGS_EXPERIENCE_MODULE;

                    spinner.hide();
                    this.state.showModal = true;
                    this.state.title = meta.pageTitle;

                    if (responseError) {
                        this.state.responseError = responseError;
                    } else if (!module) {
                        this.state.fetchError = true;
                    } else {
                        this.state.token = modules.csrfTokenModule;
                        this.state.model = module;
                    }
                })
                .catch(err => this.errorCallback(err));
        } catch (err) {
            this.errorCallback(err);
        }
    }

    submit(endReason) {
        const ajaxUrl = `${SPA_COMMAND.ACTIVE.ENS_LISTING_URL}?usecase=MY_EBAY`;
        const dataObject = {
            listingIds: [this.state.itemId],
            endReason
        };

        let data = { error: { textSpans: [{ _type: 'TextSpan', text: this.input.errorLabel }] } };

        spinner.show();
        this.close();

        try {
            fetch(ajaxUrl, dataObject, 'POST')
                .then(response => {
                    const { messageType, title: message } = safeGet(response,
                        'moduleFragments.STATUS_MESSAGE_FRAGMENT.message',
                        {});

                    data = messageType === 'SUCCESS' ? { success: message } : { error: message };
                    spinner.hide();
                    this.emit('update-el-status', data);
                })
                .catch(err => {
                    this.errorCallback(err);
                    this.emit('update-el-status', data);
                });
        } catch (err) {
            this.errorCallback(err);
        }
    }

    close() {
        this.state.fetchError = false;
        this.state.itemId = '';
        this.state.model = null;
        this.state.responseError = null;
        this.state.showModal = false;
        this.state.title = '';
        this.state.token = '';
    }

    errorCallback(err) {
        console.error(err);
        this.state.showModal = false;
        spinner.hide();
    }
};
