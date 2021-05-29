'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const itemList = require('../index.marko');
const mockData = require('../mock-data/data');

function buildWidget(data) {
    return itemList
        .renderSync({
            model: data
        })
        .appendTo(document.body)
        .getComponent();
}

describe('Active items list should show ', () => {
    let widget;
    let activeList;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        activeList = widget.getComponent('active-page-list').getEl();
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('25 items rendered ', () => {
        expect(activeList.querySelectorAll('.active-item').length).to.equal(25);
    });
});
describe('Active items list should', () => {
    let widget;
    let activeList;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        activeList = widget.getComponent('active-page-list').getEl();
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    describe('show items with share list option in the drop down ', () => {
        let processItemCalltoAction;
        let shareListOption;
        beforeEach((done) => {
            processItemCalltoAction = sinon.spy(widget, 'processItemCalltoAction');
            activeList.querySelectorAll('.active-item')[0].querySelector('.item__cta-wrapper button').click();
            shareListOption = activeList.querySelector('button.fake-menu-button__item');
            setTimeout(done);
        });
        afterEach(() => {
            widget && widget.destroy();
        });
        it('clicking the link should emit processItemCalltoAction event ', () => {
            expect(shareListOption.getAttribute('data-target-fn')).to.be.equal('ShareListing');
            shareListOption.click();
            expect(processItemCalltoAction.callCount).to.be.equal(1);
        });
    });
});

describe('Active pagination should', () => {
    let widget;
    let activePagination;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        activePagination = widget.getComponent('active-pagination').getEl();
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('show pagination module ', () => {
        expect(activePagination.querySelectorAll('.pagination .pagination__items li').length).to.be.equal(6);
    });
    describe('clicking the pagination module ', () => {
        let emitActivePageUpdate;
        beforeEach((done) => {
            emitActivePageUpdate = sinon.spy(widget, 'emitActivePageUpdate');
            const paginationLink = activePagination.querySelector('.pagination .pagination__items li button');
            paginationLink.addEventListener('click', e => e.preventDefault());
            setTimeout(() => {
                paginationLink.click();
                done();
            }, 0);
        });
        afterEach(() => {
            widget && widget.destroy();
        });
        it('should emit emitActivePageUpdate event ', () => {
            expect(emitActivePageUpdate.callCount).to.be.equal(1);
        });
    });
});
