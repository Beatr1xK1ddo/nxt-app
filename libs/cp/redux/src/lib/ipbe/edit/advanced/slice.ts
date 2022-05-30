import {IApiIpbe} from "@nxt-ui/cp/api";
import {IPBE_EDIT_SLICE_NAME} from "../reducer";
import {fetchIpbe} from "../actions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIpbeEditAdvancedState} from "./types";
import {ipbeEditAdvancedMapper} from "./utils";

export const IPBE_EDIT_ADVANCED_SLICE_NAME = "advanced";

const initialState: IIpbeEditAdvancedState = {
    values: {
        addTimecode: false,
        enablePsfEncoding: false,
        enableLoopback: false,
        enablePreviewImages: true,
        enableSlateIfNoSignal: true,
        restartOnError: true,
        runMonitor: true,
        slateImage: undefined,
    },
    errors: {slateImage: {error: false}},
<<<<<<< HEAD
=======
    values: {
        addTimecode: false,
        runMonitor: true,
        enableLoopback: false,
        enableSlateIfNoSignal: true,
        enablePsfEncoding: false,
        restartOnError: true,
        enablePreviewImages: true,
        slateImage: "",
    },
>>>>>>> main
};

export const ipbeEditAdvancedSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_ADVANCED_SLICE_NAME}`,
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
        deleteSlateImage(state) {
            if (state.values) {
                state.values.slateImage = undefined;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditAdvancedMapper(action.payload);
        });
    },
});

export default ipbeEditAdvancedSlice.reducer;
