function promiseAllRejections(promises) {
    return new Promise((resolve) => {
        let resolved = false;
        let remaining = promises.length;
        promises.forEach(promise => {
            promise.then(() => {
                if (!resolved) {
                    resolved = true;
                    resolve({ 'showNodeError': false });
                }
            }).catch(err => {
                console.error(err);
                if (--remaining === 0) {
                    resolve({ 'showNodeError': true });
                }
            });
        });
    });
}

module.exports = {
    promiseAllRejections
};
