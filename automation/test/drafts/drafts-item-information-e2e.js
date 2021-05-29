/* globals browser */
'use strict';

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const draftsPage = require('../../pages/drafts');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US, SITES.AU, SITES.DE, SITES.UK], 'My eBay drafts', function() {
    it.p2('check photo of draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'photo_draft';
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

        const image = draftsPage.draftItemCard.itemCard(draftId).getItemImage;
        expect(image).to.not.equal(null);
    });

    it.p2('check for no photo of draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'no_photo_draft';
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

        const image = draftsPage.draftItemCard.itemCard(draftId).getItemImage;
        const imageLink = draftsPage.draftItemCard.itemCard(draftId).itemImageURL;
        const draftLink = draftsPage.draftItemCard.itemCard(draftId).itemTitleURL;

        expect(image).to.equal('https://pics.ebaystatic.com/aw/pics/stockimage1.jpg');
        expect(imageLink).to.equal(draftLink);
    });

    it.p2('check title of draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'title_draft';
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

        const titleText = draftsPage.draftItemCard.itemCard(draftId).itemTitle;
        const titleLink = draftsPage.draftItemCard.itemCard(draftId).itemTitleURL;

        expect(typeof titleText).to.equal(typeof String());
        expect(titleText).to.not.equal('(Untitled Draft)');
        expect(titleLink).to.not.equal(null);
    });

    it.p2('check for no title of draft', () => {
        const site = this.site.toLowerCase();
        const casename = 'no_title_draft';
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

        const titleText = draftsPage.draftItemCard.itemCard(draftId).itemTitle;
        const titleLink = draftsPage.draftItemCard.itemCard(draftId).itemTitleURL;

        expect(typeof titleText).to.equal(typeof String());
        if (this.site === 'de') {
            expect(titleText).to.equal('(Entwurf ohne Artikelbezeichnung)');
        } else {
            expect(titleText).to.equal('(Untitled draft)');
        }
        expect(titleLink).to.not.equal(null);
    });

    it.p2('check last modified date', () => {
        const site = this.site.toLowerCase();
        const casename = 'date_last_edited_draft';
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

        const lastUpdatedText = draftsPage.draftItemCard.itemCard(draftId).getItemModifiedDate;
        expect(typeof lastUpdatedText).to.equal(typeof String());
    });
});
