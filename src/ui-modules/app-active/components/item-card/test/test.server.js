'use strict';
const expect = require('chai').expect;
const mockData = require('../mock-data/model');
const expectedMockdataModel = require('../mock-data/expectedOutput');
const helper = require('../helper');

describe('Item card helper should normalize the input', () => {
    it(' for item details and inline actions', () => {
        const unansweredModel = helper.getModelData(mockData);
        expect(JSON.stringify(unansweredModel)).to.equal(JSON.stringify(expectedMockdataModel));
    });
});
