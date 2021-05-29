'use strict';

const safeGet = require('just-safe-get');
const redirect = require('../../../../utils/redirect');
const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;
const constants = require('../../../../utils/helpers/constants');

const getModelData = function(input) {
    let data;
    if (safeGet(input, 'model.modules.leftNavModule')) {
        data = input.model;
        const menus = safeGet(data, 'modules.leftNavModule.menus');
        data.modules.preferenceModule = {};
        data.modules.preferenceModule.MeSellLeftNavPreference = {};

        if (menus) {
            menus.forEach(menu => {
                if (menu.preferenceKey) {
                    data.modules.preferenceModule.MeSellLeftNavPreference[menu.preferenceKey] = menu.expanded ? 'open' : 'close';
                }
            });
        }
    }
    return data;
};

module.exports = class {
    onCreate(input) {
        const model = getModelData(input);

        this.state = {
            'preferenceModule': safeGet(model, 'modules.preferenceModule') || {}
        };
    }
    prefSelectorEventHandler(e) {
        const target = e.target;
        const isClickEvent = (e.type === 'mousedown' && e.which === 1);
        const isKeyDownEvent = (e.type === 'keydown' && ((e.which === 13 || e.which === 32) ||
         (e.which === 39 && target.getAttribute('aria-expanded') === 'false') ||
          (e.which === 37 && target.getAttribute('aria-expanded') === 'true')));

        if (isKeyDownEvent || isClickEvent) {
            this.prepareCallHandler(e);
        }
    }
    prepareCallHandler(e) {
        const header = e.target;
        const panel = e.target.nextElementSibling;
        const changedPref = header.getAttribute('data-prefname');
        if (header.getAttribute('aria-expanded') === 'false' && this.state.preferenceModule) {
            this.state.preferenceModule.MeSellLeftNavPreference[changedPref] = 'open';
            header.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
            panel.style.display = 'block';
        } else if (header.getAttribute('aria-expanded') === 'true' && this.state.preferenceModule) {
            this.state.preferenceModule.MeSellLeftNavPreference[changedPref] = 'close';
            header.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
            panel.style.display = 'none';
        }
        const dataObj = this.state.preferenceModule;
        fetch(`${constants.SPA_COMMAND.PREFERENCE_UPDATE.AJAX_URL}/${constants.SPA_COMMAND.PREFERENCE_UPDATE.ACTION}`, dataObj, 'POST')
            .then(response => redirect(response));
    }
    navigate(e) {
        e.preventDefault();
        const type = e.target.getAttribute('data-action-type') || '';
        const url = e.target.href || '';
        if (type === 'NAV') {
            window.location.href = url;
        } else {
            const name = e.target.getAttribute('data-action-name') || '';
            this.emit('appUpdate', {
                'url': url,
                'type': type,
                'name': name
            });
        }
    }
};
