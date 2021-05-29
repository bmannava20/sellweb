'use strict';

const safeGet = require('just-safe-get');
const constants = require('../../../../utils/helpers/constants');
const cutOffNumToShowButton = 45;

module.exports = {
    getData: function(input) {
        const model = input.model || {};
        const fullNote = safeGet(model, 'feedbackDetails.feedbackModal.content.textSpans.0.text');
        const minimumNote = fullNote ? fullNote.slice(0, cutOffNumToShowButton) : '';
        const additionalNote = fullNote ? fullNote.slice(cutOffNumToShowButton) : '';
        const showTrailingDots = additionalNote !== '';

        return {
            soldDate: safeGet(model, 'soldDate'),
            shippingNote: input.isShipItModule ? safeGet(model, 'shippingDetails.shippingNote') : safeGet(model, 'shippingNote'),
            shipToLocation: safeGet(model, 'shippingDetails.shipToLocation'),
            styleMap: constants.STYLE_MAPS.NO_DEFAULT,
            requestTotalNote: safeGet(model, 'requestTotal'),
            feedbackDetails: {
                showFeedbackButton: (fullNote && fullNote.length > cutOffNumToShowButton),
                feedbackIcon: safeGet(model, 'feedbackDetails.feedbackIcon.icon'),
                feedbackInfo: safeGet(model, 'feedbackDetails.feedbackIcon.text.textSpans'),
                note: fullNote,
                expandLabel: safeGet(model, 'feedbackDetails.feedbackModal.seeMore.textSpans.0.text'),
                collapseLabel: safeGet(model, 'feedbackDetails.feedbackModal.seeLess.textSpans.0.text'),
                minimumNote: minimumNote,
                showTrailingDots: showTrailingDots,
                additionalNote: additionalNote
            },
            isShipItModule: input.isShipItModule,
            markAsPaymentNote: safeGet(model, 'markAsPaymentNote')
        };
    }
};
