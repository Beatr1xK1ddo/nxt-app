import api from "@nxt-ui/cp/api";
import {EDataProcessingStatus, IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createNotification} from "../form/slices";
import {INotificationRules} from "./types";
import {historyMapper} from "./utils";

export const NOTIFICATION_RULES = "rules";
export const NOTIFICATION_HISTORY = "notificationHistory";

const initialState: INotificationRules = {
    rules: [],
    history: [],
    status: EDataProcessingStatus.fetchRequired,
    lastHistoryId: "",
};

export const getNotificationsRules = createAsyncThunk(`${NOTIFICATION_RULES}/getItems`, async () => {
    return await api.notifications.fetchNotificationRules();
});

export const deleteNotificationsRule = createAsyncThunk(
    `${NOTIFICATION_RULES}/deleteNotificationsRule`,
    async (ruleId: string) => {
        return await api.notifications.deleteNotificationRule(ruleId);
    }
);

export const getNotificationsHistory = createAsyncThunk(
    `${NOTIFICATION_HISTORY}/getHistory`,
    async (options: IGetNotificationHistoryOptions) => {
        return await api.notifications.fetchNotificationHistory(options);
    }
);

export const userSlice = createSlice({
    name: NOTIFICATION_RULES,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getNotificationsRules.fulfilled, (state, action) => {
                state.rules = action.payload;
                state.status = EDataProcessingStatus.succeeded;
            })
            .addCase(getNotificationsHistory.fulfilled, (state, action) => {
                const result = historyMapper(action.payload);
                state.history = result;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.status = EDataProcessingStatus.fetchRequired;
            })
            .addCase(deleteNotificationsRule.fulfilled, (state) => {
                state.status = EDataProcessingStatus.fetchRequired;
            });
    },
});

export default userSlice.reducer;
