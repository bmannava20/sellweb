'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const template = require('../index.marko');
const mockdata = require('../mock-data/data.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('app-unsold/components/unsold-refinement', () => {
    let widget;
    let root;

    beforeEach((done) => {
        widget = buildWidget(mockdata);
        root = document.querySelector('.unsold-page__header');
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });
    it('should show three filter three pills', () => {
        expect(root.querySelectorAll('.carousel__list .me-carousel__pill').length).to.be.equal(3);
    });
    it('should show All (2) as selected filter pill ', () => {
        expect(root.querySelector('.carousel__list .me-carousel__pill.selected').innerText).to.be.equal('All (2)');
    });
    it('should show sort drop down menu with two options', () => {
        expect(root.querySelectorAll('.me-sort__select .menu-button__items .menu-button__item').length).to.be.equal(2);
    });
    it('should show Time ended: recent first as selected sort option ', () => {
        expect(root.querySelector('.me-sort__select .expand-btn__cell').innerText).to.have.string('Time ended: recent first');
    });
    it('should unsold page title', () => {
        expect(root.querySelector('.me-summary__title').innerText).to.have.string('Unsold');
    });
    describe('on carousel filter click', () => {
        let handleSortFilterRequest;
        beforeEach((done) => {
            handleSortFilterRequest = sinon.spy(widget, 'handleSortFilterRequest');
            const carouselPill = root.querySelectorAll('.carousel__list .me-carousel__pill')[2];
            carouselPill.addEventListener('click', e => e.preventDefault());
            setTimeout(() => {
                carouselPill.click();
                done();
            }, 0);
        });
        it('should emit handleSortFilterRequest event', () => {
            expect(handleSortFilterRequest.callCount).to.be.equal(1);
        });
    });
    describe('on sort option click', () => {
        let handleSortFilterRequest;
        beforeEach((done) => {
            handleSortFilterRequest = sinon.spy(widget, 'handleSortFilterRequest');
            root.querySelectorAll('.me-sort__select .menu-button__items .menu-button__item')[1].click();
            setTimeout(done);
        });
        it('should emit handleSortFilterRequest event', () => {
            expect(handleSortFilterRequest.callCount).to.be.equal(1);
        });
    });
});
