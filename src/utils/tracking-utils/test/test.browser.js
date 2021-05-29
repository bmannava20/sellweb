'use strict';
const chai = require('chai');
const expect = chai.expect;
const trackingUtil = require('../tracking-utils');
const model = require('../mock-data/data.json');

describe('given tracking-utils is invoked', () => {
    describe('given getTrackingInfoByKind is invoked with undefined', () => {
        it('should return undefined', () => {
            const result = trackingUtil.getTrackingInfoByKind(model.trackingList);
            expect(result).to.be.undefined;
        });
    });

    describe('given getTrackingInfoByKind is invoked for a link', () => {
        it('should return the NAVSRC tracking list', () => {
            const result = trackingUtil.getTrackingInfoByKind(model.trackingList, 'NAVSRC');
            expect(result).to.not.be.undefined;
            expect(result.actionKind).to.eql('NAVSRC');
            expect(result.eventProperty).to.eql({ moduledtl: 'mi:43837|li:6907' });
        });
    });

    describe('given getTrackingFromListOrObj is invoked for a button', () => {
        it('should return the entire tracking list', () => {
            const result = trackingUtil.getTrackingFromListOrObj({ trackingList: model.trackingList[0] });
            expect(result).to.not.be.undefined;
            expect(result).to.eql(model.trackingList[0]);
        });
    });

    describe('given getTrackingFromListOrObj is invoked for a link', () => {
        it('should return the NAVSRC tracking list', () => {
            const result = trackingUtil.getTrackingFromListOrObj({ trackingList: model.trackingList }, 'NAVSRC');
            expect(result).to.not.be.undefined;
            expect(result.actionKind).to.eql('NAVSRC');
            expect(result.eventProperty).to.eql({ moduledtl: 'mi:43837|li:6907' });
        });
    });
});
