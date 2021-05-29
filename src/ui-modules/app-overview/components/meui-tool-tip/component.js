'use strict';
// THIS IS A TEMPORARY COMPONENT, TO BE REMOVED FROM BUYER-DETAILS FOR ME-EXPANDER

module.exports = class {
    onMount() {
        this.dialogOpen = this.getEl('dialogOpenIcon');
        this.dialogContainer = this.getEl('me-tooltip-0');
    }
    /* Makes the div visible, calculates the offset of div relative to position,
     *  places focus on the heading inside the div and binds an onBlur event
     *  which is called when user tabs out of the button
     */
    handleOpen() {
        this.dialogContainer.setAttribute('aria-hidden', false);
        this.getEl('meui-tooltip').classList.add('me-tooltip--expanded');
        this.dialogOpen.addEventListener('blur', this.handleClose);
    }
    handleClose() {
        this.dialogContainer.setAttribute('aria-hidden', true);
        this.getEl('meui-tooltip').classList.remove('me-tooltip--expanded');
        this.dialogOpen.removeEventListener('blur', this.handleClose);
        this.dialogOpen.focus();
    }
    handleClick(event) {
        const isAriaHidden = this.dialogContainer.getAttribute('aria-hidden') === 'true';
        if (event.keyCode === 27) {
            this.handleClose();
        }
        if (event.keyCode === 32 || event.keyCode === 13) {
            if (isAriaHidden) {
                this.handleOpen();
            } else {
                this.handleClose();
            }
        }
    }
};
