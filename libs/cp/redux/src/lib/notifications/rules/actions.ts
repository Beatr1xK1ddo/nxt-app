import {
    getNotificationsHistory,
    getNotificationsRules,
    userSlice,
    deleteNotificationsRule,
    updateEnabled,
} from "./slices";

export const notificationRuleActions = {
    ...userSlice.actions,
    getNotificationsHistory,
    getNotificationsRules,
    deleteNotificationsRule,
    updateEnabled,
};
