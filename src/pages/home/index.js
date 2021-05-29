'use strict';
/**
 * Action: home
 * Domain: controllers
 */
module.exports = context => async parameters => {
    // get default url in case experience service fail.
    const defaultRoutingURL = await context.config.get('defaultRoutingURL');

    if (parameters && parameters.source) {
        const data = await context.actions.getDashboardRouting(parameters)
            .catch((err) => {
                console.error(err);
                // skip and fallback to default one
            });
        if (data) return redirect(context, data.screenFlowDestination.URL);
    }
    return redirect(context, defaultRoutingURL);
};

function redirect(context, url) {
    return context.response.create({
        statusCode: 302,
        headers: {
            location: url
        }
    });
}
