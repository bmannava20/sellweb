const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const defaultData = require('./fixtures/default.json');

let widget;

function buildWidget(data) {
    if (widget) {
        widget.destroy();
    }
    widget = template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given multi-item-order-details component', () => {
    describe('is rendered with multi items header', () => {
        beforeEach(() => {
            buildWidget(defaultData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have paypal Icon for payment initiated', () => {
            expect(widget.getEl('multiItemOrderDetails').querySelector('.paypal-payment-icon')).to.be.not.undefined;
        });

        it('should have order number', () => {
            const orderNumber = widget.getEl('multiItemOrderDetails').querySelector('.item__order-number');
            expect(orderNumber).to.be.not.null;
        });

        it('should have buyer paid date', () => {
            const buyerDate = widget.getEl('multiItemOrderDetails').querySelector('.item__paid-Date');
            expect(buyerDate).to.be.not.null;
        });

        it('should show local pick up as order shipping', () => {
            expect(widget.getEl('multiItemOrderDetails').querySelector('.item__order-shipping').textContent).to.be.equal('Local pickup');
        });
        it('should have item cont 2', () => {
            expect(widget.getEl('multiItemOrderDetails').querySelector('.item__item-count').textContent).to.be.equal('2 items total');
        });
    });
});
