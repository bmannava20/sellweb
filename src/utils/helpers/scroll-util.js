function scrollToTop(behavior = 'instant') {
    if (typeof(window) === 'undefined' || (window.pageYOffset === 0 || window.scrollY === 0)) {
        return;
    }

    window.scrollTo({
        behavior: behavior,
        top: 0
    });
}

module.exports = {
    scrollToTop
};
