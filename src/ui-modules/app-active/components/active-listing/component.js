'use strict';
const constants = require('../../../../utils/helpers/constants');

module.exports = class {
    onInput(input) {
        this.state = {
            model: input.model,
            busyLabel: input.busyLabel,
            targetItemCardWidget: undefined
        };
    }
    processItemCalltoAction(data) {
        switch (data.targetFunction) {
            case 'ShareListing':
                this.processSocialShare(data);
                break;
            case 'SellerInitiatedOffer':
                this.processSIOtxnWrapper(data);
                break;
            case 'ENDITEM':
                this.processEndListing(data);
                break;
            case 'PromoteListing':
            case 'EditPromotedListing':
                this.processPromoteListing(data);
                break;
            case 'ADDRECOMMENDEDDETAILS':
            case 'ADDREQUIREDDETAILS':
            case 'ADD_RECOMMENDED_DETAILS':
            case 'ADD_REQUIRED_DETAILS':
            case 'ADD_STB_REQUIRED_DETAILS':
                this.initiateReqAspectsIframe(data);
                break;
            default:
                break;
        }
    }
    processPromoteListing(data) {
        if (data.targetItemCardWidget) {
            this.state.targetItemCardWidget = data.targetItemCardWidget;
        }
        if (data.itemId && this.getComponent('promote_listing')) {
            this.getComponent('promote_listing').inputWidget({ 'item_id': data.itemId });
        }
    }
    processPromoteListingsSuccessError(event) {
        this.state.targetItemCardWidget.showItemCardNotice({
            success: event.success,
            error: event.error
        });
    }
    processSocialShare(data) {
        if (!data.itemId) {
            return;
        }
        const shareWidget = this.getComponent('active-share');

        shareWidget.showShareWidget({
            itemId: data.itemId,
            pageName: constants.SPA_COMMAND.ACTIVE.COMMAND_NAME.toLowerCase()
        });
    }
    processEndListing(data) {
        if (!data.itemId || !data.targetItemCardWidget) {
            return;
        }

        this.state.targetItemCardWidget = data.targetItemCardWidget;
        this.getComponent('active-end-listing').showDialog(data.itemId);
    }
    processEndListingSuccessError(event) {
        this.state.targetItemCardWidget.showItemCardNotice({
            success: event.success,
            error: event.error
        });
    }
    emitActivePageUpdate(data) {
        this.emit('activePageUpdate', data);
    }
    updateListingModule(activeListingsModule) {
        this.setState('model', activeListingsModule);
    }
    initiateReqAspectsIframe(data) {
        if (data.targetItemCardWidget) {
            this.state.targetItemCardWidget = data.targetItemCardWidget;
        }
        this.getComponent('req-aspects-iframe').show(data);
    }
    processReqAspectSuccess(data) {
        this.state.targetItemCardWidget.showItemCardNotice({
            success: data.successMessage
        });
    }
    processSIOtxnWrapper(data) {
        if (data.dataUrl) {
            this.getComponent('txn-wrapper').openTxnWrapper(data.dataUrl, 'activePageUpdate');
        }
    }
};
