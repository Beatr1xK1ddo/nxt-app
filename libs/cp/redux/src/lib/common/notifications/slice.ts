import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4} from "uuid";

import {EChangeStatus, ENotificationType, INotification, StringId} from "@nxt-ui/cp/types";
import {INotificationAddActionPayload, INotificationsState} from "./types";
import {changeStatuses} from "../applications/slice";

export const NOTIFICATIONS_SLICE_NAME = "notifications";

export const notificationAdapter = createEntityAdapter<INotification>({
    //todo: I suppose we need to sort them by type first
    sortComparer: (one, another) => another.created - one.created,
});

const initialState: INotificationsState = {
    data: notificationAdapter.getInitialState(),
    visible: [],
};

//state slice itself
export const notificationsSlice = createSlice({
    name: NOTIFICATIONS_SLICE_NAME,
    initialState,
    reducers: {
        add: (state, action: PayloadAction<INotificationAddActionPayload>) => {
            const notification: INotification = {
                id: action.payload.id || v4(),
                created: new Date().getTime(),
                type: action.payload.type || ENotificationType.info,
                message: action.payload.message,
                duration: action.payload.duration ?? null,
            };
            notificationAdapter.addOne(state.data, notification);
            state.visible.push(notification.id);
        },
        remove: (state, action: PayloadAction<StringId>) => {
            if (state.visible.includes(action.payload)) {
                const index = state.visible.findIndex((id) => id === action.payload);
                state.visible.splice(index, 1);
            }
            notificationAdapter.removeOne(state.data, action.payload);
        },
        show: (state, action: PayloadAction<StringId>) => {
            if (state.visible.includes(action.payload)) {
                return;
            }
            state.visible.push(action.payload);
        },
        hide: (state, action: PayloadAction<StringId>) => {
            if (state.visible.includes(action.payload)) {
                const index = state.visible.findIndex((id) => id === action.payload);
                state.visible.splice(index, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeStatuses.pending, (state, action) => {
            const status = action.meta.arg.statuses;
            const restart = action.meta.arg.restart;
            if (!Array.isArray(status)) {
                const message = restart
                    ? "Restarting application"
                    : status.statusChange === EChangeStatus.start
                    ? "Starting application"
                    : "Stop application request has been sent";
                const notification: INotification = {
                    id: v4(),
                    created: new Date().getTime(),
                    type: ENotificationType.info,
                    message,
                    duration: 2000,
                };
                notificationAdapter.addOne(state.data, notification);
                state.visible.push(notification.id);
            }
        });
    },
});

//export reducer by default
export default notificationsSlice.reducer;
