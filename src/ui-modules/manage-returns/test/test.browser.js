'use strict';

const chai = require('chai');
const expect = chai.expect;
const renderer = require('../');
const mockData = require('../mock-data/model.json');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('src/ui-modules/manage-returns component', () => {
    let widget;
    let returnsSection;
    beforeEach((done) => {
        widget = buildWidget({ model: mockData });
        returnsSection = document.querySelector('.manage-returns');
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render the component', () => {
        expect(returnsSection).to.not.be.null;

        const lineItems = returnsSection.querySelectorAll('.insights-item');
        expect(lineItems).to.not.be.null;
        expect(lineItems).to.have.lengthOf(3);

        const seeAll = returnsSection.querySelector('.see-all');
        expect(seeAll).to.not.be.null;
    });
});
