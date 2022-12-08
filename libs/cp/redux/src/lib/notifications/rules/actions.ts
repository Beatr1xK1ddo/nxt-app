import {getNotificationsHistory, getNotificationsRules, userSlice, deleteNotificationsRule} from "./slices";

export const notificationRuleActions = {
    ...userSlice.actions,
    getNotificationsHistory,
    getNotificationsRules,
    deleteNotificationsRule,
};
