const appShellSpinnerId = 'app-shell-spinner';
const appShellSpinnerChannel = require('../pubsub').channel(appShellSpinnerId);

let timerId;

appShellSpinnerChannel.on('hide', () => {
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
    }
});


// This let you use the app-shell loading spinner
module.exports = {
    appShellSpinnerId,

    // After the timeout, it automatically hides the spinner. Use 0 for no timeout
    show(timeout = 10000) {
        appShellSpinnerChannel.emit('show');
        if (timeout) {
            timerId = setTimeout(() => {
                this.hide();
            }, timeout);
        }
    },

    hide() {
        appShellSpinnerChannel.emit('hide');
    }
};
