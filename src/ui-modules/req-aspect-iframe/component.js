'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    onMount() {
        window.addEventListener('message', this.processEvent.bind(this), false);
    }
    processEvent(event) {
        const reqAspectsSpinner = this.getComponent('req-aspects-spinner');
        if (event.data && typeof (event.data) !== 'string') {
            switch (event.data.event) {
                case 'FRAME_READY':
                    if (reqAspectsSpinner && reqAspectsSpinner.el) {
                        reqAspectsSpinner.el.classList.remove('show');
                    }
                    break;
                case 'RESIZE': this.changeFrameHeight(event);
                    break;
                case 'SAVE': this.handleSuccess(event);
                    break;
                case 'ERROR': this.handleError();
                    break;
                case 'CANCEL': this.modalClose();
                    break;
                case 'LOAD': break;
                default: this.modalClose();
            }
        }
    }
    onDestroy() {
        window.removeEventListener('message', this.processEvent, false);
    }
    onCreate(input) {
        this.state = {
            url: '',
            showError: false,
            open: false,
            errorMessage: safeGet(input, 'model.errorMessage'),
            successMessage: safeGet(input, 'model.successMessage')
        };
    }
    handleSuccess(event) {
        const data = {
            event: event,
            successMessage: this.state.successMessage
        };
        this.modalClose();
        this.emit('req-aspects-save', data);
    }
    handleError() {
        if (this.state.errorMessage) {
            this.setState('showError', true);
        } else {
            this.setState('open', false);
        }
    }
    modalClose() {
        this.setState('url', '');
        this.setState('showError', false);
        this.setState('open', false);
    }
    show({ dataUrl }) {
        this.setState('open', true);
        this.getComponent('modal-iframe').show();
        this.setState('url', dataUrl);
        this.once('update', () => {
            if (dataUrl) {
                const screen = this.getComponent('modal-iframe').el;
                const overlayTop = this.getComponent('modal-iframe').el.querySelector('.modal-iframe__body').getBoundingClientRect().top;
                const frame = this.getEl('req-aspects-iframe');
                const frameTop = frame.getBoundingClientRect().top;
                const maxFrameHeight = (screen.clientHeight * 0.7) - (frameTop - overlayTop);

                frame.src = `${dataUrl}&maxHeight=${maxFrameHeight}`;
                frame.style.height = `${maxFrameHeight}px`;
            }
        });
        setTimeout(() => {
            this.getComponent('req-aspects-spinner').showSpinner();
        }, 10);
    }
    changeFrameHeight(data) {
        const frame = this.getEl('req-aspects-iframe');
        if (frame) {
            frame.style.height = `${data.data.height}px`;
        }
    }
};

