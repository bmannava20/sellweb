'use strict';
const expect = require('chai').expect;
const mockData = require('../mock-data/model');
const mockDataEmpty = require('../mock-data/model-empty');

const expectedMockdataModel = require('../mock-data/expectedOutput');
const helper = require('../helper');

describe('Me sort helper_js should normalize the input', () => {
    it('for full model ', () => {
        const fullModel = helper.getModelData(mockData);
        expect(JSON.stringify(fullModel)).to.equal(JSON.stringify(expectedMockdataModel.fullModel));
    });
    it('for empty model', () => {
        const emptyModel = helper.getModelData(mockDataEmpty);
        expect(JSON.stringify(emptyModel)).to.equal(JSON.stringify(expectedMockdataModel.emptyModel));
    });
});
