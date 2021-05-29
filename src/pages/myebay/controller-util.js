const safeGet = require('just-safe-get');
const getConfig = require('src/utils/me-config').getConfig;
const i18n = require('../../utils/i18n').globalerrorpage;
const DEFAULT_LANG = 'en';
const serviceUrilHelper = require('../../utils/service-util/helper');
const getCsrf = require('../../utils/module-provider/csrf');
const promiseAllRejections = require('../../utils/helpers/promise-helper');

function getPageTemplate(req, res, viewModel, pageTemplate) {
    if (req.mesell && req.mesell.warmup) {
        viewModel.data.modules.warmup = req.mesell.warmup;
    }
    const configModule = viewModel.data.modules.configModule;
    getConfig((err, config) => {
        viewModel.data.modules.configModule = Object.assign(configModule, config);
        pageTemplate.render({
            $global: {
                pageName: req.ebay.getPageName(),
                siteId: req.ebay.getSiteId(),
                i18nModule: i18n(req, res)
            },
            lang: safeGet(req, 'locality.language', DEFAULT_LANG),
            lassoFlags: res.locals.flags || [],
            data: viewModel.data
        }, res);
    }, req);
}

function processPageRequest(req, res, options) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const pageName = options.pageName;
    const expsvcPath = options.expsvcPath;
    const commonModulesExpsvcPath = options.commonModulesExpsvcPath;
    const expSvcConfigBean = options.expSvcConfigBean;
    const navSvcConfigBean = options.navSvcConfigBean;
    const navModuleParams = options.navModuleParams;
    const pageModulesDataProvider = options.pageModulesDataProvider;
    const navModulesDataProvider = options.navModulesDataProvider;
    let navModuleQueryParams;
    let navData;
    // set page name
    const configModule = {};
    configModule.pageName = pageName;

    const pageReqParams = serviceUrilHelper.getRefreshPageParms(req);
    const pageData = pageModulesDataProvider(req, res, expsvcPath, pageReqParams, expSvcConfigBean);
    const allPromisesRejected = promiseAllRejections.promiseAllRejections(Object.values(pageData.modulePromises));

    if (navModuleParams && navModulesDataProvider) {
        navModuleQueryParams = `${navModuleParams}${pageName}`;
        navData = navModulesDataProvider(req, res, commonModulesExpsvcPath, navModuleQueryParams, navSvcConfigBean);
    }
    const viewModel = {
        data: {
            modules: {
                configModule: configModule,
                i18nModule: i18n(req, res)
            }
        },
        msgType: 200 // request ok
    };
    const csrf = getCsrf(req);

    Object.assign(
        viewModel.data.modules,
        pageData.modulePromises,
        navData && navData.modulePromises,
        { allPromisesRejected },
        csrf.modulePromises
    );

    return viewModel;
}
module.exports = {
    getPageTemplate,
    processPageRequest
};
