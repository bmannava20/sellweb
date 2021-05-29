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

describe('src/ui-modules/manage-returns/components/item-card component', () => {
    let widget;
    let itemCard;
    beforeEach((done) => {
        widget = buildWidget({ item: mockData.model });
        itemCard = document.querySelector('.insights-item');
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render the component', () => {
        const image = itemCard.querySelector('.meui-img-wrapper');
        expect(image).to.not.be.null;

        const title = itemCard.querySelector('.item-title');
        expect(title).to.not.be.null;

        const itemStats = itemCard.querySelector('.item__stats');
        expect(itemStats).to.not.be.null;

        const itemDisplayPrice = itemCard.querySelector('.item__price');
        expect(itemDisplayPrice).to.not.be.null;

        const primaryAction = itemCard.querySelector('.item__primary-action');
        expect(primaryAction).to.not.be.null;
    });
});
