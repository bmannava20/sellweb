'use strict';

const safeGet = require('just-safe-get');
const spaCmd = require('../../utils/helpers/constants').SPA_COMMAND;
const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');
const redirect = require('../../utils/redirect');
const scrollUtil = require('../../utils/helpers/scroll-util');
const fetch = require('../../utils/helpers/fetch-wrapper').fetch;
const history = require('../../utils/helpers/history');
require('lasso-loader').setTimeout(30000);
/*
 * TODO: we need to remove this once Pulsur.js provides an API for SPA
 */
const updateTracking = function(pageId) {
    /* eslint-disable */
    if (_plsubtInp) {
        _plsubtInp.pageId = pageId;
        _plsubtInp.pageLoadTime = new Date().getTime();
    }
    /* eslint-disable */
};

const getJSON = function (url, callback, locationURL, i18nModule) {
    fetch(url)
        .then(response => {
            if(i18nModule && response){
                response.modules.i18nModule = i18nModule;
            }
            redirect(response);
            if (!response.msgType) {
                callback(response);
                scrollUtil.scrollToTop();
                history.setBrowserHistory(response, locationURL, locationURL);
            } else {
                window.location.href = locationURL;
            }
        })
        .catch(err => {
            console.error(err);
            window.location.href = locationURL;
        });
};

const renderPageUnsold = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-unsold').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();

            updateTracking(spaCmd.UNSOLD.expPageId);
        }
    );
};

const renderPageOverview = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-overview').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();

            updateTracking(spaCmd.OVERVIEW.expPageId);
        }
    );
};
const renderPageActive = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-active').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.ACTIVE.expPageId);
        }
    );
};
const renderPageDrafts = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-drafts').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();

            updateTracking(spaCmd.DRAFTS.expPageId);
        }
    );
};

const renderPageScheduled = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-scheduled').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();

            updateTracking(spaCmd.SCHEDULED.expPageId);
        }
    );
};

const renderPageSold = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-sold').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.SOLD.expPageId)
        }
    );
};

const renderPageInsightsRevise = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-insights-revise').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.INSIGHTS_REVISE.expPageId)
        }
    );
};
const renderPageInsightsSio = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-insights-sio').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.INSIGHTS_SIO.expPageId)
        }
    );
};

const renderPageInsightsManageReturns = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-insights-manage-returns').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.INSIGHTS_MANAGE_RETURNS.expPageId)
        }
    );
};

const renderPageInsightsManageOutbackLots = function (data) {
    require('lasso-loader').async(
        () => {
            const renderResult = require('../app-insights-manage-outback-lots').renderSync({
                'model': {
                    'data': data
                }
            });
            renderResult
                .replaceChildrenOf(document.getElementById('mainContent'))
                .getComponent();
            updateTracking(spaCmd.INSIGHTS_MANAGE_OUTBACK_LOTS.expPageId)
        }
    );
};


