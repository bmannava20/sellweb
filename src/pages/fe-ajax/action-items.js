const safeGet = require('just-safe-get');

module.exports = {
    getActionItems: function(req) {
        const action = safeGet(req, 'params.action') ? safeGet(req, 'params.action') : '';
        const actionType = safeGet(req, 'params.actionType') ? safeGet(req, 'params.actionType').toLowerCase() : '';
        const actionValue = safeGet(req, 'params.actionValue') ? safeGet(req, 'params.actionValue') : '';
        return {
            action,
            actionType,
            actionValue
        };
    }
};
