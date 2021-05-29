'use strict';

const chai = require('chai');
const expect = chai.expect;
const renderer = require('../');
const mockData = require('../mock-data/data');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given meui-shipping-tips component is rendered', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({
            model: mockData.tipsForShipping
        });
        root = document.querySelector('.shipping-tip-modal-wrapper');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should not show the modal onRender', () => {
        expect(root.getAttribute('aria-hidden')).to.be.null;
    });

    it('should have heading', () => {
        const heading = root.getElementsByClassName('me-dialog__header')[0];
        expect(heading).to.not.be.null;
    });

    it('should have COVID links', () => {
        const footer = root.getElementsByClassName('dialog__footer')[0];
        expect(footer).to.not.be.null;
    });


    it('should have 3 unordered lists', () => {
        const contentEl = root.getElementsByTagName('li');
        expect(contentEl).to.have.length(3);
    });

    describe('when the modal is shown', () => {
        beforeEach((done) => {
            widget.show();
            setTimeout(done);
        });

        it('should show the modal if showModal is true', () => {
            expect(root.getAttribute('aria-hidden')).to.not.be.ok;
        });
    });
});
