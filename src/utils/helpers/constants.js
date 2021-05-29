module.exports = {
    KEY_CODE: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        SPACEBAR: 32,
        BACKSPACE: 8,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36
    },
    /**
     * @description default styleMaps which maps to experience service textSpans styles
     * @type {Object}
     */
    STYLE_MAPS: {
        NO_DEFAULT: {
            'styleMap': {
                'BOLD': 'bold',
                'NEGATIVE': 'negative',
                'DEFAULT': 'default',
                'EMPHASIS': 'emphasis',
                'POSITIVE': 'positive',
                'HIGHLIGHT': 'highlight'
            }
        },
        WITH_DEFAULT: {
            'defaultClass': 'normal',
            'styleMap': {
                'BOLD': 'bold',
                'NEGATIVE': 'negative',
                'DEFAULT': 'default',
                'EMPHASIS': 'emphasis',
                'POSITIVE': 'positive',
                'HIGHLIGHT': 'highlight'
            }
        }
    },
    EXPSVC_PATH: {
        UNSOLD: '/unsold/module_provider',
        OVERVIEW: '/overview_screen',
        OVERVIEW_RELOAD: '/overview_screen?module_groups=OVERVIEW',
        ACTIVE: '/active/module_provider',
        SCHEDULED: '/scheduled/module_provider',
        DRAFTS: '/draft/module_provider',
        SOLD: '/sold/module_provider',
        COMMON_MODULES: '/common/module_provider',
        NAV_MODULES_PARAMS: 'module_groups=NAV&page_name=',
        INSIGHTS_REVISE: '/insights/revise',
        INSIGHTS_SIO: '/insights/offers_to_buyers',
        INSIGHTS_MANAGE_RETURNS: '/insights/manage_returns',
        INSIGHTS_MANAGE_OUTBACK_LOTS: '/insights/manage_outback_lots'
    },
    SPA_COMMAND: {
        UNSOLD: {
            COMMAND_NAME: 'UNSOLD',
            ACTION_NAME: 'MYEBAY_UNSOLD_GET',
            SPA_URL: '/mys/ajx/unsold/spa/UNSOLD',
            WINDOW_URL: '/mys/unsold',
            SPA_OVERVIEW_SEEALL_URL: '/mys/ajx/unsold/overview_seeAll',
            AJAX_URL: '/mys/ajx/unsold',
            ADD_NOTE_URL: '/mys/ajx/usernote',
            RELOAD_MAIN_CONTAINER_ACTION_NAME: 'reloadmaincontainer',
            expPageId: 2386164
        },
        OVERVIEW: {
            COMMAND_NAME: 'OVERVIEW',
            ACTION_NAME: 'MYEBAY_SELLING_OVERVIEW_GET',
            SPA_URL: '/mys/ajx/spa/OVERVIEW',
            WINDOW_URL: '/mys/overview',
            expPageId: 2486981,
            MARK_AS_PAID_COMMAND_NAME: 'markAsPaid',
            MARK_AS_PAID_FUNC_NAME: 'MARK_PAYMENT_RECEIVED',
            OVERVIEW_AJAX_URL: {
                RELIST_DELETE_ITEM: '/mys/ajx/delete',
                RELIST_REFETCH: '/mys/ajx/relistIt/update',
                UPI_CANCEL: '/mys/ajx/overview/upiCancel/cancel',
                BULK_DRAFT_API: '/mys/ajx/overview/lotitems/generatedrafts'
            }
        },
        ACTIVE: {
            COMMAND_NAME: 'ACTIVE',
            ACTION_NAME: 'MYEBAY_ACTIVE_GET',
            SPA_URL: '/mys/ajx/active/spa/ACTIVE',
            ENS_LISTING_URL: '/mys/ajx/active/end_listing/ACTIVE',
            WINDOW_URL: '/mys/active',
            AJAX_URL: '/mys/ajx/active',
            SPA_OVERVIEW_SEEALL_URL: '/mys/ajx/active/overview_seeAll',
            expPageId: 2524149
        },
        SCHEDULED: {
            COMMAND_NAME: 'SCHEDULED',
            ACTION_NAME: 'MYEBAY_SCHEDULED',
            SPA_URL: '/mys/ajx/scheduled/spa/SCHEDULED',
            WINDOW_URL: '/mys/scheduled',
            AJAX_URL: '/mys/ajx/scheduled',
            SPA_OVERVIEW_SEEALL_URL: '/mys/ajx/scheduled/overview_seeAll',
            ADD_NOTE_URL: '/mys/ajx/usernote',
            RELOAD_MAIN_CONTAINER_ACTION_NAME: 'reloadmaincontainer',
            expPageId: 2560544
        },
        DRAFTS: {
            COMMAND_NAME: 'DRAFT',
            ACTION_NAME: 'MYEBAY_DRAFTS',
            SPA_URL: '/mys/ajx/drafts/spa/DRAFTS',
            WINDOW_URL: '/mys/drafts',
            AJAX_URL: '/mys/ajx/drafts',
            SPA_OVERVIEW_SEEALL_URL: '/mys/ajx/drafts/overview_seeAll',
            RELOAD_MAIN_CONTAINER_ACTION_NAME: 'reloadmaincontainer',
            DELETE_URL: '/deleteAndRefetch',
            expPageId: 2542744,
            DRAFTS_AJAX_URL: {
                BULK_CREATE_API: '/mys/ajx/drafts/lotitems/generatedrafts',
                BULK_SEARCH_API: '/mys/ajx/drafts/lotitems/getorderdetails'
            }
        },
        SOLD: {
            COMMAND_NAME: 'SOLD',
            ACTION_NAME: 'MYEBAY_SOLD',
            SPA_URL: '/mys/ajx/sold/spa/SOLD',
            WINDOW_URL: '/mys/sold',
            AJAX_URL: '/mys/ajx/sold',
            SPA_OVERVIEW_SEEALL_URL: '/mys/ajx/sold/overview_seeAll',
            ADD_NOTE_URL: '/mys/ajx/usernote',
            DELETE_URL: '/delete',
            RELOAD_MAIN_CONTAINER_ACTION_NAME: 'reloadMainContainer',
            expPageId: 2332703
        },
        INSIGHTS_REVISE: {
            COMMAND_NAME: 'INSIGHTS_REVISE',
            ACTION_NAME: 'MYEBAY_SELLING_INSIGHTS_REVISE_GET',
            SPA_URL: '/mys/ajx/insights/spa/revise',
            WINDOW_URL: '/mys/insights/revise',
            expPageId: 2486981
        },
        INSIGHTS_SIO: {
            COMMAND_NAME: 'INSIGHTS_SIO',
            ACTION_NAME: 'MYEBAY_SELLING_INSIGHTS_OFFERS_TO_BUYERS_GET',
            SPA_URL: '/mys/ajx/insights/spa/offers_to_buyers',
            WINDOW_URL: '/mys/insights/offers-to-buyers',
            expPageId: 2512347
        },
        INSIGHTS_MANAGE_RETURNS: {
            COMMAND_NAME: 'INSIGHTS_MANAGE_RETURNS',
            ACTION_NAME: 'MYEBAY_SELLING_INSIGHTS_MANAGE_RETURNS_GET',
            SPA_URL: '/mys/ajx/insights/spa/manage_returns',
            WINDOW_URL: '/mys/insights/manage-returns',
            expPageId: 2512347
        },
        INSIGHTS_MANAGE_OUTBACK_LOTS: {
            COMMAND_NAME: 'INSIGHTS_MANAGE_OUTBACK_LOTS',
            ACTION_NAME: 'MYEBAY_SELLING_INSIGHTS_OUTBACK_GENERATE_BULQ_GET',
            SPA_URL: '/mys/ajx/insights/spa/manage_outback_lots',
            WINDOW_URL: '/mys/insights/manage-outback-lots',
            expPageId: 2512347
        },
        SOCIAL_SHARE: {
            AJAX_URL: '/mys/ajx',
            MODULE_LOADER: 'container_share',
            CLICK_SHARE: 'click_share'
        },
        PREFERENCE_UPDATE: {
            AJAX_URL: '/mys/ajx',
            ACTION: 'update_preferences'
        },
        DEFAULT_AJAX_URL: '/mys/ajx'
    },
    HEADERS: {
        CUSTOM_HEADER: 'X-EBAY-C-MYS-HEADER',
        REDIRECT_URL_KEY: 'redirectURL'
    }
};
