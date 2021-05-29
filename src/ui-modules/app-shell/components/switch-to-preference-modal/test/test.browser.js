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

describe('given switch to classic screen modal is rendered', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({
            model: mockData.modules.switchToClassicModule
        });
        root = document.querySelector('.classic-pref-modal-wrapper');
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

    it('should have 2 paragraphs', () => {
        const contentEl = root.getElementsByTagName('p');
        expect(contentEl).to.have.length(2);
    });

    it('should have a link', () => {
        const contentEl = root.getElementsByTagName('a');
        expect(contentEl).to.have.length(1);
    });

    describe('when the modal is shown', () => {
        beforeEach((done) => {
            widget.showModal();
            setTimeout(done);
        });

        it('should show the modal if showModal is true', () => {
            expect(root.getAttribute('aria-hidden')).to.not.be.ok;
        });
    });
});
