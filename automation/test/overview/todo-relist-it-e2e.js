'use strict';
/* globals browser*/

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');
const client = require('wdio-api-client');
const l10nUtils = require('../../utils/l10nUtils');

describe([SITES.US], 'My eBay selling overview - todo - RelistIt', function() {
    it.p1('should show unsold item and item information are correct', () => {
        const site = this.site.toLowerCase();
        const caseName = 'unsold_response_auction';
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
        browser.saveScreenshot();
        // check if paid item from Q is shown
        const hasItemCard = overviewPage.relistIt.itemCard(listingId).exists;
        expect(hasItemCard, `Item is shown in relist it: ${hasItemCard}`).to.equal(true);

        // const actualEndDateTxt = overviewPage.relistIt.itemCard(listingId).itemEndDateText;
        // console.log(actualEndDateTxt);

        // const itemData = browser.call(() => client.getItem(listingId));
        // console.log(itemData);
        // const expectedDate = l10nUtils.formatedDateMMMDD(itemData.listingDetails.endTime, site);
        // console.log(expectedDate);

        // expect(actualEndDateTxt.indexOf(expectedDate) !== -1, `Item end date shown in relist it: ${actualEndDateTxt}`).to.equal(true);
    });
});
