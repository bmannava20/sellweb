/* globals browser */
'use strict';

module.exports = {
    // filter
    // item container
    itemsContainer: require('./ui-section/items-cnt'),

    load() {
        browser.url(`/mys/unsold`);

        // if messaging overlay visible, close it
        const overlayButton = $('[aria-labelledby="dialog-welcome-screen-title"] .btn--primary');
        if (overlayButton.isVisible()) {
            overlayButton.click();
        }
    }
};
