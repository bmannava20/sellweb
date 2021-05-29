'use strict';
const safeGet = require('just-safe-get');
const queryString = require('query-string');

module.exports = class {
    onCreate(input) {
        this.state = {
            'drafts': safeGet(input, 'model.lineItems'),
            'title': safeGet(input, 'model.title'),
            'seeAll': safeGet(input, 'model.seeAll'),
            'deleteConfirm': safeGet(input, 'model.deleteConfirmationMap'),
            'model': safeGet(input, 'model'),
            'isShowDeletePanel': false,
            'isShowRetryPanel': false,
            'isDeleting': false,
            'draftPanelStates': []
        };
    }
    updateDrafts(model) {
        const self = this;
        if (model.data.emptyStateModule && model.data.emptyStateModule.contentMap) {
            self.emit('emptyStatus', { 'model': model.data.emptyStateModule });
        }
        self.setState('drafts', model.data.drafts);
        self.setState('isShowRetryPanel', model.data.isShowRetryPanel);
        self.setState('isShowDeletePanel', model.data.isShowDeletePanel);
        self.setState('isDeleting', model.data.isDeleting);
        self.setState('seeAll', model.data.seeAll);
    }
    updateDraftStates(model) {
        const self = this;
        const draftWidget = self.getComponent(model.data.draftId);
        if (draftWidget) {
            const state = {
                'isShowDeletePanel': draftWidget.state.isShowDeletePanel,
                'isShowRetryPanel': draftWidget.state.isShowRetryPanel,
                'isDeleting': draftWidget.state.isDeleting
            };
            self.state.draftPanelStates[model.data.draftId] = state;
        }
    }
    processDraftsCarouselSeeAll(e) {
        const url = safeGet(e, 'data.meuiNavlinkState.action.URL');
        const type = safeGet(e, 'data.meuiNavlinkState.action.type');
        const name = safeGet(e, 'data.meuiNavlinkState.action.name');
        let params = safeGet(e, 'data.meuiNavlinkState.action.params');

        if (params) {
            params = `/${ queryString.stringify(params)}`;
        }

        if (type === 'OPERATION') {
            e.data.meuiNavlinkEvent.preventDefault();
            this.emit('appUpdate', {
                'url': url,
                'type': type,
                'name': name,
                'params': params
            });
        }
    }
};
