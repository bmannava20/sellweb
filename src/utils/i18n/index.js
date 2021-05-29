'use strict';

const upgradebrowsercontent = function(req) {
    const bundle = req.ebay.i18n.getBundle('myebay/upgradebrowsercontent');
    return bundle._rawBundle;
};

const globalerrorpage = function(req) {
    const bundle = req.ebay.i18n.getBundle('myebay/globalerrorpage');
    return bundle._rawBundle;
};

module.exports.upgradebrowsercontent = upgradebrowsercontent;
module.exports.globalerrorpage = globalerrorpage;
