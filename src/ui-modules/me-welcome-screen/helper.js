'use strict';
const safeGet = require('just-safe-get');

function getModelData(state) {
    return {
        welcomeScreenIsShown: safeGet(state, 'welcomeScreenModule.showWelcomeScreen'),
        headerText: safeGet(state, 'welcomeScreenModule.contentMap.headerText'),
        buttonText: safeGet(state, 'welcomeScreenModule.contentMap.buttonText'),
        secondaryButtonText: safeGet(state, 'welcomeScreenModule.contentMap.secondaryButtonText'),
        preferenceCheckboxText: safeGet(state, 'welcomeScreenModule.contentMap.preferenceCheckboxText'),
        footerText: safeGet(state, 'welcomeScreenModule.contentMap.footerText'),
        subTopText: safeGet(state, 'welcomeScreenModule.contentMap.subTopText'),
        subFooterText: safeGet(state, 'welcomeScreenModule.contentMap.subFooterText'),
        topText: safeGet(state, 'welcomeScreenModule.contentMap.activeTopText') || safeGet(state, 'welcomeScreenModule.contentMap.topText') || safeGet(state, 'welcomeScreenModule.contentMap.draftTopText'),
        middleText1: safeGet(state, 'welcomeScreenModule.contentMap.activeMiddleText1') || safeGet(state, 'welcomeScreenModule.contentMap.middleText1') || safeGet(state, 'welcomeScreenModule.contentMap.draftMiddleText1'),
        middleText2: safeGet(state, 'welcomeScreenModule.contentMap.middleText2'),
        middleText3: safeGet(state, 'welcomeScreenModule.contentMap.middleText3'),
        closeButton: safeGet(state, 'welcomeScreenModule.contentMap.closeButton'),
        allsellingModel: safeGet(state, 'welcomeScreenModule.allsellingModel')
    };
}

module.exports = {
    getModelData
};
