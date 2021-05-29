const safeGet = require('just-safe-get');
const jsonStringifyPlus = require('json-stringify-plus');
const serviceClient = require('service-client-ebay');
const logger = require('logging-inc').logger('mesellweb:debug');
const queryUtils = require('./action-items');

module.exports = {
    doPost: (req, res, configModule) => {
        const reqStatus = {
            'msg': 'OK',
            'msgType': '200',
            'systemMsg': ''
        };
        let serviceType;
        let path = '/';
        let parms = {};
        const actObj = queryUtils.getActionItems(req);

        if (actObj.action === 'usernote') {
            serviceType = 'LASServiceUserNote';
        } else if (actObj.action === 'delete') {
            serviceType = 'MesellwebExpSvcDelete';
        } else if (actObj.action === 'relist') {
            serviceType = 'MesellwebExpSvcRelist';
            if (actObj.actionValue === 'publish') {
                path = `/${actObj.actionValue}/${safeGet(req, 'body.draftId')}`;
            } else if (actObj.actionValue) {
                path = `/${actObj.actionValue}`;
            }
        } else if (actObj.action === 'update_preferences') {
            serviceType = 'MesellwebExpSvcUpdatePreferences';
        } else if (actObj.action === 'markAsPaid') {
            serviceType = 'MesellwebExpSvcMarkAsPaid';
            parms = {
                'actionType': 'markAsPaid'
            };
        } else if (actObj.action === 'drafts' && actObj.actionValue === 'deleteAndRefetch') {
            serviceType = 'DraftExpSvcDelete';
        } else if (actObj.action === 'click_share') {
            serviceType = 'SocialShareClickProvider';
        }

        // todo: Need to remove this and modulize.
        /*
            The MeSellWelcomeScreenPreference and MeSellOverviewVisitedPreference preferences are for the welcome screen being read
            MeSellOverviewVisitedPreference is for the overview screen and MeSellWelcomeScreenPreference is for the unsold screen.
        */
        if (safeGet(req, 'body.MeSellLeftNavPreference')) {
            req.body.MeSellLeftNavPreference = jsonStringifyPlus(req.body.MeSellLeftNavPreference, {
                single: true
            });
        } else if (safeGet(req, 'body.MeSellLandingPageIdPreference')) {
            req.body.MeSellLandingPageIdPreference = jsonStringifyPlus(req.body.MeSellLandingPageIdPreference, {
                single: true
            });
        } else if (safeGet(req, 'body.MeSellWelcomeScreenPreference')) {
            req.body.MeSellWelcomeScreenPreference = jsonStringifyPlus(req.body.MeSellWelcomeScreenPreference, {
                single: false
            });
        } else if (safeGet(req, 'body.MeSellOverviewVisitedPreference')) {
            req.body.MeSellOverviewVisitedPreference = jsonStringifyPlus(req.body.MeSellOverviewVisitedPreference, {
                single: false
            });
        } else if (safeGet(req, 'body.MeSellOverviewDeleteDraft')) {
            req.body.MeSellOverviewDeleteDraft = jsonStringifyPlus(req.body.MeSellOverviewDeleteDraft, {
                single: false
            });
        } else if (safeGet(req, 'body.MeSellOverviewMarkAsPaid')) {
            req.body = jsonStringifyPlus(req.body, {
                single: true
            });
        }

        serviceClient.context(req)
            .getClient(serviceType)
            .post({
                'body': JSON.stringify(req.body),
                'path': path,
                'qs': parms
            })
            .end((err, result) => {
                // logger.debug("experiance srv response: " + JSON.stringify(result.body));
                res.setHeader('Content-Type', 'application/json');
                try {
                    if ((err === null || err === undefined) && (result !== null || result !== undefined)) {
                        const jsonData = safeGet(result, 'body') || {};
                        jsonData.modules = (jsonData.modules) ? jsonData.modules : {};
                        jsonData.modules.configModule = configModule;

                        if (result.statusCode === 204 && jsonData && !(Array.isArray(jsonData))) {
                            reqStatus.msgType = result.statusCode;
                            res.json(reqStatus);
                        } else {
                            res.json(jsonData);
                        }
                    } else {
                        const viewModel = {};
                        viewModel.msg = 'ops! something went wrong';
                        viewModel.msgType = err.statusCode || err.code || 500;
                        viewModel.systemMsg = safeGet(err, 'message');
                        viewModel.fullMessage = err.stack;

                        logger.debug(`experiance srv response: ${viewModel}`);

                        reqStatus.msg = 'ops! something went wrong';
                        reqStatus.msgType = '500';
                        reqStatus.systemMsg = safeGet(err, 'message');
                        res.json(reqStatus);
                    }
                } finally {
                    res.end();
                }
            });
    }
};
