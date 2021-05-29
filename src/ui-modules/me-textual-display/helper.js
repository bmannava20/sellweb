'use strict';
function generateClasses(textSpan, prefix, defaultClass, styleMap, classAttr) {
    if (!textSpan) {
        return defaultClass;
    }

    const classes = [defaultClass, classAttr];

    const prefixForClass = prefix ? `${prefix}-` : ``;

    if (textSpan.styles) {
        textSpan.styles.forEach(style => {
            const formattedStyle = styleMap && styleMap[style];
            classes.push(prefixForClass + (style || formattedStyle).toLowerCase());
        });
    }

    // Remove all empty values ("", null, undefined and 0);
    return classes.filter(Boolean);
}

function getModelData(input) {
    const model = input.model;
    const options = input.options || {};

    const templateModel = {
        textSpans: model,
        prefixClass: options.prefixClass,
        defaultClass: options.defaultClass,
        styleMap: options.styleMap,
        disableEscaping: !!options.disableEscaping,
        classAttr: input.class,
        icon: input.icon
    };

    return templateModel;
}

module.exports = {
    getModelData,
    generateClasses
};
