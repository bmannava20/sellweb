'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sellingActivity = require('../');
const mockData = require('../mock-data/selling-activity-data.json');
const allErrorData = require('../mock-data/all-error.json');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return sellingActivity
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('given selling-activity component', () => {
    describe('is rendered with default data', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(mockData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should render', () => {
            should.exist(widget);
        });

        it('should show 3 listings on the page', () => {
            const listings = document.getElementsByClassName('listings-wrapper')[0].getElementsByClassName('listings');
            expect(listings.length).to.equal(3);
        });

        it('should show total listings number on the page', () => {
            const sixtyDayListings = document.getElementsByClassName('counter__number')[0];
            should.exist(sixtyDayListings);
        });
    });

    describe('is rendered with errored out data', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(allErrorData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should show error icon if active listings data is empty', () => {
            const errorMsg = allErrorData.activityError.textSpans[0].text;
            const activeCount = allErrorData.activeListings.count;
            const listings = document.getElementsByClassName('listings-wrapper')[0].getElementsByClassName('listings');
            const errorIcon = listings[0].getElementsByClassName('meui-tooltip')[0];
            expect(activeCount).to.be.undefined;
            expect(errorMsg).to.not.be.undefined;
            should.exist(errorIcon);
        });

        it('should show error icon if sold listings data is empty', () => {
            const errorMsg = allErrorData.activityError.textSpans[0].text;
            const soldCount = allErrorData.soldListings.count;
            const listings = document.getElementsByClassName('listings-wrapper')[0].getElementsByClassName('listings');
            const errorIcon = listings[1].getElementsByClassName('meui-tooltip')[0];
            expect(soldCount).to.be.undefined;
            expect(errorMsg).to.not.be.undefined;
            should.exist(errorIcon);
        });

        it('should show error icon if unsold listings data is empty', () => {
            const errorMsg = allErrorData.activityError.textSpans[0].text;
            const unsoldCount = allErrorData.unsoldListings.count;
            const listings = document.getElementsByClassName('listings-wrapper')[0].getElementsByClassName('listings');
            const errorIcon = listings[2].getElementsByClassName('meui-tooltip')[0];
            expect(unsoldCount).to.be.undefined;
            expect(errorMsg).to.not.be.undefined;
            should.exist(errorIcon);
        });
    });
});
