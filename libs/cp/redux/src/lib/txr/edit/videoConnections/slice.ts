import {createSlice} from "@reduxjs/toolkit";
import {fetchMainSelectValues, resetTxr} from "../actions";
import {IVideoConnectionsState} from "./types";

export const VIDEO_CONNECTIONS_SLICE_NAME = "videoConnections";

const initialState: IVideoConnectionsState = {
    values: [],
};

export const videoConnectionsSlice = createSlice({
    name: VIDEO_CONNECTIONS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(fetchMainSelectValues.fulfilled, (state, action) => {
                state.values = Object.values(action.payload.videoConnection);
            });
    },
});

export default videoConnectionsSlice.reducer;
