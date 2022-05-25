import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIpbeEditAdvancedTabState} from "./types";

const IPBE_EDIT_ADVANCED_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/audioEncoders`;

const initialState: IIpbeEditAdvancedTabState = {
    errors: {slateImage: {error: false}},
    values: {},
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_ADVANCED_SLICE_NAME,
    initialState,
    reducers: {
        changeAddTimecode(state) {
            if (state.values) {
                state.values.addTimecode = !state.values.addTimecode;
            }
        },
        changeEnablePsfEncoding(state) {
            if (state.values) {
                state.values.enablePsfEncoding = !state.values.enablePsfEncoding;
            }
        },
        changeRunMonitor(state) {
            if (state.values) {
                state.values.runMonitor = !state.values.runMonitor;
            }
        },
        changeRestartOnError(state) {
            if (state.values) {
                state.values.restartOnError = !state.values.restartOnError;
            }
        },
        changeEnableLoopback(state) {
            if (state.values) {
                state.values.enableLoopback = !state.values.enableLoopback;
            }
        },
        changeEnablePreviewImages(state) {
            if (state.values) {
                state.values.enablePreviewImages = !state.values.enablePreviewImages;
            }
        },
        changeEnableSlateIfNoSignal(state) {
            if (state.values) {
                state.values.enableSlateIfNoSignal = !state.values.enableSlateIfNoSignal;
            }
        },
        changeSlateImage(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.slateImage = action.payload;
            }
        },
    },
});

export default ipbeEditMainFormSlice.reducer;
