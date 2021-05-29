'use strict';

const chai = require('chai');
const expect = chai.expect;
const renderer = require('../');
const mockData = require('./mock-data/default.json');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('src/ui-modules/reviseit-module/components/item-card component', () => {
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

        const itemDisplayItem = itemCard.querySelector('.item__time');
        expect(itemDisplayItem).to.not.be.null;

        const itemDisplayPrice = itemCard.querySelector('.item__price');
        expect(itemDisplayPrice).to.not.be.null;

        const priceReductionText = itemCard.querySelector('.item__price-reduction');
        expect(priceReductionText).to.not.be.null;

        const primaryAndSecondaryAction = itemCard.querySelector('.item__actions');
        expect(primaryAndSecondaryAction).to.not.be.null;
        expect(primaryAndSecondaryAction.children).to.have.lengthOf(2);
    });
});
