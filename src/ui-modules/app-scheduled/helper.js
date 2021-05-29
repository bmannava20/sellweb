'use strict';

function createErrorModel(value) {
    const errorModel = {
        'message': {
            'textSpans': [
                {
                    'text': value
                }
            ]
        }
    };
    return errorModel;
}

module.exports = {
    createErrorModel
};
