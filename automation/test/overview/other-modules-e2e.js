'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const overviewPage = require('../../pages/overview');
const DataQueue = require('wdio-data-queue');
const dq = new DataQueue('myebay-breeze');

describe([SITES.US], 'My eBay selling overview - other module - WelcomeScreen', function() {
    it.p1('should show for first time and wont show when open page again', () => {
        const site = this.site.toLowerCase();
        const caseName = 'selling_overview_welcome_screen_close_screen';
        // fetch seller id from Q
        const sellerId =
                dq.deQueue({
                    casename: caseName,
                    site: site,
                    type: 'seller_id'
                });


        signInPage.signIn(sellerId);
        overviewPage.loadPage();

        // check if welcome screen is shown for first time
        let hasWelcomeScreen = overviewPage.hasWelcomeScreen();
        expect(hasWelcomeScreen, `Welcome screen is shown`).to.equal(true);

        overviewPage.closeWelcomeScreen();
        overviewPage.loadPage();

        // check if welcome screen is not shown after load again
        hasWelcomeScreen = overviewPage.hasWelcomeScreen();
        expect(hasWelcomeScreen, `Welcome screen is shown`).to.equal(false);
    });
});
