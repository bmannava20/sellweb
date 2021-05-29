'use strict';

const chai = require('chai');
const expect = chai.expect;
const meLineActions = require('../index.marko');
const lineActionsModel = require('./mock-data/line-actions.json');

function buildWidget(data) {
    return meLineActions
        .renderSync({
            options: data
        })
        .appendTo(document.body)
        .getComponent();
}

describe('given me-line-actions component is rendered with overview line actions model', () => {
    let menuComponent;
    let widget;
    beforeEach((done) => {
        widget = buildWidget(lineActionsModel.overview.options);
        menuComponent = widget.getComponent('meLineActionMenu').getEl();
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('then it renders the component with the right length', () => {
        expect(menuComponent.querySelector('.fake-menu-button__items').children.length).to.equal(lineActionsModel.overview.options.length);
    });

    it('then it renders the menu item component with the right properties', () => {
        const firstProp = lineActionsModel.overview.options[0];

        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('href')).to.equal(firstProp.label.action.URL);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('data-contract-id')).to.equal(firstProp.label.action.params.contractIds);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('_sp')).to.equal(firstProp.label.action.trackingList[0].eventProperty.sid);
    });
});

describe('given me-line-actions component is rendered with sold line actions model', () => {
    let menuComponent;
    let widget;
    beforeEach((done) => {
        widget = buildWidget(lineActionsModel.sold.options);
        menuComponent = widget.getComponent('meLineActionMenu').getEl();
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('then it renders the component with the right length', () => {
        expect(menuComponent.querySelector('.fake-menu-button__items').children.length).to.equal(lineActionsModel.sold.options.length);
    });

    it('then it renders the menu item component with the right properties', () => {
        const firstProp = lineActionsModel.sold.options[0];

        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('href')).to.equal(firstProp.action.URL);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('data-contract-id')).to.equal(firstProp.action.params.contractIds);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('_sp')).to.equal(firstProp.action.trackingList[0].eventProperty.sid);
    });
});
describe('given me-line-actions component is rendered with Active line actions model', () => {
    let menuComponent;
    let widget;
    beforeEach((done) => {
        widget = buildWidget(lineActionsModel.activeUnansweredMessage.options);
        menuComponent = widget.getComponent('meLineActionMenu').getEl();
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('then it renders the component with the right length', () => {
        expect(menuComponent.querySelector('.fake-menu-button__items').children.length).to.equal(lineActionsModel.activeUnansweredMessage.options.length);
    });

    it('then it renders the menu item component with the right properties', () => {
        const firstProp = lineActionsModel.activeUnansweredMessage.options[0];
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('href')).to.equal(firstProp.action.URL);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('data-contract-id')).to.equal(firstProp.action.params.contractIds);
        expect(menuComponent.querySelector('.fake-menu-button__items .fake-menu-button__item').getAttribute('_sp')).to.equal(firstProp.action.trackingList[0].eventProperty.sid);
    });
});
