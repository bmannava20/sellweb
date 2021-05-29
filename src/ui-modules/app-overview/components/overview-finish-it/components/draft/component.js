'use strict';

const safeGet = require('just-safe-get');
const fetch = require('../../../../../../utils/helpers/fetch-wrapper').fetch;

module.exports = class {
    onCreate(input) {
        this.state = {
            'isShowDeletePanel': input.isShowDeletePanel,
            'isShowRetryPanel': input.isShowRetryPanel,
            'isDeleting': input.isDeleting,
            'draft': input,
            'deleteConfirm': safeGet(input, 'deleteConfirm'),
            'draftId': safeGet(input, 'model.__me.draftId'),
            'panelStates': []
        };
    }

    onUpdate() {
        const transLineActions = this.getComponent('transLineActions');
        if (transLineActions) {
            const meLineActions = transLineActions.getComponent('meLineActions');
            meLineActions.setLineActionButtonFocus();
        }
    }
    onLineActionSelect() {
        const self = this;
        self.setState('isShowDeletePanel', true);
        self.updateDraftStates();
    }
    cancelDeleteDraft() {
        const self = this;
        self.setState('isShowRetryPanel', false);
        self.setState('isShowDeletePanel', false);
        self.setState('isDeleting', false);
        self.updateDraftStates();
    }
    deleteDraft() {
        const self = this;
        const meSellOverviewDeleteDraft = {
            'MeSellOverviewDeleteDraft': [self.state.draftId]
        };
        self.setState('isDeleting', true);
        self.setState('isShowRetryPanel', false);
        self.setState('isShowDeletePanel', false);
        self.updateDraftStates();

        fetch('/mys/ajx/delete_draft', meSellOverviewDeleteDraft, 'POST')
            .then(response => {
                if (response.msgType) {
                    return Promise.reject(new Error('delete draft failed'));
                }
                return fetch('/mys/ajx/finishIt/update');
            })
            .then(response => {
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                const drafts = safeGet(response, 'modules.finishItModule.lineItems');
                const seeAll = safeGet(response, 'modules.finishItModule.seeAll');
                const emptyStateModule = safeGet(response, 'modules.emptyStateModule');
                self.setState('isDeleting', true);
                self.updateDraftStates();
                self.updateDrafts({
                    'drafts': drafts,
                    'seeAll': seeAll,
                    'emptyStateModule': emptyStateModule
                });
            })
            .catch(err => {
                console.error(err);
                self.setState('isShowRetryPanel', true);
                self.setState('isShowDeletePanel', false);
                self.setState('isDeleting', false);
            });
    }
    updateDrafts(data) {
        const self = this;
        self.emit('updateDrafts', { 'data': data });
    }
    updateDraftStates() {
        const self = this;
        self.emit('updateDraftStates', {
            'data': {
                'draftId': self.state.draftId
            }
        });
    }
};
