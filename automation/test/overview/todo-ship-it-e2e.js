'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US], 'My eBay selling overview - todo - Shipit', function() {
    it.p1('should show paid item and not show unpaid item', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_ship_it_item_shown';
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
                type: 'array_list'
            });

        // log in with the specified user
        signInPage.signIn(sellerId);
        // load overview page
        overviewPage.loadAndCloseWelcome();

        // check if paid item from Q is shown
        let hasItemCard = overviewPage.shipIt.itemCard(listingId[0]).exists;
        expect(hasItemCard, `Item is shown in ship it: ${hasItemCard}`).to.equal(true);

        // check if not paid item from Q is not shown≠≠
        hasItemCard = overviewPage.shipIt.itemCard(listingId[1]).exists;
        expect(hasItemCard, `Item is shown in ship it: ${hasItemCard}`).to.equal(false);
    });
});
