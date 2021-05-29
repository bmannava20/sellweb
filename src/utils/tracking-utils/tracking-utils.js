'use strict';

const safeGet = require('just-safe-get');

/**
 * getTrackingInfoByKinds - this extracts data based on actionKinds
 * @param  {Object[]} list of dom objects
 * @param  {string}  actionKinds
 * @return {Object}  object matches actionKinds
 */
function getTrackingInfoByKind(trackingElements, actionKind) {
    let trkObject;
    if (trackingElements && Array.isArray(trackingElements)) {
        trackingElements.every((value) => {
            const actionKinds = value.actionKinds || [];
            if (actionKind === '' || actionKinds.indexOf(actionKind) !== -1 || value.actionKind === actionKind) {
                trkObject = value;
                if (actionKind !== '') {
                    trkObject.actionKind = actionKind;
                }
                return false;
            }
            return true;
        });
    }
    return trkObject;
}

/**
 * getTrackingFromListOrObj - this tries to extract data from a trackingList
 * object first then tries from tracking object
 * @param   {Object} action object
 * @param   {string} actionKind
 * @param   {Object} default object
 * @return  {Object} object matches action type
 */
function getTrackingFromListOrObj(action, actionKind) {
    let trackingData;
    const trackingList = safeGet(action, 'trackingList');
    if (Array.isArray(trackingList)) {
        trackingData = getTrackingInfoByKind(trackingList, actionKind);
    } else {
        trackingData = safeGet(action, 'trackingList');
    }
    return trackingData;
}

module.exports = {
    getTrackingFromListOrObj: getTrackingFromListOrObj,
    getTrackingInfoByKind: getTrackingInfoByKind
};
