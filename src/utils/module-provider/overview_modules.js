'use strict';
const mesellExpSSEClient = require('../service-util/mesell-expsvc-sse-client');
const debugModules = require('./debug_modules');

const env = require('environment-ebay');

module.exports = (req, res, svcPath, params, showDiag) => {
    const getOverviewModules = env.isProd()
        ? mesellExpSSEClient.getModules(req, res, svcPath, params).getModule
        : debugModules(req, res, svcPath, params);

    const data = {
        modulePromises: {
            leftNavModule: getOverviewModules('LEFTNAV', 'leftNavModule'),
            topNavModule: getOverviewModules('TOPNAV', 'topNavModule'),
            preferenceModule: getOverviewModules('PREFERENCE', 'preferenceModule'),
            mfeAdsModule: getOverviewModules('MFEADS', 'mfeAdsModule'),
            browserTitleModule: getOverviewModules('BROWSERTITLE', 'browserTitleModule'),
            welcomeScreenModule: getOverviewModules('WELCOMESCREEN', 'welcomeScreenModule'),
            willSellModule: getOverviewModules('WILLSELL', 'willSellModule'),
            listItemModule: getOverviewModules('LISTANITEM', 'listItemModule'),
            shipItModule: getOverviewModules('SHIPIT', 'shipItModule'),
            awaitingPaymentModule: getOverviewModules('AWAITINGPAYMENT', 'awaitingPaymentModule'),
            respondToOffersModule: getOverviewModules('RESPONDTOOFFERS', 'respondToOffersModule'),
            sioModule: getOverviewModules('SIO', 'sioModule'),
            reviseItModule: getOverviewModules('REVISEIT', 'reviseItModule'),
            relistItModule: getOverviewModules('RELISTIT', 'relistItModule'),
            leaveFeedbackModule: getOverviewModules('LEAVE_FEEDBACK_UI', 'leaveFeedbackModule'),
            kycAlertsModule: getOverviewModules('KYCALERTS', 'kycAlertsModule'),
            sellingActivityModule: getOverviewModules('SELLINGACTIVITY', 'sellingActivityModule'),
            sellerOnboardingModule: getOverviewModules('SELLERONBOARDING', 'sellerOnboardingModule'),
            errorStateModule: getOverviewModules('ERRORSTATE', 'errorStateModule'),
            emptyStateModule: getOverviewModules('EMPTYSTATE', 'emptyStateModule'),
            todoTitleModule: getOverviewModules('TODOTITLE', 'todoTitleModule'),
            switchToClassicModule: getOverviewModules('SWITCHTOCLASSIC', 'switchToClassicModule'),
            switchToAllSellingModule: getOverviewModules('SWITCHTOALLSELLING', 'switchToAllSellingModule'),
            finishItModule: getOverviewModules('FINISHIT', 'finishItModule'),
            promoOffersModule: getOverviewModules('PROMOOFFERS', 'promoOffersModule'),
            quickLinksModule: getOverviewModules('QUICKLINKS', 'quickLinksModule'),
            setupAPMModule: getOverviewModules('SETUPAPM', 'setupAPMModule'),
            manageReturnsModule: getOverviewModules('MANAGERETURNS', 'manageReturnsModule'),
            replyToItModule: getOverviewModules('REPLYTOIT', 'replyToItModule'),
            manageCancelModule: getOverviewModules('MANAGECANCEL', 'manageCancelModule'),
            pbcModule: getOverviewModules('PBCSHERPA', 'pbcModule'),
            pbcW2Module: getOverviewModules('PBCW2', 'pbcW2Module'),
            sellingLimitEnforcementModule: getOverviewModules('SLE', 'sellingLimitEnforcementModule'),
            socialSharingModule: getOverviewModules('SOCIALSHARING', 'socialSharingModule'),
            promoteListingModule: getOverviewModules('PROMOTELISTING', 'promoteListingModule'),
            todoListModule: getOverviewModules('TODOCOUNTSWRAPPER', 'todoListModule'),
            listingRequiredAspectsModule: getOverviewModules('LISTINGSREQUIREDASPECTS', 'listingRequiredAspectsModule'),
            listingRecommendedAspectsModule: getOverviewModules('LISTINGSRECOMMENDEDASPECTS', 'listingRecommendedAspectsModule'),
            listingSTBRequiredAspectsModule: getOverviewModules('LISTINGSSTBREQUIREDASPECTS', 'listingSTBRequiredAspectsModule'),
            madronaAdsModule: getOverviewModules('MADRONAADS', 'madronaAdsModule'),
            managedPaymentsModule: getOverviewModules('MANAGEDPAYMENTS', 'managedPaymentsModule'),
            outbackLotsModule: getOverviewModules('OUTBACKLOTS', 'outbackLotsModule'),
            outbackProcessingMessageModule: getOverviewModules('OUTBACKPROCESSINGMESSAGE', 'outbackProcessingMessageModule'),
            vacationSettingsModule: getOverviewModules('VACATIONSETTINGS', 'vacationSettingsModule')
        }
    };
    if (showDiag) {
        data.modulePromises.diagInfo = getOverviewModules('diagInfo', 'diagInfo');
    }
    return data;
};
