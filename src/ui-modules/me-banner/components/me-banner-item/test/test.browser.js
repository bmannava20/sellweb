'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const singleFooterLink = require('./fixtures/single-footer-link.json');
const multipleFooterLink = require('./fixtures/multi-footer-link.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given me-banner-item component', () => {
    let widget;
    let root;
    describe('with single footer link', () => {
        beforeEach(() => {
            widget = buildWidget(singleFooterLink);
            root = document.querySelector('.banner-item');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should only have single footer link', () => {
            expect(root.querySelector('.banner-item__footer').children.length).to.equal(1);
        });
    });

    describe('with multi footer link', () => {
        beforeEach(() => {
            widget = buildWidget(multipleFooterLink);
            root = document.querySelector('.banner-item');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should only have single footer link', () => {
            expect(root.querySelector('.banner-item__footer').children.length).to.equal(2);
        });
    });
});
