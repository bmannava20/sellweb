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

describe('app-unsold/components/unsold-listing ', () => {
    let widget;
    let root;

    beforeEach((done) => {
        widget = buildWidget(mockdata);
        root = document.querySelector('.unsold-page__list');
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should show twenty five items', () => {
        expect(root.querySelectorAll('.unsold-item').length).to.be.equal(25);
    });

    it('call add Note when addnote button is clicked', (done) => {
        const onAddNote = sinon.spy(widget, 'onAddNote');
        root.querySelector('button.fake-menu-button__item').click();
        expect(onAddNote.callCount).to.be.equal(1);
        done();
    });

    describe('on clicking add Note option from inline actions drop down', () => {
        let onAddNote;
        beforeEach((done) => {
            onAddNote = sinon.spy(widget, 'onAddNote');
            const btn = root.querySelector('.unsold-item button.fake-menu-button__item');
            btn.click();
            setTimeout(done);
        });
        it('shoudl emit onAddNote event', () => {
            expect(onAddNote.callCount).to.be.equal(1);
        });
    });

    describe('on pagination', () => {
        let unsoldPageUpdate;
        beforeEach((done) => {
            unsoldPageUpdate = sinon.spy(widget, 'unsoldPageUpdate');
            const paginationNextEl = document.querySelector('.pagination__next');
            paginationNextEl.addEventListener('click', e => e.preventDefault());
            setTimeout(() => {
                paginationNextEl.click();
                done();
            }, 0);
        });
        it('should emit unsoldPageUpdate event', () => {
            expect(unsoldPageUpdate.callCount).to.be.equal(1);
        });
    });
});
