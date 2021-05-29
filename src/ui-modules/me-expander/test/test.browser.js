'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given me-expander is rendered', () => {
    describe('with showTrailingDots as false', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget({
                minContent: { renderBody: out => out.w('This is the minimum content') },
                addlContent: { renderBody: out => out.w('This is the additional content') }
            });
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('has no trailing dots class', () => {
            const minContentEl = widget.getEl('minimalContent');
            expect(minContentEl.classList.contains('trailing-dots')).to.be.false;
        });

        it('show additional content on clicking show more', (done) => {
            const control = widget.getEl('expanderControl');
            control.click();
            setTimeout(() => {
                const addlContentEl = document.querySelector('.me-expander-content__additional');
                expect(addlContentEl.classList.contains('hide-content')).to.be.false;
                done();
            }, 0);
        });

        it('hides the additional content on clicking show less', (done) => {
            const control = widget.getEl('expanderControl');
            control.click();
            control.click();
            setTimeout(() => {
                const addlContentEl = document.querySelector('.me-expander-content__additional');
                expect(addlContentEl.classList.contains('hide-content')).to.be.true;
                done();
            }, 0);
        });
    });

    describe('with showTrailingDots as true', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget({
                showTrailingDots: true,
                minContent: { renderBody: out => out.w('This is the minimum content') },
                addlContent: { renderBody: out => out.w('This is the additional content') }
            });
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('has no trailing dots class', () => {
            const minContentEl = widget.getEl('minimalContent');
            expect(minContentEl.classList.contains('trailing-dots')).to.be.true;
        });

        it('show additional content on clicking show more', (done) => {
            const control = widget.getEl('expanderControl');
            control.click();
            setTimeout(() => {
                const addlContentEl = document.querySelector('.me-expander-content__additional');
                expect(addlContentEl.classList.contains('hide-content')).to.be.false;
                done();
            }, 0);
        });

        it('hides the trailing dots on clicking show more', (done) => {
            const control = widget.getEl('expanderControl');
            control.click();
            setTimeout(() => {
                const addlContentEl = document.querySelector('.me-expander-content__additional');
                expect(addlContentEl.classList.contains('hide-content')).to.be.false;
                const minContentEl = widget.getEl('minimalContent');
                expect(minContentEl.classList.contains('trailing-dots')).to.be.false;
                done();
            }, 0);
        });

        it('hides the additional content on clicking show less', (done) => {
            const control = widget.getEl('expanderControl');
            control.click();
            control.click();
            setTimeout(() => {
                const addlContentEl = document.querySelector('.me-expander-content__additional');
                expect(addlContentEl.classList.contains('hide-content')).to.be.true;
                done();
            }, 0);
        });
    });
});
