'use strict';

module.exports = () => (req, res, next) => {
    const isShowdiag = req.query._showdiag;
    req.showDiag = ((isShowdiag === '1' || isShowdiag === 'true') && req.ebay.isInternalRequest());
    next();
};
