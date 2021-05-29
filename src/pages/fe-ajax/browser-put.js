const safeGet = require('just-safe-get');
const serviceClient = require('service-client-ebay');
const logger = require('logging-inc').logger('mesellweb:debug');

module.exports = {
    doPut: (req, res, configModule) => {
        const reqStatus = {
            'msg': 'OK',
            'msgType': '200',
            'systemMsg': ''
        };
        let serviceType;
        let path = '/';

        if ((req.params.action).toLowerCase() === 'relist') {
            serviceType = 'MesellwebExpSvcRelist';
            if (req.params.actionValue) {
                path = `/${req.params.actionValue}`;
            }
        } else if ((req.params.action).toLowerCase() === 'revise_pbc') {
            serviceType = 'MesellwebExpSvcRevisePBC';
            if (req.params.actionValue) {
                path = `/${req.params.actionValue}`;
            }
        }

        serviceClient.context(req)
            .getClient(serviceType)
            .put({
                'body': JSON.stringify(req.body),
                'path': path
            })
            .end((err, result) => {
                // logger.debug("experiance srv response: " + JSON.stringify(result.body));
                try {
                    if ((err === null || err === undefined) && (result !== null || result !== undefined)) {
                        const jsonData = safeGet(result, 'body');
                        jsonData.modules = (jsonData.modules) ? jsonData.modules : {};
                        jsonData.modules.configModule = configModule;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(jsonData);
                    } else {
                        const viewModel = {};
                        viewModel.msg = 'oops! something went wrong';
                        viewModel.msgType = err.statusCode || err.code || 500;
                        viewModel.systemMsg = safeGet(err, 'message');
                        viewModel.fullMessage = err.stack;

                        logger.debug(`experiance srv response: ${viewModel}`);

                        reqStatus.msg = 'oops! something went wrong';
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

