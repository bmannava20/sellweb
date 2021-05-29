/* globals browser */
'use strict';

const ItemCard = require('../ui-modules/draft-item-card');

module.exports = {
    itemCard: function(itemId) {
        return new ItemCard(`[qa-id=draft-item-${itemId}]`);
    }
};
