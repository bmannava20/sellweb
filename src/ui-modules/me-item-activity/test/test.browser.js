'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/model');
const mockDataOnlyViewWatcher = require('../mock-data/model-only-view-watcher');
const mockDataOnlyBids = require('../mock-data/model-only-bid');
const mockDataWithZeroBid = require('../mock-data/model-only-bid-zero-bid');

const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('Item activity widget', () => {
    let widget;
    afterEach(() => {
        widget.destroy();
    });

    it('should render item activity', (done) => {
        widget = buildWidget(mockData);
        const itemActivity = document.getElementsByClassName('me-item-activity')[0];
        expect(itemActivity.textContent).to.contain('views');
        expect(itemActivity.textContent).to.contain('watchers');
        expect(itemActivity.textContent).to.contain('bid');
        done();
    });
    it('should render only item view and watcher', (done) => {
        widget = buildWidget(mockDataOnlyViewWatcher);
        const itemActivity = document.getElementsByClassName('me-item-activity')[0];
        expect(itemActivity.textContent).to.contain('views');
        expect(itemActivity.textContent).to.contain('watchers');
        done();
    });
    it('should render item bid', (done) => {
        widget = buildWidget(mockDataOnlyBids);
        const itemActivity = document.getElementsByClassName('me-item-activity')[0];
        expect(itemActivity.textContent).to.contain('Bid');
        done();
    });
    it('should render item bid count as an achor', (done) => {
        widget = buildWidget(mockDataOnlyBids);
        const itemActivity = document.getElementsByClassName('me-item-activity')[0];
        expect(itemActivity.querySelector('a')).to.not.be.undefined;
        done();
    });
    it('should render item bid count zero without anchor', (done) => {
        widget = buildWidget(mockDataWithZeroBid);
        const itemActivity = document.getElementsByClassName('me-item-activity')[0];
        expect(itemActivity.querySelector('a')).to.be.null;
        done();
    });
});
