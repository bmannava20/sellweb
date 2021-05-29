'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US], 'My eBay selling overview - todo - WillSell', function() {
    it.p1('should show auction item with 1 bid', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_will_sell_auction_item_without_reserve_price_has1_bid';
        // fetch seller id from Q
        const sellerId =
                dq.deQueue({
                    casename: caseName,
                    site: site,
                    type: 'seller_id'
                });
        // fetch corresponding listing id from Q
        const listingId =
            dq.deQueue({
                casename: caseName,
                site: site,
                owner_id: sellerId,
                type: 'item_id'
            });

        // log in with the specified user
        signInPage.signIn(sellerId);
        // load overview page
        overviewPage.loadAndCloseWelcome();

        // check if item from Q is shown
        const hasItemCard = overviewPage.willSell.itemCard(listingId).exists;
        expect(hasItemCard, `Item is shown in will sell: ${hasItemCard}`).to.equal(true);
    });
});
