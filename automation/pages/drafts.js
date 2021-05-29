/* globals browser */
'use strict';

module.exports = {
    welcomeScreen: require('./ui-section/welcome-screen'),
    draftItemCard: require('./ui-section/draft-item'),
    deleteButton: require('./ui-section/drafts-delete-button'),
    confirmationButton: require('./ui-section/modal-confirmation-button'),
    singleDeleteCheckbox: require('./ui-section/single-delete-checkbox'),
    bulkDeleteCheckbox: require('./ui-section/bulk-delete-checkbox'),

    loadAndCloseWelcome() {
        browser.url(`/mys/drafts`);
        if (this.hasWelcomeScreen()) {
            this.closeWelcomeScreen();
        }
    },

    loadPage() {
        browser.url(`/mys/drafts`);
    },

    hasWelcomeScreen() {
        return this.welcomeScreen.okBtn.visible;
    },

    closeWelcomeScreen() {
        this.welcomeScreen.okBtn.click();
    }
};
