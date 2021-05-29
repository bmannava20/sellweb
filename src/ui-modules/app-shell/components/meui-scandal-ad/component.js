'use strict';

const safeGet = require('just-safe-get');
const SCANDAL_ADS_PLACEMENT_COUNT = 6;

function getData(input) {
    const data = input;
    const placement = safeGet(data, 'placement');
    data.isFooterAd = (safeGet(data, 'isFooterAd') === 'true');
    const placementId = safeGet(data, `model.adsInfo.${placement}.placementID`);
    data.scandalId = `scandal${placementId}`;
    const scandalAd = {};
    let adsInfo = safeGet(data, `model.adsInfo.${placement}.ads`);
    try {
        adsInfo = JSON.parse(adsInfo);
    } catch (err) {
        adsInfo = '';
    }
    scandalAd[placementId] = adsInfo;
    data.scandalAd = scandalAd;
    const isAdsEnabled = safeGet(data, 'model.showMFEads');
    data.displayAds = isAdsEnabled && placementId;
    return data;
}

module.exports = {
    onCreate: function(input) {
        const tm = getData(input);
        const compInput = {
            displayAds: tm.displayAds,
            model: tm.model,
            scandalId: tm.scandalId,
            scandalAd: tm.scandalAd
        };
        this.state = compInput;
    },

    onMount: function() {
        window.scandalAds = window.scandalAds || [];
        /* The init block gets called for every placemenyt widget on the page.
           If we reset the length to zero on every init the window.scandalAds will contain only the last inited widget.
           Hence we check for the number of placments in our page which is constant and reset
           if teh count is more than that which it will be in case of SPA */
        if (window.scandalAds.length >= SCANDAL_ADS_PLACEMENT_COUNT) {
            window.scandalAds.length = 0; // reset the array for new placements
        }

        // toggle display for footer ads which were hidden during SPA on app-shell onMount this is a hack needs resolution from ads team MEBS-6993
        const gfPlmt = document.getElementById(this.state.scandalId);
        if (gfPlmt) {
            try {
                gfPlmt.style.display = 'block';
                window.scandalAds.push(this.state.scandalAd);
            } catch (e) {
                console.error('ERROR scandalAd', e);
            }
        }
    }
};
