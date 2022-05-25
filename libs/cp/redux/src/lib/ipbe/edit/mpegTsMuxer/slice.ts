import {EApiIpbeMuxer} from "@nxt-ui/cp/api";
import {EErrorType} from "@nxt-ui/cp/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditMpegTsMuxerTabState} from "./types";
import {mpegTsMuxerErrorState} from "./utils";

const IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/videoEncoder`;

const initialState: IIpbeEditMpegTsMuxerTabState = {
    errors: mpegTsMuxerErrorState,
    values: {},
};

// ipbeAudioEncoders: Array<IApiIpbeAudioEncoder>;

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME,
    initialState,
    reducers: {
        changeAddScte(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.addScte = action.payload;
            }
        },
        changeServiceProvider(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.serviceProvider = action.payload;
            }
        },
        changeMuxer(state, action: PayloadAction<EApiIpbeMuxer>) {
            if (state.values) {
                state.values.muxer = action.payload;
            }
        },
        changeMuxrate(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.muxrate = action.payload;
            }
        },
        changeServiceName(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.serviceName = action.payload;
            }
        },
        changeProgramNumber(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.programNumberError.error = true;
                state.errors.programNumberError.helperText = EErrorType.required;
            }

            if (state.errors.programNumberError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.programNumberError.error = false;
                delete state.errors.programNumberError.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.programNumber = undefined;
            } else {
                state.values.programNumber = action.payload;
            }
        },
        changeTsId(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.tsIdError.error = true;
                state.errors.tsIdError.helperText = EErrorType.required;
            }

            if (state.errors.tsIdError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.tsIdError.error = false;
                delete state.errors.tsIdError.helperText;
            }

            state.values.tsIdL = action.payload;
        },
        changePcrPid(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPidError.error = true;
                state.errors.pcrPidError.helperText = EErrorType.required;
            }

            if (state.errors.pcrPidError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPidError.error = false;
                delete state.errors.pcrPidError.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.pcrPid = undefined;
            } else {
                state.values.pcrPid = action.payload;
            }
        },
        changePcrPeriod(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPeriodError.error = true;
                state.errors.pcrPeriodError.helperText = EErrorType.required;
            }

            if (state.errors.pcrPeriodError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPeriodError.error = false;
                delete state.errors.pcrPeriodError.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.pcrPeriod = undefined;
            } else {
                state.values.pcrPeriod = action.payload;
            }
        },
        changePmtPid(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pmtPidError.error = true;
                state.errors.pmtPidError.helperText = EErrorType.required;
            }

            if (state.errors.pmtPidError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPidError.error = false;
                delete state.errors.pmtPidError.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.pmtPid = undefined;
            } else {
                state.values.pmtPid = action.payload;
            }
        },
        changePmtPeriod(state, action: PayloadAction<number>) {
            if (!state.values) {
                return;
            }
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.pmtPeriod = undefined;
            } else {
                state.values.pmtPeriod = action.payload;
            }
        },
    },
});
