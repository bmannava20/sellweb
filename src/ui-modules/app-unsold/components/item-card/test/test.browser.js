'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const template = require('../index.marko');
const mockdata = require('../mock-data/data.json');
const mockdataWithEditNote = require('../mock-data/data-withEditNote.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('app-unsold/components/item-card', () => {
    describe('when rendered using the default data', () => {
        let widget;
        let root;
        beforeEach((done) => {
            widget = buildWidget(mockdata);
            root = document.querySelector('.unsold-item');
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        describe(' open the add note model', () => {
            let spy;
            beforeEach((done) => {
                spy = sinon.spy();
                widget.on('onAddNote', spy);
                const btn = document.querySelector('button.user-note__control.fake-link');
                btn.click();
                setTimeout(done);
            });
            it('when edit note button is called add note should be called once ', () => {
                expect(spy.called).to.be.true;
            });
        });
        it('show ebay notes with a link', (done) => {
            expect(root.querySelector('.ebay-notes').classList.contains('inline-notice--information')).to.be.true;
            expect(root.querySelector('.me-notice-text a').href).to.be.not.undefined;
            done();
        });
        it('call checkboxHandler when checkbox is clicked ', (done) => {
            const checkboxHandler = sinon.spy(widget, 'checkboxHandler');
            root.querySelector('.item__checkbox input').click();
            expect(checkboxHandler.callCount).to.be.equal(1);
            done();
        });
        it('show item information', (done) => {
            expect(root.querySelector('.item-title a').href).to.be.not.undefined;
            expect(root.querySelector('.item__itemid .normal').innerText).to.be.equal('Item ID: 120013903127');
            expect(root.querySelector('.item__price .normal.bold').innerText).to.be.equal('$3.00');
            expect(root.querySelector('.item__price .normal:not(.bold)').innerText).to.be.equal(' Buy It Now');
            expect(root.querySelector('.item__logistics-cost').innerText).to.be.equal('+ Shipping (buyer pays $2.00)');
            done();
        });
        it('show inline actions cta blue button with blue inline actions drop down ', (done) => {
            expect(root.querySelector('.item__cta-wrapper a.fake-btn').href).to.be.not.undefined;
            expect(root.querySelector('.item__cta-wrapper button.expand-btn')).to.be.not.undefined;
            done();
        });
        it('call add Note when addnote button is clicked', (done) => {
            const onEditAddNote = sinon.spy(widget, 'onEditAddNote');
            root.querySelector('button.fake-menu-button__item').click();
            expect(onEditAddNote.callCount).to.be.equal(1);
            done();
        });
    });

    describe('when rendered using edit note', () => {
        let widget;
        let root;
        let onEditAddNote;
        beforeEach((done) => {
            widget = buildWidget(mockdataWithEditNote);
            root = document.querySelector('.unsold-item');
            onEditAddNote = sinon.spy(widget, 'onEditAddNote');
            root.querySelector('button.fake-menu-button__item').click();
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should emit edit Note', () => {
            expect(onEditAddNote.callCount).to.be.equal(1);
        });
    });
});
