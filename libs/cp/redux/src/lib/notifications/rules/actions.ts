import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "@nxt-ui/cp/api";
import {IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";

export const NOTIFICATION_RULES = "notificationRules";
export const NOTIFICATION_HISTORY = "notificationHistory";

export const getNotificationsRules = createAsyncThunk(`${NOTIFICATION_RULES}/getItems`, async () => {
    return await api.notifications.fetchNotificationRules();
});
export const getNotificationsHistory = createAsyncThunk(
    `${NOTIFICATION_HISTORY}/getItems`,
    async (options: IGetNotificationHistoryOptions, thunkApi) => {
        return await api.notifications.fetchNotificationHistory(options);
    }
);

export const notificationActions = {
    getNotificationsHistory,
    getNotificationsRules,
};
