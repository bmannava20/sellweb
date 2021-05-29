'use strict';

const chai = require('chai');
const expect = chai.expect;
const spinner = require('../index.marko');

function buildWidget() {
    return spinner
        .renderSync()
        .appendTo(document.body)
        .getComponent();
}

describe('given me-spinner component', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget();
        root = document.querySelector('.spinner-wrapper');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    describe('is rendered', () => {
        it('is hidden by default', () => {
            expect(root.classList.contains('show')).to.be.false;
        });
    });

    describe('is rendered and showSpinner() is called', () => {
        beforeEach((done) => {
            widget.showSpinner();
            setTimeout(done);
        });

        it('the spinner is shown', () => {
            expect(root.classList.contains('show')).to.be.true;
        });
    });
});

describe('given me-spinner component is rendered', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget();
        root = document.querySelector('.spinner-wrapper');
        widget.showSpinner();
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    describe('when hideSpinner() is called', () => {
        beforeEach((done) => {
            widget.hideSpinner();
            setTimeout(done);
        });

        it('then the spinner is hidden', () => {
            expect(root.classList.contains('show')).to.be.false;
        });
    });
});
