'use strict';

const safeGet = require('just-safe-get');

module.exports = {
    getData: function(input) {
        const model = input.model || {};
        const progressStatus = safeGet(model, 'orderProgressStatus') || [];
        const statusList = progressStatus.map(status => ({
            text: safeGet(status, 'statusText.textSpans.0.text'),
            selected: status.selected
        }));

        return {
            statusList,
            completed: 'Completed', // temperoy fix for US sites accessibility
            notCompleted: 'Not Completed' // temperoy fix for US sites accessibility
        };
    }
};
