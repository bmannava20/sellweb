'use strict';

function getAllItems(items, itemIdKey) {
    const collection = [];
    for (const item of items) {
        collection.push(item[itemIdKey]);
    }

    return collection;
}

function enableDeleteButton(widget) {
    widget.setState('enableDeleteButton', widget.state.selectedIdList.length > 0);
}

function handleMultiSelectClick(e, widget, items, itemIdKey, existingCollection) {
    const { checked } = e.originalEvent.target;
    let collection = [];

    if (checked) {
        collection = existingCollection || getAllItems(items, itemIdKey);
    }

    widget.setState({
        selectedIdList: collection,
        enableMultiSelect: checked
    });
    enableDeleteButton(widget);
}


function handleSingleCheckboxClick(e, widget, items, itemIdKey, existingCollection) {
    const { value, checked } = e.originalEvent.target; // e.target;

    if (checked) {
        const collection = existingCollection || getAllItems(items, itemIdKey);
        widget.setState({
            selectedIdList: [...widget.state.selectedIdList, value],
            enableMultiSelect: collection.length === widget.state.selectedIdList.length + 1
        });
    } else {
        widget.setState({
            selectedIdList: widget.state.selectedIdList.filter(item => item !== value),
            enableMultiSelect: false
        });
    }
    enableDeleteButton(widget);
}

module.exports = {
    getAllItems,
    handleSingleCheckboxClick,
    handleMultiSelectClick
};
