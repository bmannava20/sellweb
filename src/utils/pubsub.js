const EventEmitter = require('events-light');

// Like raptor-pubsub but uses events-light that marko is already using.

const globalChannel = new EventEmitter();
const channels = {};

globalChannel.channel = function(name) {
    let channel;
    if (name) {
        channel = channels[name] || (channels[name] = new EventEmitter());
    } else {
        channel = new EventEmitter();
    }
    return channel;
};

globalChannel.removeChannel = function(name) {
    delete channels[name];
};

module.exports = globalChannel;
