'use strict';

module.exports = {
    currencyFormat(value, currencyCode, locale) {
        let currCodeStr, formattedStr;
        const convertedNum = Number(value);
        if (isNaN(convertedNum)) {
            return '0';
        }
        switch (currencyCode) {
            case 'AUD':
                currCodeStr = 'AU';
                break;
            case 'CAD':
                currCodeStr = 'C';
                break;
            default:
                break;
        }

        const localeStr = convertedNum.toLocaleString(locale, {
            style: 'currency',
            currency: currencyCode
        });

        if (currCodeStr) {
            // fr-CA append currency code in end ex: 10,000 $C
            if (locale === 'fr-CA') {
                formattedStr = `${localeStr}${currCodeStr}`;
            } else {
                formattedStr = `${currCodeStr} ${localeStr}`;
            }
        } else {
            formattedStr = localeStr;
        }

        return formattedStr;
    }
};
