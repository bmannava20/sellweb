'use strict';

const mockData = require('../mock-data/mock-data.json');

module.exports = function(request, response) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const template = require('./template.marko');

    template.render(mockData, response);
};
