'use strict';

const chai = require('chai');
const expect = chai.expect;
const itemList = require('../index.marko');
const mockData = require('../mock-data/mock-data');

function buildWidget(data) {
    return itemList
        .renderSync({
            model: data
        })
        .appendTo(document.body)
        .getComponent();
}

describe('src/ui-modules/me-pre-order empty model', () => {
    let widget;
    let preOrder;
    beforeEach((done) => {
        widget = buildWidget(mockData.emptyData);
        preOrder = widget.getComponent('pre-order');
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('should be empty with empty data model ', () => {
        expect(preOrder).to.be.undefined;
    });
});
describe('src/ui-modules/me-pre-order full model', () => {
    let widget;
    let preOrder;
    // let onNavLinkClickAPI;
    beforeEach((done) => {
        widget = buildWidget(mockData.fullData);
        preOrder = widget.getEl('pre-order');
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('should render respond to it module data model', () => {
        expect(preOrder).to.be.not.undefined;
        expect(preOrder.querySelectorAll('.module-title').length).to.be.equal(1);
        expect(preOrder.querySelectorAll('.item-list')).to.have.length(1);
        expect(preOrder.querySelectorAll('.meui-item-tile')).to.have.length(1);
    });
    it('should show the right title url ', () => {
        const el = preOrder.querySelectorAll('.item-title')[0].children[0];
        expect(el.getAttribute('href')).to.be.equal('http://www.dev.ebay.com/itm/170010645538');
    });
    it('should show the primary line action ', () => {
        const el = preOrder.querySelector('.primary-actions .me-fake-button');
        expect(el.innerText).to.have.string('Respond');
    });
    it('should show the see all link ', () => {
        const seeAll = preOrder.querySelectorAll('.see-all')[0].children[0];
        expect(seeAll).to.not.be.an('undefined');
        expect(seeAll.text).to.be.equal('See all');
    });
});
