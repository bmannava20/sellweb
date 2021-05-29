'use strict';

const Adaptor = module.exports.Adaptor = function Adaptor() {
    this.models = {};
};

const proto = Adaptor.prototype;

class DataHolder {
    constructor() {
        this.pending = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    resolve(data) {
        this.settled = true;
        this._resolve(data);
    }

    reject(err) {
        this.settled = true;
        this._reject(err);
    }

    isSettled() {
        return this.settled;
    }
}

proto.holder = function holder(id) {
    return this.models[id] ||
		(this.models[id] = new DataHolder());
};

proto.complete = function complete(err) {
    Object.keys(this.models).map(function(id) {
        const holder = this.models[id];
        if (!holder.isSettled()) {
            if (err) {
                holder.reject(err); // no model received
            } else {
                holder.resolve(); // no model received
            }
        }
        return holder;
    }, this);
};

proto.getHandler = function getHandler() {
    const self = this;
    /* eslint-disable */
    return this.handler = this.handler || function handler(err, response) {
        const chunk = response && response.body;
        if (err || chunk === undefined) {
            return self.complete(err);
        }

        const holder = self.holder(chunk.name);
        holder.resolve(chunk);
    };
};

proto.get = function get(id) {
    return this.holder(id).pending;
};

proto.on = function on(id, callback) {
    this.get(id)(callback);
};
