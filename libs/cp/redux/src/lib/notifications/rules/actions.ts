import {
    getNotificationsHistory,
    getNotificationsRules,
    userSlice,
    deleteNotificationsRule,
    updateEnabled,
    notificationRulesAction,
    deleteNotificationRulesAction,
} from "./slices";

export const notificationRuleActions = {
    ...userSlice.actions,
    getNotificationsHistory,
    getNotificationsRules,
    deleteNotificationsRule,
    updateEnabled,
    notificationRulesAction,
    deleteNotificationRulesAction,
};