module.exports = class {
    onMount() {
        const self = this;

        // $.ajaxSetup({
        //     beforeSend: function(xhr) {
        //         xhr.setRequestHeader('srt', self.input.model.modules.csrfTokenModule);
        //     }
        // });

        // This is being done, since fetch doesn't have beforeSend feature. So that this will be used inside fetch-wrapper.js
        // TODO: Is there a better way to set this?
        window.eBay = window.eBay || {};
        window.eBay.csrfTokenModule = self.input.model.modules.csrfTokenModule;
        const spinner = this.getComponent('spinner');
        spinner.hideSpinner();

        // This is to replace initial state when the page is loaded not using ajax
        // Why we need to save the whole page data here?
        if (!window.replaceStateExe) {
            history.setBrowserHistory(self.input.model, location.href, location.href, true);
            window.replaceStateExe = true;
        }

        // we need to pop out the previewous history object
        if (!window.popStateRegistered) {
            window.addEventListener('popstate', e => {
                const state = e.state;
                let model = safeGet(e, 'state.model') || safeGet(e, 'state.sStorage');

                if (model.sKey) {
                    model = browserStorage.getItem('sKey');
                }
                const url = state && state.url;

                // if cache gets empty make anew request.
                // to do: we need to use ajax req instead of page reload
                if (!model) {
                    window.location.href = url;
                }

                const pageName = safeGet(model, 'modules.configModule.pageName');
                spinner.showSpinner();
                if (pageName === spaCmd.OVERVIEW.COMMAND_NAME) {
                    renderPageOverview(model);
                } else if (pageName === spaCmd.UNSOLD.COMMAND_NAME) {
                    // self.getHistory(url);
                    renderPageUnsold(model);
                } else if (pageName === spaCmd.DRAFTS.COMMAND_NAME) {
                    renderPageDrafts(model);
                } else if (pageName === spaCmd.ACTIVE.COMMAND_NAME) {
                    renderPageActive(model);
                } else if (pageName === spaCmd.SCHEDULED.COMMAND_NAME) {
                    renderPageScheduled(model);
                } else if (pageName === spaCmd.SOLD.COMMAND_NAME) {
                    renderPageSold(model);
                } else if (pageName === spaCmd.INSIGHTS_REVISE.COMMAND_NAME) {
                    renderPageInsightsRevise(model);
                } else if (pageName === spaCmd.INSIGHTS_SIO.COMMAND_NAME) {
                    renderPageInsightsSio(model);
                } else if (pageName === spaCmd.INSIGHTS_MANAGE_RETURNS.COMMAND_NAME) {
                    renderPageInsightsManageReturns(model);
                } else if (pageName === spaCmd.INSIGHTS_MANAGE_OUTBACK_LOTS.COMMAND_NAME) {
                    renderPageInsightsManageOutbackLots(model);
                } else {
                    spinner.hideSpinner();
                }
            });
            window.popStateRegistered = true;
        }

        // Clear scandal footer ads as a hack to solve SPA footer ads issue, needs fix from ads team MEBS-6993
        const gfads = document.querySelectorAll('.global-footer > [title=ADVERTISEMENT],#gf-mrecs-ads > [title=ADVERTISEMENT]');
        if (gfads) {
            // older ie browsers doesnt support for each or for of on NodeList
            for (let i = 0; i < gfads.length; i++) {
                const adsDiv = gfads[i];
                try {
                    adsDiv.style.display = 'none';
                } catch (e) {
                    // continue regardless of error
                }
            }
        }
    }
    onCreate(input) {
        this.state = input;
    }
    onAppUpdate(e) {
        const enableSPA = safeGet(this, 'state.model.modules.configModule.EnableSPA');
        const i18nModule = safeGet(this, 'state.model.modules.i18nModule');
        const spinner = this.getComponent('spinner');
        spinner.showSpinner();

        function getSpaUrl(pageName, params) {
            if (params && params.length > 1) {
                return `${spaCmd[pageName].SPA_OVERVIEW_SEEALL_URL}${params}`;
            } else {
                return spaCmd[pageName].SPA_URL;
            }
        }

        function getWindowURL(_windowURL, params) {
            if (params && params.length > 1) {
                return `${_windowURL}/rf${params}`;
            } else {
                return _windowURL;
            }
        }

        if (enableSPA !== true) {
            window.location.href = e.url;
            return;
        }

        let spaUrl;
        let callBack;
        let windowUrl;

        switch (e.name) {
            case spaCmd.UNSOLD.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.UNSOLD.COMMAND_NAME, e.params);
                callBack = renderPageUnsold;
                windowUrl = getWindowURL(spaCmd.UNSOLD.WINDOW_URL, e.params);
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.OVERVIEW.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.OVERVIEW.COMMAND_NAME, e.params);
                callBack = renderPageOverview;
                windowUrl = getWindowURL(spaCmd.OVERVIEW.WINDOW_URL, e.params);
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.ACTIVE.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.ACTIVE.COMMAND_NAME, e.params);
                callBack = renderPageActive;
                windowUrl = getWindowURL(spaCmd.ACTIVE.WINDOW_URL, e.params);
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.SOLD.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.SOLD.COMMAND_NAME, e.params);
                callBack = renderPageSold;
                windowUrl = getWindowURL(spaCmd.SOLD.WINDOW_URL, e.params);
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.DRAFTS.ACTION_NAME:
                spaUrl = getSpaUrl('DRAFTS', e.params);
                callBack = renderPageDrafts;
                windowUrl = getWindowURL(spaCmd.DRAFTS.WINDOW_URL, e.params);
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.SCHEDULED.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.SCHEDULED.COMMAND_NAME, e.params);
                callBack = renderPageScheduled;
                windowUrl = spaCmd.SCHEDULED.WINDOW_URL;
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.INSIGHTS_REVISE.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.INSIGHTS_REVISE.COMMAND_NAME, e.params);
                callBack = renderPageInsightsRevise;
                windowUrl = spaCmd.INSIGHTS_REVISE.WINDOW_URL;
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.INSIGHTS_SIO.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.INSIGHTS_SIO.COMMAND_NAME, e.params);
                callBack = renderPageInsightsSio;
                windowUrl = spaCmd.INSIGHTS_SIO.WINDOW_URL;
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.INSIGHTS_MANAGE_RETURNS.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.INSIGHTS_MANAGE_RETURNS.COMMAND_NAME, e.params);
                callBack = renderPageInsightsManageReturns;
                windowUrl = spaCmd.INSIGHTS_MANAGE_RETURNS.WINDOW_URL;
                getJSON(spaUrl, callBack, windowUrl);
                break;
            case spaCmd.INSIGHTS_MANAGE_OUTBACK_LOTS.ACTION_NAME:
                spaUrl = getSpaUrl(spaCmd.INSIGHTS_MANAGE_OUTBACK_LOTS.COMMAND_NAME, e.params);
                callBack = renderPageInsightsManageOutbackLots;
                windowUrl = spaCmd.INSIGHTS_MANAGE_OUTBACK_LOTS.WINDOW_URL;
                getJSON(spaUrl, callBack, windowUrl, i18nModule);
                break;
            default:
                window.location.href = e.url;
                break;
        }
    }
    openClassicPrefDialog() {
        const trackingList = safeGet(this.state, 'modules.topNavModule.switchToClassicLink.action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
        const modal = this.getComponent('switch-classic-modal');
        const modalEl = document.getElementsByClassName('switch-classic-link')[0];
        modal.showModal(modalEl);
    }
    openSwitchToAllSellingDialog() {
        const trackingList = safeGet(this.state, 'modules.topNavModule.switchToAllsellingLink.action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
        const modal = this.getComponent('switch-all-selling-modal');
        const modalEl = document.getElementsByClassName('classic-pref-modal')[0];
        modal.showModal(modalEl);
    }
};
