

module.exports = {
    spliceMenuItem: function(obj) {
        if (obj && obj.selections && Array.isArray(obj.selections)) {
            const newSelections = obj.selections.slice(0);
            newSelections.shift();
            return newSelections;
        }
        return [];
    },
    notEmpty: function(obj) {
        return Array.isArray(obj) && obj.length !== 0;
    }
};
