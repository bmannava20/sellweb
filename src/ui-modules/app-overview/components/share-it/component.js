'use strict';
const constants = require('../../../../utils/helpers/constants');

module.exports = class {
    onButtonClick(listingId) {
        const shareWidget = this.getComponent('overview-share');

        shareWidget.showShareWidget({
            itemId: listingId,
            pageName: constants.SPA_COMMAND.OVERVIEW.COMMAND_NAME.toLowerCase()
        });
    }
};
