const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');
const safeGet = require('just-safe-get');
const keyboardTrap = require('makeup-keyboard-trap');
const screenReaderTrap = require('makeup-screenreader-trap');

module.exports = class {
    onCreate() {
        this.state = {
            showSortMenu: false
        };
    }
    onUpdate() {
        const sortPanel = document.querySelector('.me-sort-side-menu');
        if (this.state.showSortMenu && sortPanel) {
            screenReaderTrap.trap(sortPanel);
            keyboardTrap.trap(sortPanel);
            sortPanel.setAttribute('aria-hidden', false);
            sortPanel.querySelector('.me-sort-side-menu__header__secondary-btn').focus();
        } else {
            screenReaderTrap.untrap(sortPanel);
            keyboardTrap.untrap(sortPanel);
            sortPanel && sortPanel.setAttribute('aria-hidden', true);
            const sortLabel = document.querySelector('.me-sort__label');
            sortLabel.setAttribute('aria-hidden', false);
            sortLabel.focus();
        }
    }
    toggleSortMenu() {
        const showSortMenu = !this.state.showSortMenu;
        this.setState('showSortMenu', showSortMenu);
    }

    onHandleSortClick(sortOptions, selectedOption) {
        const actionParams = selectedOption.el.getAttribute('data-action-params');
        const action = selectedOption.el.getAttribute('data-action');

        const trackingList = safeGet(sortOptions, `${selectedOption.index}.action.trackingList`);
        trackingHelper.emitPulsarTracking(trackingList, true);

        this.emit('handleSortRequest', {
            actionParams: actionParams,
            action: action
        });
    }
    onHandleMobileSortClick(sortOptions, selectedIndex, { originalEvent }) {
        const actionParams = originalEvent.target.getAttribute('data-action-params');
        const action = originalEvent.target.getAttribute('data-action');

        const trackingList = safeGet(sortOptions, `${selectedIndex}.action.trackingList`)
            || safeGet(sortOptions, `${selectedIndex}.label.action.trackingList`);
        trackingHelper.emitPulsarTracking(trackingList, true);

        // Closing the side menu
        this.state.showSortMenu = false;

        this.emit('handleSortRequest', {
            actionParams: actionParams,
            action: action
        });
    }
};
