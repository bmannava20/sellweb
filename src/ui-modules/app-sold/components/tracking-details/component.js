'use strict';

module.exports = class {
    onMount() {
        window.addEventListener('message', this.respondToTrackingOverlayResizeMessage, false);
    }
    onDestroy() {
        window.removeEventListener('message', this.respondToTrackingOverlayResizeMessage, false);
    }
    onCreate() {
        this.state = {
            url: '',
            closeBtnTxt: '',
            open: false
        };
    }
    show(url, closeBtnTxt) {
        this.setState('url', url);
        this.setState('open', true);
        this.setState('closeBtnTxt', closeBtnTxt);

        this.getComponent('tracking-details').show();
    }

    closeModal() {
        this.setState('open', false);
    }
    respondToTrackingOverlayResizeMessage(e) {
        const fields = e.data && typeof e.data === 'string' && e.data.indexOf('SellerTrackingOverlayResize') > -1 && e.data.split(':');
        if (fields && fields[0] === 'SellerTrackingOverlayResize') {
            const vals = fields[1].split('|');
            document.querySelector('.tracking-details__iframe').setAttribute('style', `height: ${vals[1]}`);
        }
    }
};
