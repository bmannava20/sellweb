'use strict';
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const safeGet = require('just-safe-get');
const constants = require('../../utils/helpers/constants');

module.exports = class {
    onCreate(input) {
        this.state = {
            welcomeScreenModule: safeGet(input, 'model'),
            preferencekey: safeGet(input, 'model.preferencekey'),
            preferenceId: safeGet(input, 'model.preferenceId'),
            shPreferencekey: safeGet(input, 'model.shPreferencekey'),
            shPreferenceId: safeGet(input, 'model.shPreferenceId'),
            shPreferenceURL: safeGet(input, 'model.shPreferenceURL'),
            MeSellWelcomeScreenPreference: {},
            showModal: Boolean(safeGet(input, 'model.showWelcomeScreen')),
            suppressPreferenceCall: safeGet(input, 'model.allsellingModel'),
            allSellingLink: safeGet(input, 'model.allSellingLink'),
            checkBoxStatus: ''
        };
    }

    // called on model close
    save() {
        // if overview welcome model return do not make preference call
        if (this.state.suppressPreferenceCall) {
            return false;
        }
        this.savePreference();
        this.setState('showModal', false);
    }

    savePreference() {
        const preferencePayload = {
            [this.state.preferenceId]: {
                // Set preference form check box i.e (true/false) else set it to true
                [this.state.preferencekey]: (this.state.checkBoxStatus === '' ? true : this.state.checkBoxStatus)
            }
        };
        this.state.MeSellWelcomeScreenPreference = preferencePayload;

        const dataObj = this.state.MeSellWelcomeScreenPreference;
        const preferenceURL = `${constants.SPA_COMMAND.PREFERENCE_UPDATE.AJAX_URL}/${constants.SPA_COMMAND.PREFERENCE_UPDATE.ACTION}`;
        fetch(preferenceURL, dataObj, 'POST');
    }

    close() {
        this.setState('showModal', false);
    }

    // On secondary button click
    closeDialog() {
        // Set suppressPreferenceCall to true on secondary button click
        // Don't make save preference call on close
        this.setState('suppressPreferenceCall', safeGet(this.input, 'model.allsellingModel'));
        // close dialog
        this.setState('showModal', false);
    }

    // On checkbox is action
    updatePreference() {
        // Set checkBoxStatus state to read model preference
        if (event.target) {
            this.setState('checkBoxStatus', event.target.checked);
            // Make save preference call
            this.savePreference();
            // Don't make save preference call on close
            this.setState('suppressPreferenceCall', true);
        }
    }
    // make subscription call to opt-out of myebay
    shSubscriptionPref() {
        const dataObject = {
            [this.state.shPreferenceId]: {
                [this.state.shPreferencekey]: true
            }
        };
        fetch(
            `/mys/ajx/${this.state.shPreferenceURL}`,
            dataObject,
            'POST')
            .then(() => {
                if (this.state.allSellingLink) {
                    window.location.href = this.state.allSellingLink;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};
