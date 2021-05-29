/**
 * Fire custom event on the element
 * @param {Object} selector
 * @param {String} eventName
 * @param {Object} eventArg
 */
function emitAndFire(selector, eventName, eventArg) {
    let event;
    if (window.CustomEvent) {
        event = new CustomEvent(eventName, { detail: eventArg });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, eventArg);
    }
    selector.dispatchEvent(event);
}

module.exports = emitAndFire;
