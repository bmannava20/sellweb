'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const options = safeGet(input, 'options');
    const accessibilityText = safeGet(input, 'accessibilityText');
    const btnPriority = safeGet(input, 'priority') === 'PROMOTED' ? 'primary' : '';
    const menuItems = options.map(option => {
        const menuItem = {};
        const actionType = safeGet(option, 'action.type') || safeGet(option, 'label.action.type');
        const type = actionType === 'OPERATION' ? 'button' : '';
        menuItem.url = safeGet(option, 'action.URL') || safeGet(option, 'label.action.URL');
        menuItem.actionType = actionType;
        menuItem.type = type;
        menuItem.label = safeGet(option, 'label.textSpans');
        menuItem.actionName = safeGet(option, 'label.action.name') || safeGet(option, 'action.name');
        const targetFunc = safeGet(option, 'paramValue') || safeGet(option, 'label.value');
        menuItem.targetFunc = (type === 'button') ? targetFunc : '';
        menuItem.contractId = safeGet(option, 'label.action.params.contractIds') || safeGet(option, 'action.params.contractIds');
        menuItem.sid = safeGet(option, 'label.action.trackingList.0.eventProperty.sid') || safeGet(option, 'action.trackingList.0.eventProperty.sid');
        return menuItem;
    });

    return {
        accessibilityText,
        btnPriority,
        menuItems
    };
}

module.exports = {
    getModelData
};
