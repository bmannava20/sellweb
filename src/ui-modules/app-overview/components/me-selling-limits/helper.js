'use strict';
const safeGet = require('just-safe-get');

function getData(input) {
    const title = safeGet(input, 'model.title');
    const limitDescription = safeGet(input, 'model.limitDescription.textSpans');
    const lineSeparator = safeGet(input, 'model.separator');
    const sellingLimitError = safeGet(input, 'model.sellingLimitError.textSpans');

    const limitMessage = safeGet(input, 'model.limitMessage.title.textSpans');
    const limitMessageType = safeGet(input, 'model.limitMessage.messageType') === 'ERROR' ? 'priority' : 'information';
    const limitStatusEnum = safeGet(input, 'model.limitStatusEnum');

    const quantityAvailable = safeGet(input, 'model.quantityMetric.availableValue');
    const quantityTotal = safeGet(input, 'model.quantityMetric.totalValue');
    const quantityText = safeGet(input, 'model.quantityMetric.infoText.label.textSpans');
    const quantityUsed = safeGet(input, 'model.quantityUsed.textSpans');
    const showQuantity = !!(quantityTotal && quantityAvailable >= 0);

    const gmvAvailable = safeGet(input, 'model.gmvMetric.availableValue');
    const gmvText = safeGet(input, 'model.gmvMetric.infoText.label.textSpans');
    const gmvTotal = safeGet(input, 'model.gmvMetric.totalValue');
    const gmvUsed = safeGet(input, 'model.gmvUsed.textSpans');
    const showGMV = !!(gmvAvailable >= 0 && gmvTotal);

    let colorIndicator = '#71c63e';

    switch (limitStatusEnum) {
        case 'BELOW_THRESHOLD_LIMIT':
            colorIndicator = '#71c63e';
            break;
        case 'APPROACHING_LIMIT':
            colorIndicator = '#ff5151';
            break;
        case 'EXCEEDING_LIMIT':
            colorIndicator = '#c7c7c7';
            break;
        default: colorIndicator = '#71c63e';
    }

    return {
        title,
        limitDescription,
        lineSeparator,
        sellingLimitError,
        limitMessage,
        limitMessageType,
        colorIndicator,
        quantityAvailable,
        quantityTotal,
        quantityUsed,
        quantityText,
        showQuantity,
        gmvAvailable,
        gmvTotal,
        gmvText,
        gmvUsed,
        showGMV
    };
}

module.exports = {
    getData
};
