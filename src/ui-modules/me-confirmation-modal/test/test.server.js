'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/model');
const expectedOutput = require('../mock-data/expectedOutput');
const helper = require('../helper');

describe('Delete helper_js should normalize the input', () => {
    it('for display', () => {
        const fullModel = helper.getModelData(mockData);
        expect(JSON.stringify(fullModel)).to.equal(JSON.stringify(expectedOutput));
    });
});
