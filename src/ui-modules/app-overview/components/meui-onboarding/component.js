'use strict';

const labelIsDismissed = 'myebay-onboarding-dismissed';

module.exports = class {
    onCreate(input) {
        // Normally input.open should be false.
        // onMount is going to render this otherwise we will see content flashing if the flag on the localstorage is false
        this.state = { open: !!input.open, animate: false };
    }

    onMount() {
        const open = !localStorage.getItem(labelIsDismissed);
        this.state = { open };
        if (open) {
            setTimeout(() => {
                this.state.animate = true;
            });
        }
    }

    onDismiss() {
        localStorage.setItem(labelIsDismissed, true);
        this.state.open = false;
    }
};
