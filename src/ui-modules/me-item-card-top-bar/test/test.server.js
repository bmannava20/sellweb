'use strict';
const expect = require('chai').expect;
const mockData = require('../mock-data/model');
const expectedMockdataModel = require('../mock-data/expectedOutput');
const helper = require('../helper');

describe('Item card top bar helper_js should normalize the input', () => {
    it('for Unanswered message model ', (done) => {
        const unansweredModel = helper.getModelData(mockData.unansweredModel);
        expect(JSON.stringify(unansweredModel)).to.equal(JSON.stringify(expectedMockdataModel.unansweredModel));
        done();
    });
    it('for Drop by Price model ', (done) => {
        const dropPriceModel = helper.getModelData(mockData.dropPriceModel);
        expect(JSON.stringify(dropPriceModel)).to.equal(JSON.stringify(expectedMockdataModel.dropPriceModel));
        done();
    });
});
