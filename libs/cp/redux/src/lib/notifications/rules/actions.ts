import {
    getNotificationsHistory,
    getNotificationsRules,
    userSlice,
    deleteNotificationsRule,
    updateEnabled,
    notificationRulesAction,
} from "./slices";

export const notificationRuleActions = {
    ...userSlice.actions,
    getNotificationsHistory,
    getNotificationsRules,
    deleteNotificationsRule,
    updateEnabled,
    notificationRulesAction,
};
