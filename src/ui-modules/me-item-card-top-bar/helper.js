const safeGet = require('just-safe-get');

function getModelData(model) {
    const data = {};
    data.btnPriority = 'primary';
    data.message = safeGet(model, 'message.textSpans');
    data.secondaryMessage = safeGet(model, 'secondaryMessage.textSpans');
    data.primaryAction = {
        url: (safeGet(model, 'callToAction.action.type') !== 'OPERATION') ? safeGet(model, 'callToAction.action.URL') : '',
        dataUrl: safeGet(model, 'callToAction.action.URL'),
        tracking: safeGet(model, 'callToAction.action.trackingList'),
        sid: safeGet(model, 'callToAction.action.trackingList.0.eventProperty.sid'),
        label: safeGet(model, 'callToAction.text'),
        paramValue: safeGet(model, 'callToAction.action.name'),
        action: safeGet(model, 'callToAction.action')
    };

    data.style = safeGet(model, 'callToAction.type') === 'PRIMARY' ? 'primary' : '';
    data.bgColor = safeGet(model, 'message.textSpans.0.styles.0') === 'HIGHLIGHT' ? 'highlight' : '';

    data.secondaryAction = {
        label: safeGet(model, 'secondaryCallToAction.text'),
        action: safeGet(model, 'secondaryCallToAction.action')
    };
    return data;
}
module.exports = {
    getModelData
};
