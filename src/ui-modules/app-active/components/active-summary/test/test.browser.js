'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const activeRefinementTemp = require('../index.marko');
const mockData = require('../mock-data/data');

function buildWidget(data) {
    return activeRefinementTemp
        .renderSync({
            model: data
        })
        .appendTo(document.body)
        .getComponent();
}

describe('app-active/components/active-summary should', () => {
    let widget;
    let activeRefinement;
    let handleSortFilterRequest;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        handleSortFilterRequest = sinon.spy(widget, 'handleSortFilterRequest');
        activeRefinement = widget.getComponent('active-refinement').getEl();
        const refinementEl = activeRefinement.querySelector('.me-summary__filters li button');
        refinementEl.addEventListener('click', e => e.preventDefault());
        refinementEl.click();
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('show filter carousel', () => {
        expect(activeRefinement.querySelector('.me-summary__filters')).to.be.not.null;
    });
    it('show sort drop down menu', () => {
        expect(activeRefinement.querySelector('.me-summary__title-sort')).to.be.not.null;
    });
    it('show Active page title', () => {
        expect(activeRefinement.querySelector('.me-summary__title')).to.be.not.null;
    });
    it('should emit handleSortFilterRequest when clicking on filter pill ', () => {
        expect(handleSortFilterRequest.callCount).to.be.equal(1);
    });
});
