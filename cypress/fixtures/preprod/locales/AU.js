module.exports = {
    urls: {
        baseTestDomain: 'https://latest.ebay.com.au',
        baseOverviewPagePath: '/mys/overview',
    },
    username: 'cpstestandroid21',
    password: 'cpsqa111',
    fixtureFile: 'AU',

    modules: {
        'On board': {
            'New business seller guide': {
                matchUrl: 'https://sellercentre.ebay.co.uk/business/getting-started$',
            },
            'Choose your Shop subscription': {
                matchUrl: '/sub/subscriptions$',
            },
            // ... More links here
        },
    },

}