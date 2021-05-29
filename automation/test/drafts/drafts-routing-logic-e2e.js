/* globals browser */
'use strict';

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const draftsPage = require('../../pages/drafts');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US], 'My eBay drafts', function() {
    it.p2('bolt flow draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'delete_one_draft';
        const sellerId =
            dq.deQueue({
                casename,
                site,
                type: 'seller_id'
            });
        const draftId =
            dq.deQueue({
                casename,
                site,
                owner_id: sellerId,
                type: 'draft_id'
            });
        // log in with the specified user
        signInPage.signIn(sellerId);
        // load drafts page
        draftsPage.loadAndCloseWelcome();

        browser.waitUntil(() => !draftsPage.welcomeScreen.visible, 5000, 'expected welcome modal to disappear after 5 seconds');

        draftsPage.draftItemCard.itemCard(draftId).clickCTAButton();
        setTimeout(() => {
            browser.getUrl().then((url) => {
                expect(url).to.equal(`https://www.qa.ebay.com/sell/list.jsf?mode=AddItem&draftId=${draftId}&usecase=resume`);
            });
        }, 1000);
    });

    it.p2('motors draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'motos_draft';
        const sellerId =
            dq.deQueue({
                casename,
                site,
                type: 'seller_id'
            });
        const draftId =
            dq.deQueue({
                casename,
                site,
                owner_id: sellerId,
                type: 'draft_id'
            });
        // log in with the specified user
        signInPage.signIn(sellerId);
        // load drafts page
        draftsPage.loadAndCloseWelcome();

        browser.waitUntil(() => !draftsPage.welcomeScreen.visible, 5000, 'expected welcome modal to disappear after 5 seconds');

        draftsPage.draftItemCard.itemCard(draftId).clickCTAButton();
        setTimeout(() => {
            browser.getUrl().then((url) => {
                expect(url).to.equal(`https://www.qa.ebay.com/sell/list.jsf?mode=AddItem&draftId=${draftId}&usecase=resume&motors=1`);
            });
        }, 1000);
    });

    it.p2('draft created on other site NOT shown', () => {
        const site = this.site.toLowerCase();
        const casename = 'foreign_draft';
        const sellerId =
            dq.deQueue({
                casename,
                site,
                type: 'seller_id'
            });
        const draftId =
            dq.deQueue({
                casename,
                site,
                owner_id: sellerId,
                type: 'draft_id'
            });
        // log in with the specified user
        signInPage.signIn(sellerId);
        // load drafts page
        draftsPage.loadAndCloseWelcome();

        browser.waitUntil(() => !draftsPage.welcomeScreen.visible, 5000, 'expected welcome modal to disappear after 5 seconds');

        browser.url('http://www.uk.paradise.qa.ebay.com/mys/drafts');

        setTimeout(() => {
            const hasMeuiItem = draftsPage.draftItemCard.itemCard(draftId).exists;
            expect(hasMeuiItem).to.equal(false);
        }, 1000);
    });
});
