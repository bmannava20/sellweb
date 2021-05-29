'use strict';

module.exports = class {
    onCreate(input) {
        this.state = {
            model: input.model.data
        };
    }

    onEmptyStatus(e) {
        const self = this;
        self.getComponent('emptyStatus').onEmptyStatus(e);
    }
    onAppUpdate(e) {
        const self = this;
        self.getComponent('meuiAppShell').onAppUpdate(e);
    }
    onUpdateShipModule(e) {
        const self = this;
        self.getComponent('shipIt').onShipItUpdate(e);
    }
    openProgressIndicator(e) {
        this.getComponent('progressPopup').show(e);
    }
    refreshOutbackModule() {
        this.getComponent('generateDrafts').refreshOutbackModule();
    }
};
