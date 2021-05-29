'use strict';

const safeGet = require('just-safe-get');
const constants = require('../../utils/helpers/constants');
const tempHelper = require('../../utils/helpers/template-helper');

function getModelData(input) {
    const inputModel = input.model || {};
    let model = {};
    const selections = safeGet(inputModel, '__me.lineActions.options.0.selections');
    const inputLineAction = safeGet(inputModel, '__me.lineActions.options.0');
    // line action can have have empty selections
    // e.g. leave feedback module, when feedback is left for an item in multi order
    // this if check will prevent the empty button
    if (selections && selections.length > 0) {
        const lineActionsSelections = {};
        lineActionsSelections.selections = [];
        model = {
            shippingTips: input.shippingTips,
            lineActionsSelections: lineActionsSelections,
            labelContext: safeGet(inputModel, 'itemTitle.0.text'),
            styleMap: constants.STYLE_MAPS.NO_DEFAULT,
            accessibilityText: `${safeGet(inputModel, '__me.lineActions.options.0.label.textSpans.0.text')} - ${safeGet(input, 'a11yIndicator')}`
        };

        model.btnSelect = safeGet(selections, '0.label');
        model.primaryButton = safeGet(selections, '0.label.textSpans.0.text');
        model.primaryAction = safeGet(selections, '0.label.action');
        // TO DO: Remove the OR when the backend decides the action value place in the response
        model.primaryActionName = safeGet(selections, '0.label.action.name') || safeGet(selections, '0.label.value');
        model.menuType = safeGet(selections, '0.label.textSpans.0.styles.0') || safeGet(inputLineAction, 'label.textSpans.0.styles.0');
        if (model.primaryActionName === 'tipsForShipping') {
            model.class = 'get-shipping-tips';
        }
        if (inputLineAction) {
            model.lineActionsSelections.selections = tempHelper.spliceMenuItem(inputLineAction);
        }
    }

    return model;
}

module.exports = {
    getModelData: getModelData
};
