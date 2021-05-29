/* globals browser $$ */
'use strict';

// base component class
class BaseComponent {
    constructor(selector) {
        this.selector = selector;
    }

    get element() {
        return $(this.selector);
    }

    // called to wait until an element on the page is cleared off all spinners
    waitTillReady() {
        browser.waitUntil(() => {
            const className = browser.getAttribute(this.selector, 'class');
            return (className.indexOf('widget--busy') === -1);
        });
    }

    // called to wait untill a spinner is added to the element
    waitTillBusy() {
        browser.waitUntil(() => {
            const className = browser.getAttribute(this.selector, 'class');
            return (className.indexOf('widget--busy') !== -1);
        });
    }
    // checks if element is visible on DOM
    // returns true element element not hidden on DOM
    get visible() {
        return browser.isVisible(this.selector);
    }
    // checks if element is present on DOM
    // returns true element element is mounted on DOM
    get exists() {
        return browser.isExisting(this.selector);
    }

    // performs click action on the element
    click() {
        if (browser.isVisible(this.selector)) {
            browser.click(this.selector);
        } else {
            console.error(`${this.selector}, element not visible to click`);
        }
    }

    autoPopulate() {
        browser.setValue(this.selector, 'default auto fill value');
    }
    // checks if element is enabled or disabled
    // returns true if not disabled
    get enabled() {
        return browser.isEnabled(this.selector);
    }
    // checks if element is empty
    // returns true element has no content
    get isEmpty() {
        return (browser.getHTML(this.selector, false) === '');
    }

    blur() {
        if (browser.isVisible(this.blurOutElem)) {
            browser.click(this.blurOutElem);
        }
    }

    getNumber() {
        const text = browser.getText(this.selector);
        return text.replace(/[^0-9.,]/g, '');
    }
}

module.exports = BaseComponent;
