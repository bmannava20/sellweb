const safeGet = require('just-safe-get');
const trackingUtils = require('../../utils/tracking-utils/tracking-utils');

function getModelData(input) {
    const data = {};
    const action = safeGet(input, 'model.action') || safeGet(input, 'action');
    const actionType = safeGet(action, 'type');
    const trackingList = safeGet(action, 'trackingList');
    let url = safeGet(action, 'URL');
    if (url === 'javascript' || actionType === 'OPERATION') {
        url = '';
    }
    data.dataUrl = safeGet(action, 'URL');
    data.size = safeGet(input, 'size');
    data.transparent = safeGet(input, 'transparent') || safeGet(input, 'model.transparent');
    data.disabled = safeGet(input, 'disabled') || safeGet(input, 'model.disabled');
    data.actionName = safeGet(action, 'name') || safeGet(input, 'model.value');
    data.btnPriority = safeGet(input, 'model.textSpans.0.styles.0') || safeGet(input, 'priority');
    data.url = url;
    data.clippedText = safeGet(input, 'clippedText');
    data.btnLabel = safeGet(input, 'model.textSpans.0.text') || safeGet(input, 'model.text');
    data.btnStyle = (data.btnPriority === 'PROMOTED') ? 'primary' : data.btnPriority;
    data.target = (data.target === 'newWindow' || data.target === '_blank') ? '_blank' : '';
    data.accessibilityText = safeGet(input, 'model.textSpans.0.accessibilityText');
    if (trackingList) {
        // Backwards compatibility for NAV tracking without trackingList or without NAVSRC or CLICK
        const trackingData = trackingUtils.getTrackingFromListOrObj(action, 'NAV') || trackingUtils.getTrackingFromListOrObj(action, 'CLICK');
        if (trackingData) {
            data._sp = safeGet(trackingData, 'eventProperty.sid');
        }
    }
    return data;
}
module.exports = {
    getModelData
};
