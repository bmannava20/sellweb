'use strict';

const exitEmitter = require('makeup-exit-emitter');

const handleEscapeKeyFn = function(evt) {
    evt.stopPropagation();
    if (evt.keyCode === 27) { // Escape key
        this.closeDropdownMenu();
        this.refocusOnExpandButton();
    }
};

module.exports = class {
    onMount() {
        const secondaryNav = this.getEl('secondaryNav');
        if (secondaryNav) {
            exitEmitter.addFocusExit(secondaryNav);

            secondaryNav.addEventListener('focusExit', () => {
                this.closeDropdownMenu();
            });
        }
    }

    openDropdownMenu() {
        this._getSecondaryNav().setAttribute('aria-hidden', 'false');
        this._getButton().setAttribute('aria-expanded', 'true');
        this._getSecondaryNav().addEventListener('keydown', handleEscapeKeyFn.bind(this), true);
    }

    closeDropdownMenu() {
        this._getSecondaryNav().setAttribute('aria-hidden', 'true');
        this._getButton().setAttribute('aria-expanded', 'false');
        this._getSecondaryNav().removeEventListener('keydown', handleEscapeKeyFn.bind(this), true);
    }

    refocusOnExpandButton() {
        this.unclipButton();
        this._getButton().focus();
    }

    onButtonClick() {
        this.openDropdownMenu();
        this.clipButton();
        // this 250ms is of transition-delay property.
        setTimeout(() => {
            const secondaryNav = this._getSecondaryNav();
            if (secondaryNav) {
                secondaryNav.querySelector('a').focus();
            }
        }, 250);
    }

    unclipButton() {
        this._getButton().classList.remove('clipped');
    }

    clipButton() {
        this._getButton().classList.add('clipped');
    }

    _getButton() {
        return this.getEl('expandButton');
    }

    _getSecondaryNav() {
        return this.getEl('secondaryNav');
    }
};
