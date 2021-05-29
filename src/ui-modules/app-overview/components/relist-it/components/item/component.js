'use strict';

const safeGet = require('just-safe-get');
const constants = require('../../../../../../utils/helpers/constants');
const fetch = require('../../../../../../utils/helpers/fetch-wrapper').fetch;

module.exports = class {
    onCreate(input) {
        this.state = {
            isShowDeletePanel: input.isShowDeletePanel,
            isShowRetryPanel: input.isShowRetryPanel,
            isDeleting: input.isDeleting,
            item: input,
            deleteConfirm: safeGet(input, 'deleteConfirm'),
            listingId: safeGet(input, 'model.listingId'),
            panelStates: []
        };
    }
    onLineActionSelect() {
        this.setState('isShowDeletePanel', true);
        this.updateItemStates({
            'isShowDeletePanel': this.state.isShowDeletePanel,
            'isShowRetryPanel': this.state.isShowRetryPanel,
            'isDeleting': this.state.isDeleting
        });
    }
    cancelDeleteitem() {
        this.setState('isShowRetryPanel', false);
        this.setState('isShowDeletePanel', false);
        this.setState('isDeleting', false);
        this.updateItemStates();
    }
    deleteitem() {
        const relistDelete = {
            'itemIds': [this.state.listingId],
            'filter': 'unsld:RELISTED'
        };
        this.setState('isDeleting', true);
        this.setState('isShowRetryPanel', false);
        this.setState('isShowDeletePanel', false);
        this.updateItemStates();

        fetch(constants.SPA_COMMAND.OVERVIEW.OVERVIEW_AJAX_URL.RELIST_DELETE_ITEM, relistDelete, 'POST')
            .then(response => {
                if (response.msgType) {
                    return Promise.reject(new Error('delete item failed'));
                }
                this.setState('isDeleting', false);
                this.updateItemStates();
                this.emit('appUpdate', {
                    name: constants.SPA_COMMAND.OVERVIEW.ACTION_NAME
                });
            })
            .catch(err => {
                console.error(err);
                this.setState('isShowRetryPanel', true);
                this.setState('isShowDeletePanel', false);
                this.setState('isDeleting', false);
                this.updateItemStates();
            });
    }
    updateItemStates() {
        this.emit('updateItemStates', { 'listingId': this.state.listingId });
    }
};
