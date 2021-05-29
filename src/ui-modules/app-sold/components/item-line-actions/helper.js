const safeGet = require('just-safe-get');

function isButtonOrLink(input) {
    const url = safeGet(input, 'model.options.0.action.URL');
    if (!url) {
        return url;
    }
    return url.indexOf('update_status') >= 0 ? '' : url;
}

function getModelData(input) {
    const inlineActions = safeGet(input, 'model.options');
    if (!Array.isArray(inlineActions) || inlineActions.length === 0) {
        return;
    }
    const actionType = safeGet(input, 'model.options.0.action.type');
    let targetFunc = safeGet(input, 'model.options.0.paramValue');
    targetFunc = (actionType === 'OPERATION') ? targetFunc : undefined;

    const data = {
        inlineActions,
        contractId: safeGet(input, 'model.options.0.action.params.contractIds'),
        targetFunc: targetFunc,
        accessibilityText: safeGet(input, 'model.action.accessibilityText'),
        actionName: safeGet(input, 'model.options.0.action.name'),
        secondaryBtnLabel: safeGet(input, 'model.options.0.label.textSpans'),
        secondaryBtnURL: isButtonOrLink(input),
        secondaryBtnTracking: safeGet(input, 'model.options.0.action.trackingList'),
        secondaryBtnSid: safeGet(input, 'model.options.0.action.trackingList.0.eventProperty.sid')
    };
    const title = safeGet(input, 'title.textSpans.0.text');
    if (title) {
        data.accessibilityText = `${data.accessibilityText} - ${title}`;
    }
    data.slicedInlineActions = data.inlineActions ? data.inlineActions.slice(1) : [];
    return data;
}

module.exports = {
    getModelData
};
