module.exports = function(el, context) {
    const builder = context.builder;
    const parts = el.argument.split(/\s+in\s+/);
    el.setAttributeValue('_var', builder.literal(parts[0]));
    el.setAttributeValue('items', builder.parseExpression(parts[1]));
    el.argument = null;
};
