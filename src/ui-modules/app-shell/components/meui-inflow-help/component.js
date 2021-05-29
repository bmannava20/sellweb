'use strict';

const safeGet = require('just-safe-get');

module.exports = class {
    onMount() {
        const self = this;
        const baseUrl = safeGet(self, 'input.model.inflowHelp.url');
        const showInflowHelp = safeGet(self, 'input.model.inflowHelp.showInflowHelp');
        const surveryTitle = safeGet(self, 'input.model.inflowHelp.surveyTitle.text');
        const pageId = safeGet(self, 'input.model.inflowHelp.pageId');

        if (!baseUrl) {
            return; // We don't want to construct the url or try to get the script if base url is not there.
        }
        const infinputparameters = {
            pageId: pageId,
            surveyTitle: surveryTitle
        };
        const url = `${baseUrl}/ocsrsapp/o2/inflow/inflowcomponent?input=${encodeURIComponent(JSON.stringify(infinputparameters))}&callback=Inflow.cb`;
        if (showInflowHelp) {
            this.getScript(document, 'script', url);
        }
    }
    getScript(document, tag, url) {
        const scriptTag = document.createElement(tag);
        const firstScriptTag = document.getElementsByTagName(tag)[0];
        scriptTag.src = url;
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    }
    onDestroy() {
        const infcontainer = document.getElementById('infcontainer');
        infcontainer && infcontainer.remove && infcontainer.remove();
    }
};
