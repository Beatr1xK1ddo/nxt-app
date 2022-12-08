import api from "@nxt-ui/cp/api";
import {EDataProcessingStatus, IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {INotificationRules} from "./types";

export const NOTIFICATION_RULES = "rules";
export const NOTIFICATION_HISTORY = "notificationHistory";

const initialState: INotificationRules = {
    rules: [],
    status: EDataProcessingStatus.idle,
};

export const getNotificationsRules = createAsyncThunk(`${NOTIFICATION_RULES}/getItems`, async () => {
    return await api.notifications.fetchNotificationRules();
});

export const getNotificationsHistory = createAsyncThunk(
    `${NOTIFICATION_HISTORY}/getItems`,
    async (options: IGetNotificationHistoryOptions) => {
        return await api.notifications.fetchNotificationHistory(options);
    }
);

export const userSlice = createSlice({
    name: NOTIFICATION_RULES,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getNotificationsRules.fulfilled, (state, action) => {
            state.rules = action.payload;
        });
    },
});

export default userSlice.reducer;
