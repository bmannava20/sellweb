'use strict';

module.exports = class {
    emitSoldPageUpdate(data) {
        this.emit('soldPageUpdate', data);
    }
    emitShowLoader() {
        this.emit('show-loader');
    }
};
