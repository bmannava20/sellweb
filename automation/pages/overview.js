/* globals browser */
'use strict';

module.exports = {
    respondToIt: require('./ui-section/overview-respond-to-it'),
    replyToIt: require('./ui-section/overview-reply-to-it'),
    willSell: require('./ui-section/overview-will-sell'),
    shipIt: require('./ui-section/overview-ship-it'),
    waitForPayment: require('./ui-section/overview-wait-for-payment'),
    relistIt: require('./ui-section/overview-relist-it'),
    welcomeScreen: require('./ui-section/welcome-screen'),

    loadAndCloseWelcome() {
        browser.url(`/mys/overview`);
        if (this.hasWelcomeScreen()) {
            this.closeWelcomeScreen();
        }
    },

    loadPage() {
        browser.url(`/mys/overview`);
    },

    hasWelcomeScreen() {
        return this.welcomeScreen.okBtn.visible;
    },

    closeWelcomeScreen() {
        this.welcomeScreen.okBtn.click();
    }
};
