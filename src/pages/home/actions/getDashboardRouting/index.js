'use strict';

/**
 * Action: getDashboardRouting
 * Domain: home
 */
module.exports = context => async parameters => {
    const request = parameters.request || parameters;
    const response = await context.services.routingDashboard.get(request).path('common/route').end(); // use .end(true) to switch to streaming if the service returns progressive response
    return response.body;
};
