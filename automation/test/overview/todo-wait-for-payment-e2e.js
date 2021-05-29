'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');
const client = require('wdio-api-client');

describe([SITES.US], 'My eBay selling overview - todo - waitForPayment', function() {
    it.p1('should show correct item title and link', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_wait_for_payment_item_title';
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
        const hasItemCard = overviewPage.waitForPayment.itemCard(listingId).exists;
        expect(hasItemCard, `Item is shown in wait for payment: ${hasItemCard}`).to.equal(true);

        // check if item title text and link are correct
        const acutalTitle = overviewPage.waitForPayment.itemCard(listingId).itemTitle;
        const itemData = browser.call(() => client.getItem(listingId));
        // check if title is as expected
        const expectedTitle = itemData.title;
        expect(acutalTitle, `Item title shown in wait for payment: ${acutalTitle}`).to.equal(expectedTitle);

        const acutalURL = overviewPage.waitForPayment.itemCard(listingId).itemTitleURL;
        expect(acutalURL.indexOf(listingId) !== -1, `Item title URL shown in wait for payment: ${acutalURL}`).to.equal(true);
    });
});
