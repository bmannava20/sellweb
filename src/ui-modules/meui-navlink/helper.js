'use strict';
const safeGet = require('just-safe-get');
const trackingUtils = require('../../utils/tracking-utils/tracking-utils');

function getData(input) {
    const data = input;
    const action = safeGet(data, 'action');
    if (!action) {
        return;
    }

    const model = {};
    const htmlAttributes = {
        style: data.style,
        title: data.title,
        tabindex: data.tabindex,
        target: data.target === 'newWindow' || data.target === '_blank' ? '_blank' : '',
        'aria-label': data.ariaLabel,
        'aria-hidden': data.ariaHidden
    };

    // Sold svc for e.g. will start sending name='newTab' so that would override any target if passed.
    const newTab = safeGet(action, 'name');
    if (newTab && newTab.toLowerCase() === 'newtab') {
        htmlAttributes.target = '_blank';
    }

    model.class = data.class;
    model.ariaLabel = data.ariaLabel;
    model.renderBody = data.renderBody;
    if (data.ajaxUrl) {
        model.url = data.ajaxUrl + safeGet(action, 'URL');
    } else {
        model.url = safeGet(action, 'URL');
    }

    const trackingData = trackingUtils.getTrackingFromListOrObj(action, 'NAV');
    if (trackingData) {
        htmlAttributes._sp = safeGet(trackingData, 'eventProperty.sid');
    }

    model.htmlAttributes = htmlAttributes;

    return model;
}

module.exports = {
    getData: getData
};
