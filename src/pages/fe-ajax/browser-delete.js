const safeGet = require('just-safe-get');
const queryUtils = require('./action-items');
const serviceClient = require('service-client-ebay');
const logger = require('logging-inc').logger('mesellweb:debug');

module.exports = {
    doDelete: (req, res) => {
        const configModule = {};
        const reqStatus = {
            'msg': 'OK',
            'msgType': '200',
            'systemMsg': ''
        };
        let serviceType;
        const path = '/';
        const actObj = queryUtils.getActionItems(req);

        if (actObj.action === 'delete_draft') {
            serviceType = 'MesellwebExpSvcDeleteDraft';
        }
        const json = `[${ req.body.MeSellOverviewDeleteDraft[0] }]`;

        // todo: Need to remove this and modulize.
        serviceClient.context(req)
            .getClient(serviceType)
            .request({
                'body': json,
                'path': path,
                'method': 'DELETE'
            })
            .end((err, result) => {
                // logger.debug("experiance srv response: " + JSON.stringify(result.body));

                try {
                    if ((err === null || err === undefined) && (result !== null || result !== undefined)) {
                        const jsonData = safeGet(result, 'body') || {};
                        jsonData.modules = (jsonData.modules) ? jsonData.modules : {};
                        jsonData.modules.configModule = configModule;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(jsonData);
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
