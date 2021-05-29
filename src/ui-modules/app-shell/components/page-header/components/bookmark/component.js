'use strict';

const safeGet = require('just-safe-get');
const redirect = require('../../../../../../utils/redirect');
const fetch = require('../../../../../../utils/helpers/fetch-wrapper').fetch;

const getModelData = function(input) {
    const changeLandingPageTxt = safeGet(input, 'model.changeLandingPage.text');
    const landingPageText = safeGet(input, 'model.landingPage.text');
    const legacyPrefUpdateUrl = safeGet(input, 'model.legacyPrefUpdateUrl');
    const preferenceId = safeGet(input, 'model.preferenceId');
    const preferenceValue = safeGet(input, 'model.preferenceValue');
    const preferenceModule = {};
    if (preferenceId) {
        preferenceModule[preferenceId] = {};
        preferenceModule[preferenceId].landingPageId = preferenceValue;
    }
    return {
        'titleText': changeLandingPageTxt || landingPageText,
        'landingPageText': landingPageText,
        'isDisplayLink': changeLandingPageTxt !== undefined,
        'preferenceModule': preferenceModule,
        'legacyPrefUpdateUrl': legacyPrefUpdateUrl
    };
};
module.exports = class {
    onCreate(input) {
        this.state = getModelData(input);
    }
    getData() {
        const self = this;
        if (self.state.isDisplayLink) {
            const dataObj = self.state.preferenceModule;
            try {
                fetch('/mys/ajx/update_preferences', dataObj, 'POST')
                    .then(response => {
                        redirect(response);
                        self.setState('titleText', self.state.landingPageText);
                        self.setState('isDisplayLink', false);
                    });
            } catch (err) {
                console.error(err);
                // handle errors
            }
        }
    }
};
