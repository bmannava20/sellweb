'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US], 'My eBay selling overview - todo - ReplyToIt', function() {
    it.p1('should show active item with unanswered message', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_reply_to_it_shownfor_active_item';
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
        const hasItemCard = overviewPage.replyToIt.itemCard(listingId).exists;
        expect(hasItemCard, `Item is shown in reply to it: ${hasItemCard}`).to.equal(true);
    });
    it.p1('should show sold item with unanswered message', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_reply_to_it_shownfor_sold_item';
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
        const hasItemCard = overviewPage.replyToIt.itemCard(listingId).exists;
        expect(hasItemCard, `Item is shown in reply to it: ${hasItemCard}`).to.equal(true);
    });
});
