'use strict';

const { expect } = require('chai');
const template = require('../index.marko');
const mockData = require('../mock-data/model');
const fullData = require('./fixtures/full-data');
const { render, fireEvent, cleanup } = require('@marko/testing-library');

describe('Pagination component should', () => {
    let component;
    beforeEach(async() => {
        component = await render(template, mockData);
    });

    afterEach(cleanup);

    it('show Pagination compopent with both pages and items per page components ', async() => {
        const paginationComponent = await component.getByRole('navigation');
        expect(paginationComponent).to.be.not.undefined;
        const itemsPerPageComponent = await component.getByText('Items per page');
        expect(itemsPerPageComponent).to.be.not.undefined;
    });

    it('should show pages component with page 1 selected ', async() => {
        const pages = await component.getAllByRole('button');
        expect(pages).to.have.length(4);
        const firstPage = await component.getByText('1');
        expect(firstPage.hasAttribute('aria-current')).to.be.true;
    });

    it('should show pages component with previous arrow disabled and next arrow enabled ', async() => {
        const pages = await component.getAllByRole('button');
        expect(pages[0].getAttribute('aria-disabled')).to.equal('true');
        expect(pages[3].hasAttribute('aria-disabled')).to.be.false;
    });

    it('show Items per page component ebay select with 3 options', () => {
        const combobox = component.getByRole('combobox');
        expect(combobox.options).to.have.length(3);
    });

    describe('when items per page is clicked', () => {
        const expectedIndex = 1;
        const expectedValue = mockData.model.itemsPerPage.options[expectedIndex].action.URL;
        beforeEach(async() => {
            const combobox = component.getByRole('combobox');
            combobox.selectedIndex = 1;
            await fireEvent.change(combobox);
        });

        it('then handlePaginationRequest should be called once ', () => {
            const changeEvents = component.emitted(mockData.eventDelegate);
            expect(changeEvents).has.length(1);
            const [[{ actionParams, action }]] = changeEvents;
            expect(actionParams).to.equal(expectedValue);
            expect(action).to.equal('pagination');
        });
    });

    describe('when page number is clicked', () => {
        const expectedValue = mockData.model.pages[0].action.URL;
        beforeEach(async() => {
            const firstPage = component.getByText('1');
            await fireEvent.click(firstPage);
        });

        it('then handlePaginationRequest should be called once ', () => {
            const changeEvents = component.emitted(mockData.eventDelegate);
            expect(changeEvents).has.length(1);
            const [[{ actionParams, action }]] = changeEvents;
            expect(actionParams).to.equal(expectedValue);
            expect(action).to.equal('pagination');
        });
    });
});
describe('Pagination component with full data should', () => {
    let component;
    beforeEach(async() => {
        component = await render(template, fullData);
    });

    afterEach(cleanup);

    it('should show pages component with previous and next arrow enabled ', async() => {
        const pages = await component.getAllByRole('button');
        expect(pages[0].hasAttribute('aria-disabled')).to.be.false;
        expect(pages[pages.length - 1].hasAttribute('aria-disabled')).to.be.false;
    });
});
