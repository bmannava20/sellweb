'use strict';

const getInsightsSvcPath = input => {
    if (!input || !input.pageName || !input.queryParams) {
        return input.svcPath;
    }
    return `/${input.pageName.toLowerCase()}/${Object.keys(input.queryParams)[0]}`;
};

const getBulkDraftsPath = input => {
    if (!input || !input.pageName) {
        return;
    }
    if (input.pageName.toLowerCase() === 'overview') {
        return '/create_lot_drafts?client_name=myebay_overview';
    }

    return '/create_lot_drafts';
};

const containerConfig = {
    active: {
        pageName: 'ACTIVE',
        mainContainerSvc: ['MesellActiveExpSvc'],
        spa: ['MesellActiveExpSvc', 'MesellModuleProvider'],
        share: ['SocialShareModuleProvider'],
        endListingGet: ['EndListingGetSvc'],
        endListingSubmit: ['EndListingSubmitSvc'],
        dropPrice: ['MesellActiveExpSvc'],
        modules: 'ACTIVE'
    },
    overview: {
        pageName: 'OVERVIEW',
        share: ['SocialShareModuleProvider'],
        upicancel: ['CancelUPISvc'],
        bulktool: ['bulktool'],
        bulkDraftApiPath: '/mys/ajx/overview/lotitems/generatedrafts'
    },
    unsold: {
        pageName: 'UNSOLD',
        mainContainerSvc: ['MesellUnSoldExpSvc'],
        spa: ['MesellUnSoldExpSvc', 'MesellModuleProvider'],
        delete: ['MesellUnSoldDeleteExpSvc'],
        modules: 'UNSOLD'
    },
    scheduled: {
        pageName: 'SCHEDULED',
        mainContainerSvc: ['MesellScheduledExpSvc'],
        spa: ['MesellScheduledExpSvc', 'MesellModuleProvider'],
        modules: 'SCHEDULED'
    },
    drafts: {
        pageName: 'DRAFT',
        mainContainerSvc: ['MesellDraftExpSvc'],
        spa: ['MesellDraftExpSvc', 'MesellModuleProvider'],
        bulktool: ['bulktool'],
        getOrderDetails: ['getOrderDetailsSvc'],
        modules: 'DRAFT'
    },
    sold: {
        pageName: 'SOLD',
        mainContainerSvc: ['MesellSoldExpSvc'],
        spa: ['MesellSoldExpSvc', 'MesellModuleProvider'],
        delete: ['MesellSoldDeleteExpSvc'],
        modules: 'SOLD'
    },
    insights: {
        pageName: 'INSIGHTS',
        mainContainerSvc: ['MesellInsightsExpSvc'],
        spa: ['MesellInsightsExpSvc'],
        modules: 'INSIGHTS'
    },
    CancelUPISvc: {
        payload: (input) => ({
            service: 'CancelUPISvc',
            svcPath: '/cancellation',
            reqBody: input.reqBody,
            method: input.method
        })
    },
    bulktool: {
        payload: (input) => ({
            service: 'bulktool',
            svcPath: getBulkDraftsPath(input),
            reqBody: input.reqBody,
            method: input.method
        })
    },
    getOrderDetailsSvc: {
        payload: (input) => ({
            service: 'getOrderDetailsSvc',
            svcPath: '/get_order_details',
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellUnSoldExpSvc: {
        payload: (input) => ({
            service: 'MesellUnSoldExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellUnSoldDeleteExpSvc: {
        payload: (input) => ({
            service: 'MesellUnSoldDeleteExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            reqBody: input.reqBody,
            method: input.method
        })
    },
    MesellDraftExpSvc: {
        payload: (input) => ({
            service: 'MesellDraftExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellActiveExpSvc: {
        payload: (input) => ({
            service: 'MesellActiveExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellScheduledExpSvc: {
        payload: (input) => ({
            service: 'MesellScheduledExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellSoldExpSvc: {
        payload: (input) => ({
            service: 'MesellSoldExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellSoldDeleteExpSvc: {
        payload: (input) => ({
            service: 'MesellSoldDeleteExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            reqBody: input.reqBody,
            method: input.method
        })
    },
    MesellwebExpSvc: {
        payload: (input) => ({
            service: 'MesellwebExpSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellInsightsExpSvc: {
        payload: (input) => ({
            service: 'MesellwebSPA',
            svcPath: getInsightsSvcPath(input),
            queryParams: input.queryParams,
            method: input.method
        })
    },
    MesellModuleProvider: {
        payload: (input) => ({
            service: 'MesellModuleProvider',
            svcPath: input.svcPath,
            queryParams: `module_groups=NAV&page_name=${input.pageName}`,
            method: input.method
        })
    },
    SocialShareModuleProvider: {
        payload: (input) => ({
            service: 'SocialShareModuleProvider',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    EndListingGetSvc: {
        payload: (input) => ({
            service: 'EndListingGetSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            method: input.method
        })
    },
    EndListingSubmitSvc: {
        payload: (input) => ({
            service: 'EndListingSubmitSvc',
            svcPath: input.svcPath,
            queryParams: input.queryParams,
            reqBody: input.reqBody,
            method: input.method
        })
    }
};

module.exports = {
    container_config: containerConfig,
    getInsightsSvcPath
};
