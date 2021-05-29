'use strict';

const chai = require('chai');
const expect = chai.expect;
const itemCardRow = require('../index.marko');
const mockData = require('./fixtures/default');

function buildWidget(data) {
    return itemCardRow
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Sold Item card header should show ', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget(mockData);
        root = document.querySelector('.sold-item--header');
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('Item action bar should show message', () => {
        expect(root.querySelector('.me-item-card-top-bar--msg__primary').innerText).to.equal('Shipment overdue');
    });
    it('Item action bar should Print shipping label button', () => {
        expect(root.querySelector('.me-item-card-top-bar__primary_btn a').innerText).to.equal('Print shipping label');
    });
    it('Item action bar should notice', () => {
        expect(root.querySelectorAll('.inline-notice').length).to.equal(1);
    });
});
