'use strict';

const safeGet = require('just-safe-get');

module.exports = {
    getData: function(input) {
        return {
            feedbackIcon: safeGet(input, 'model.memberBadge.feedbackBadge'),
            feedbackIconAlt: safeGet(input, 'model.memberBadge.feedbackBadgeAlt'),
            meBadgeUsr: safeGet(input, 'model.memberBadge.user.text'),
            meBadgeUsrLink: safeGet(input, 'model.memberBadge.user.action.URL'),
            meBadgeUsrFdBackTxt: safeGet(input, 'model.memberBadge.userFeedback.text'),
            meBadgeDoorAccTxt: safeGet(input, 'model.memberBadge.storeUrl.accessibilityText'),
            meBadgeDoorURL: safeGet(input, 'model.memberBadge.storeUrl.action.URL'),
            meBadgeUsrFdBackTxtLnk: safeGet(input, 'model.memberBadge.userFeedback.action.URL'),
            meBadgeUsrAccessibilityText: safeGet(input, 'model.memberBadge.user.accessibilityText'),
            meBadgeUsrFdBackAccessibilityText: safeGet(input, 'model.memberBadge.userFeedback.accessibilityText'),
            feedBackLink: safeGet(input, 'model.feedBackLink')
        };
    }
};
