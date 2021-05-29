'use strict';

module.exports = function(request, response) {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    const template = require('./template.marko');
    const mockData = {};
    template.render(mockData, response);
};
