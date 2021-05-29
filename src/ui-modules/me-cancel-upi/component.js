'use strict';
const safeGet = require('just-safe-get');
const redirect = require('../../utils/redirect');
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../utils/helpers/constants');

module.exports = class {
    onCreate(input) {
        this.state = {
            showModal: false,
            spinnerBusyLabel: safeGet(input, 'contentMap.spinnerBusyLabel')
        };
    }
    onNavLinkClickAPI(event) {
        event.data.meuiNavlinkEvent.preventDefault();
        // open the Modal
        this.setState('showModal', true);
    }
    showCancelUPIModal(data) {
        this.setState({
            params: data.params,
            isSingleOrder: data.isSingleOrder,
            redirectUrl: data.redirectUrl,
            showModal: true,
            delegateAppUpdate: data.delegateAppUpdate,
            errorCallBack: data.errorCallBack,
            title: safeGet(this, 'input.contentMap.modalContentMap.title.textSpans.0.text'),
            content: safeGet(this, 'input.contentMap.modalContentMap.content.textSpans.0.text'),
            cancelButton: safeGet(this, 'input.contentMap.modalContentMap.cancelButton'),
            continueButton: safeGet(this, 'input.contentMap.modalContentMap.continueButton'),
            continueButtonAction: safeGet(this, 'input.contentMap.modalContentMap.continueButton.textSpans.0.action'),
            closeButton: safeGet(this, 'input.contentMap.modalContentMap.closeButton.textSpans.0.text')
        });
    }
    closeModal() {
        this.setState('showModal', false);
    }
    processCancel() {
        // Close modal
        this.closeModal();
        // Show spinner
        setTimeout(() => {
            this.getComponent('spinner').showSpinner();
        }, 20);

        const requestPayload = this.state.params;
        // Make Post fetch call to Cancel api
        try {
            fetch(constants.SPA_COMMAND.OVERVIEW.OVERVIEW_AJAX_URL.UPI_CANCEL, requestPayload, 'POST')
                .then(resp => this.successHandler(resp))
                .catch((err) => this.errorHandler(err));
        } catch (err) {
            console.error(err);
            this.errorHandler();
        }
    }
    errorHandler(err) {
        console.error(err);
        // Hide spinner
        setTimeout(() => {
            this.getComponent('spinner').hideSpinner();
        }, 10);
        // execute errorCallback ie. Sold page Item need to hide the item action bar if there is an error and show error notice.
        if (this.state.errorCallBack) {
            this.state.errorCallBack();
        }
        // set errorMessage and show the notice
        this.setState({
            loadNotice: true,
            message: safeGet(this, 'input.contentMap.errorMessage')
        });
    }
    successHandler(response) {
        // if the resposne mytype is 500 emit errorHandler
        if (response && response.msgType === '500') {
            this.errorHandler();
        }
        redirect(response);
        // if single item order, redirect to provided url after cancel success call
        if (this.state.isSingleOrder) {
            window.location.href = this.state.redirectUrl;
        } else {
            // if multi item order hide the spinner
            setTimeout(() => {
                this.getComponent('spinner').hideSpinner();
            }, 10);
            // set the set to show success message overlay on order card
            this.setState({
                loadNotice: true,
                message: safeGet(this, 'input.contentMap.successMessage'),
                status: 'confirmation',
                class: 'success-notice'
            });

            // emit event to update app or await payment module on overview
            setTimeout(() => {
                this.setState('loadNotice', false);
                this.emit(this.state.delegateAppUpdate);
            }, 2000);
        }
    }
};
