import {getNotificationsHistory, getNotificationsRules, userSlice} from "./slices";

export const notificationRuleActions = {
    ...userSlice.actions,
    getNotificationsHistory,
    getNotificationsRules,
};
