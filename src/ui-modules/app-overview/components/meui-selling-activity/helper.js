'use strict';

const safeGet = require('just-safe-get');
module.exports = {
    getModelData: function(input) {
        let promoErrorMsg;
        const errorTextSpans = safeGet(input, 'model.promoError.textSpans');
        const moduleTitle = safeGet(input, 'model.title.textSpans.0.text');
        const activityError = {
            message: safeGet(input, 'model.activityError.textSpans.0.text'),
            accessibilityText: safeGet(input, 'model.activityError.accessibilityText')
        };

        const listings = {
            activeListings: {
                number: safeGet(input, 'model.activeListings.count.textSpans.0.text'),
                btnText: safeGet(input, 'model.activeListings.label.textSpans.0.text'),
                btnAction: safeGet(input, 'model.activeListings.label.action')
            },
            soldListings: {
                number: safeGet(input, 'model.soldListings.count.textSpans.0.text'),
                btnText: safeGet(input, 'model.soldListings.label.textSpans.0.text'),
                btnAction: safeGet(input, 'model.soldListings.label.action')
            },
            unsoldListings: {
                number: safeGet(input, 'model.unsoldListings.count.textSpans.0.text'),
                btnText: safeGet(input, 'model.unsoldListings.label.textSpans.0.text'),
                btnAction: safeGet(input, 'model.unsoldListings.label.action')
            },
            listingsTotal: {
                sixtyDayTotal: safeGet(input, 'model.totals.count.value.value'),
                accessibilityText: safeGet(input, 'model.totals.count.accessibilityText'),
                sixtyDayTotalByline: safeGet(input, 'model.totals.label.textSpans.0.text'),
                locale: safeGet(input, 'model.locale') || 'en-US',
                currencyCode: safeGet(input, 'model.totals.count.value.currency') || 'USD'
            }
        };

        const listItemBtn = {
            listItemBtnText: safeGet(input, 'model.listItemButton'),
            listItemBtnAction: safeGet(input, 'model.listItemButton.action')
        };

        if (errorTextSpans) {
            promoErrorMsg = errorTextSpans.map(e => e.text).join('<br>');
        }


        return {
            moduleTitle,
            listings,
            activityError,
            promoErrorMsg: promoErrorMsg,
            listItemBtn: listItemBtn
        };
    }
};
