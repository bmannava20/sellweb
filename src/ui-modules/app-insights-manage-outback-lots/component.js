module.exports = class {
    openProgressIndicator(e) {
        this.getComponent('progressPopup').show(e);
    }
    refreshOutbackModule() {
        this.getComponent('generateDrafts').refreshOutbackModule();
    }
};
