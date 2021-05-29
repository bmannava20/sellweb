/* globals browser */
'use strict';

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const draftsPage = require('../../pages/drafts');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US, SITES.AU, SITES.DE, SITES.UK], 'My eBay drafts', function() {
    it.p2('delete one draft', () => {
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

        draftsPage.deleteButton.deleteButton().click();
        draftsPage.singleDeleteCheckbox.checkBox(draftId).click();
        draftsPage.confirmationButton.confirmationButton().click();

        draftsPage.draftItemCard.itemCard(draftId).exists.then((hasMeuiItem) => {
            expect(hasMeuiItem).to.equal(false);
        });
    });

    it.p2('delete multiple drafts', () => {
        const site = this.site.toLowerCase();
        const casename = 'delete_multiple_drafts';
        const sellerId =
            dq.deQueue({
                casename,
                site,
                type: 'seller_id'
            });
        const draftIds =
            dq.deQueue({
                casename,
                site,
                owner_id: sellerId,
                type: 'array_list'
            });
        // log in with the specified user
        signInPage.signIn(sellerId);
        // load drafts page
        draftsPage.loadAndCloseWelcome();

        browser.waitUntil(() => !draftsPage.welcomeScreen.visible, 5000, 'expected welcome modal to disappear after 5 seconds');

        draftsPage.bulkDeleteCheckbox.checkBox().click();
        draftsPage.deleteButton.deleteButton().click();
        draftsPage.confirmationButton.confirmationButton().click();

        const hasMeuiItemPromises = draftIds.map((id) => {
            draftsPage.draftItemCard.itemCard(id).exists;
        });
        Promise.all(hasMeuiItemPromises).then((values) => {
            expect(values.includes(true)).to.equal(false);
        });
    });

    it.p2('delete all five drafts', () => {
        const site = this.site.toLowerCase();
        const casename = 'delete_all_five_drafts';
        const sellerId =
            dq.deQueue({
                casename,
                site,
                type: 'seller_id'
            });
        const draftIds =
            dq.deQueue({
                casename,
                site,
                owner_id: sellerId,
                type: 'array_list'
            });
        // log in with the specified user
        signInPage.signIn(sellerId);
        // load drafts page
        draftsPage.loadAndCloseWelcome();

        browser.waitUntil(() => !draftsPage.welcomeScreen.visible, 5000, 'expected welcome modal to disappear after 5 seconds');

        draftsPage.bulkDeleteCheckbox.checkBox().click();
        draftsPage.deleteButton.deleteButton().click();
        draftsPage.confirmationButton.confirmationButton().click();

        draftIds.forEach(id => {
            draftsPage.draftItemCard.itemCard(id).exists.then((hasMeuiItem) => {
                expect(hasMeuiItem).to.equal(false);
            });
        });
    });
});
