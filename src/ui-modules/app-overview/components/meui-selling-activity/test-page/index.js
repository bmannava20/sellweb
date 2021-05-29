'use strict';

const successMockData = require('../mock-data/selling-activity-data.json');
const soldFailureMockData = require('../mock-data/sold-error.json');
const totalsMockData = require('../mock-data/totals-error.json');
const promoMockData = require('../mock-data/promo-error.json');

module.exports = function(request, response) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const template = require('./template.marko');
    const mockData = {};
    mockData.success = successMockData;
    mockData.soldFailure = soldFailureMockData;
    mockData.totalsFailure = totalsMockData;
    mockData.promoFailure = promoMockData;

    template.render(mockData, response);
};
