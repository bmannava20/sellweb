'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const meItemCardTopBar = require('../index.marko');
const mockData = require('../mock-data/model');

function buildWidget(data) {
    return meItemCardTopBar
        .renderSync({
            model: data
        })
        .appendTo(document.body)
        .getComponent();
}

describe('Item card top bar should show ', () => {
    let widget;
    afterEach(() => {
        widget && widget.destroy();
    });
    it('unanswered widget with blue button', (done) => {
        widget = buildWidget(mockData.unansweredModel);
        expect(widget.el.querySelector('.fake-btn--primary').innerText).to.equal('Respond to message');
        expect(widget.el.classList.contains('primary')).to.be.false;
        expect(widget.el.querySelector('.me-item-card-top-bar--msg').innerHTML).to.contain('<span class="me-item-card-top-bar--msg__primary negative">Unanswered message</span>');
        done();
    });
    it('drop price widget with blue button', (done) => {
        widget = buildWidget(mockData.dropPriceModel);
        expect(widget.el.querySelector('.btn--primary').innerText).to.equal('Drop price by $5');
        expect(widget.el.classList.contains('primary')).to.be.true;
        expect(widget.el.querySelector('.me-item-card-top-bar--msg').innerHTML).to.contain('<span class="me-item-card-top-bar--msg__primary">Attract more buyers by lowering the price</span>');
        done();
    });
    describe('blue share listing button', () => {
        let onButtonClick;
        beforeEach((done) => {
            widget = buildWidget(mockData.socialShareListingModel);
            onButtonClick = sinon.spy(widget, 'onButtonClick');
            document.querySelector('.btn--primary').click();
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should emit onButtonClick event when button is clicked', () => {
            expect(onButtonClick.args[0][1].originalEvent).to.be.not.undefined;
            // compare tracking list object passed to the event
            expect(JSON.stringify(onButtonClick.args[0][0])).to.be.equal(JSON.stringify(mockData.socialShareListingModel.callToAction.action.trackingList));
            expect(onButtonClick.callCount).to.be.equal(1);
        });
    });
});
