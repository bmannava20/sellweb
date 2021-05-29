/* globals browser */
'use strict';

const ItemCard = require('../ui-modules/overview-item-card');

module.exports = {
    itemCard: function(itemId) {
        return new ItemCard(`[qa-id=willSell-item-${itemId}]`);
    }
};
