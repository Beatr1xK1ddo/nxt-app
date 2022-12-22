import api, {INotificationRuleApi} from "@nxt-ui/cp/api";
import {EDataProcessingStatus, IGetNotificationHistoryOptions} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {createNotification} from "../form/slices";
import {INotificationRules} from "./types";
import {enabledMapper, historyMapper} from "./utils";

export const NOTIFICATION_RULES = "rules";
export const NOTIFICATION_HISTORY = "notificationHistory";

const initialState: INotificationRules = {
    rules: [],
    history: {
        values: [],
        lastHistoryId: "",
        process: false,
    },
    status: EDataProcessingStatus.fetchRequired,
    selected: [],
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

export const updateEnabled = createAsyncThunk(
    `${NOTIFICATION_RULES}/updateEnabled`,
    async (notification: INotificationRuleApi) => {
        const value = enabledMapper(notification);
        return await api.notifications.postNotification(value);
    }
);

export const userSlice = createSlice({
    name: NOTIFICATION_RULES,
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<string>) {
            if (state.selected.includes(action.payload)) {
                state.selected = state.selected.filter((item) => item !== action.payload);
            } else {
                state.selected.push(action.payload);
            }
        },
        setSelectedAll(state) {
            if (state.selected.length !== state.rules.length) {
                state.selected = state.rules.map((item) => item?.id ?? "");
            } else {
                state.selected = [];
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getNotificationsRules.fulfilled, (state, action) => {
                state.rules = action.payload;
                state.status = EDataProcessingStatus.succeeded;
            })
            .addCase(getNotificationsHistory.fulfilled, (state, action) => {
                const result = historyMapper(action.payload);
                state.history.values.push(...result);
                state.history.lastHistoryId = action.payload[action.payload.length - 1]?.message.messageId ?? "";
                state.history.process = false;
            })
            .addCase(getNotificationsHistory.rejected, (state) => {
                state.history.process = false;
            })
            .addCase(getNotificationsHistory.pending, (state) => {
                state.history.process = true;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.status = EDataProcessingStatus.fetchRequired;
            })
            .addMatcher(isAnyOf(updateEnabled.fulfilled, deleteNotificationsRule.fulfilled), (state) => {
                state.status = EDataProcessingStatus.fetchRequired;
            });
    },
});

export default userSlice.reducer;
