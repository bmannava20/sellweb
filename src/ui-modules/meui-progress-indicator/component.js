const constants = require('../../utils/helpers/constants');

module.exports = class {
    onCreate(input) {
        this.state = {
            model: input
        };
    }

    show(event) {
        if (event && event.originalEvent.target) {
            const dataUrl = $(event.originalEvent.target).attr('data-url');
            if (dataUrl) {
                const lotIds = (dataUrl.split('?')[1].length && dataUrl.split('?')[1].split('lotId=')[1]);
                this.getComponent('progressPopup').emit('submit', lotIds);
            }
        }
    }
    refreshOutbackModule() {
        this.emit('refreshOutbackModule');
    }
    navigateToDraftsPage(data, event) {
        event.preventDefault();
        this.emit('appUpdate', {
            'name': constants.SPA_COMMAND.DRAFTS.ACTION_NAME
        });
    }
};
