'use strict';
/* globals browser */

const SITES = require('wdio-mocha-annotations/sites');
const signInPage = require('../../pages/signin');
const expect = require('chai').expect;
const unsoldPage = require('../../pages/unsold');

describe([SITES.US], 'unsold page', () => {
    // signin before this test suite
    before(() => {
        signInPage.signIn('mesell2');
    });

    it.p1('should load with the correct title', () => {
        unsoldPage.load();
        expect(unsoldPage.itemsContainer.meuiItems.length).to.gt(1);
    });
});
