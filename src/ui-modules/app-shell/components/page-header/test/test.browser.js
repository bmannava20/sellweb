'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const pageHeaderComponent = require('../index.marko');
const mockData = require('./fixtures/default');

function buildWidget(data) {
    return pageHeaderComponent
        .renderSync({
            topNavModule: data.topNavModule,
            browserTitleModule: data.browserTitleModule
        })
        .appendTo(document.body)
        .getComponent();
}

describe('ui-modules/app-shell/components/page-header', () => {
    let widget;
    let topNavMenu;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        topNavMenu = widget.getEl('page-header');
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });

    describe('On clicking switch to classic button should', () => {
        let openClassicPrefDialog;
        beforeEach((done) => {
            openClassicPrefDialog = sinon.spy(widget, 'openClassicPrefDialog');
            setTimeout(() => {
                topNavMenu.querySelector('.switch-classic-link').click();
                done();
            }, 0);
        });
        afterEach(() => {
            widget && widget.destroy();
        });
        it('call openClassicPrefDialog method once ', () => {
            expect(openClassicPrefDialog.callCount).to.be.equal(1);
        });
    });
});
