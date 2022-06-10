import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {INotification, StringId} from "@nxt-ui/cp/types";
import {INotificationsState} from "./types";

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
        add: (state, action: PayloadAction<INotification>) => {
            notificationAdapter.addOne(state.data, action.payload);
            state.visible.push(action.payload.id);
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
});

//export reducer by default
export default notificationsSlice.reducer;
