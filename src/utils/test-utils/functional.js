'use strict';

function triggerMouseEvent(el, type) {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(
        type,
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /* left */, null
    );
    el.dispatchEvent(event);
}

function triggerUIEvent(el, type) {
    const evt = document.createEvent('UIEvent');
    evt.initUIEvent(type, true, true, window);
    el.dispatchEvent(evt);
}

function triggerKeyboardEvent(el, type, val) {
    const event = document.createEvent('KeyboardEvent');
    el.value = val;
    event.initEvent(type, true, true, null);
    el.dispatchEvent(event);
}

function jsonOk(body) {
    const mockResponse = new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return mockResponse;
}

module.exports = {
    triggerMouseEvent,
    triggerUIEvent,
    triggerKeyboardEvent,
    jsonOk
};
