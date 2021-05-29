'use strict';
// const sinon = require('sinon');
const expect = require('chai').expect;
const shareItMockData = require('../mock-data/index.js');
const renderer = require('../');

function buildWidget(data) {
    return renderer
        .renderSync({ model: data })
        .appendTo(document.body)
        .getComponent();
}

describe('Share it empty module', () => {
    let widget;

    beforeEach(() => {
        widget = buildWidget(shareItMockData.emptyData);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should be empty because data is empty', () => {
        expect(widget.data).to.be.undefined;
    });
});

describe('Share it module', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget(shareItMockData.modules.shareItModule);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render share it module data model', () => {
        const itemsListEl = document.getElementsByClassName('item-list');
        expect(itemsListEl.length).to.be.equal(1);
        expect(itemsListEl[0].getElementsByClassName('meui-item-tile')).to.have.length(3);
    });

    it('should show the primary line action button', () => {
        const primaryActionBtn = shareItMockData.modules.shareItModule.lineItems[0].__me.lineActions.options[0].selections[0].label.value;
        expect(primaryActionBtn).to.include('shareit');
    });

    // describe('show items with share list option in the drop down ', () => {
    //     let buttonClickSpy;
    //     let root;
    //     beforeEach((done) => {
    //         buttonClickSpy = sinon.spy(widget, 'onButtonClick');
    //         root = document.querySelector('.share-it-module');
    //         setTimeout(done);
    //     });
    //     afterEach(() => {
    //         widget && widget.destroy();
    //     });
    //     it('clicking the link should emit onButtonClick event ', () => {
    //         const childEl = root.querySelectorAll('.meui-item-tile')[0].querySelector('.share-it');
    //         childEl.click();
    //         expect(buttonClickSpy.callCount).to.be.equal(1);
    //     });
    // });
});
