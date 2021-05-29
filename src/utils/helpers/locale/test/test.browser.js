'use strict';

const chai = require('chai');
const expect = chai.expect;
const localeUtil = require('../index');

describe('testing locale util', () => {
    it('should format US', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'USD', 'en-US');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('$1,000.00');
    });

    it('should format UK', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'GBP', 'en-GB');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('£1,000.00');
    });

    it('should format AU', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'AUD', 'en-AU');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('AU $1,000.00');
    });

    it('should format DE', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'EUR', 'de-DE');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('1.000,00 €');
    });

    it('should format CA', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'CAD', 'en-CA');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('C $1,000.00');
    });

    it('should format CAFR', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'CAD', 'fr-CA');
        expect(formattedValue).to.be.not.null;
    });

    it('should format IT', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'EUR', 'it-IT');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('1.000,00 €');
    });

    it('should format ES', () => {
        const formattedValue = localeUtil.currencyFormat('1000', 'EUR', 'es-ES');
        expect(formattedValue).to.be.not.null;
        expect(formattedValue).to.equal('1000,00 €');
    });
});
