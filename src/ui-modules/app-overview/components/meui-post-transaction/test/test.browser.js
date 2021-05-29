'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/mock-data');
const shipItmockData = require('../mock-data/mock-data-shipit');
const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('Post Transaction empty module', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget(mockData.emptyData);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should be empty because data is empty', (done) => {
        expect(widget.data).to.be.undefined;
        done();
    });
});

describe('Post Transaction module', () => {
    describe('when rendered using full data', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockData.fullData);
            root = document.querySelector('.post-transaction');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should render post transaction module data model', () => {
            const itemsListEl = root.getElementsByClassName('item-list');
            expect(itemsListEl.length).to.be.equal(1);
            expect(itemsListEl[0].getElementsByClassName('meui-item-tile')).to.have.length(9);
        });

        it('should show the see all link', () => {
            const seeAllEl = root.querySelector('.see-all span');
            expect(seeAllEl).to.not.be.an('undefined');
            expect(seeAllEl.innerText).to.be.equal('See all');
        });
    });

    describe('when rendered with buyer note', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(shipItmockData.fullData);
            root = document.querySelector('.post-transaction');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should show buyer\'s note', () => {
            const buyerNote = shipItmockData.fullData.lineItems[0].__me.buyerToSellerNote.textSpans[0].text;
            expect(buyerNote).to.not.be.undefined;
            const orderHeaderEl = root.getElementsByClassName('multi-order-header')[0];
            const buyerNoteEl = orderHeaderEl ? orderHeaderEl.getElementsByClassName('buyer-notes')[0] : undefined;
            expect(buyerNoteEl).to.not.be.undefined;
        });
    });
});
