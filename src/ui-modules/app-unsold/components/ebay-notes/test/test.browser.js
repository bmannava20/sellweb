'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const mockdata = require('../mock-data/data.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('app-unsold/components/ebay-notes-selltips-notice ', () => {
    describe('should show selltip note ', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockdata);
            root = document.querySelector('.notes-cnt');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('ebay notes with a link', (done) => {
            expect(root.querySelector('.ebay-notes').classList.contains('inline-notice--information')).to.be.true;
            expect(root.querySelector('.me-notice-text a').href).to.be.not.undefined;
            done();
        });
    });
    describe('should not load ', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget({});
            root = document.querySelector('.notes-cnt');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('notes container', (done) => {
            expect(root).to.be.null;
            done();
        });
    });
});
