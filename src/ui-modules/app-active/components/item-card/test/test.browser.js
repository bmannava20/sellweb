'use strict';

const chai = require('chai');
const expect = chai.expect;
const itemCardRow = require('../index.marko');
const mockData = require('../mock-data/model');

function buildWidget(data) {
    return itemCardRow
        .renderSync({
            item: data.item
        })
        .appendTo(document.body)
        .getComponent();
}

describe('Item card should show ', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget(mockData);
        root = document.querySelector('.active-item');
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it(' card with Responds to message top bar', () => {
        expect(root.querySelector('.fake-btn--primary').innerText).to.equal('Respond to message');
        expect(root.querySelector('.me-item-card-top-bar--msg').innerHTML).to.contain('<span class="me-item-card-top-bar--msg__primary emphasis">Unanswered message</span>');
    });
    it(' inline action secondary button with tracking sid ', () => {
        expect(root.querySelector('.item__cta-wrapper .fake-btn--secondary').innerText).to.equal('Revise');
        expect(root.querySelector('.item__cta-wrapper .fake-btn--secondary').getAttribute('_sp')).to.equal('p2524149.m5429.l9423');
    });
    it(' inline action items with tracking sids', () => {
        const inlineActions = root.querySelectorAll('.item__cta-wrapper .fake-menu-button__item');
        expect(inlineActions.length).to.equal(4);
        const expectedSids = [
            'p2524149.m5429.l5770',
            'p2524149.m5429.l9190',
            'p2524149.m5429.l9201',
            'p2524149.m5429.l9200'
        ];
        const expectedMenuOptionLabel = [
            'Share listing',
            'Sell similar',
            'Review all offers',
            'End listing'
        ];
        let sid;
        let innerText;
        for (let i = 0; i < inlineActions.length; i++) {
            sid = inlineActions[i].getAttribute('_sp');
            innerText = inlineActions[i].innerText;
            expect(sid).to.equal(expectedSids[i]);
            expect(innerText).to.equal(expectedMenuOptionLabel[i]);
        }
    });
});
