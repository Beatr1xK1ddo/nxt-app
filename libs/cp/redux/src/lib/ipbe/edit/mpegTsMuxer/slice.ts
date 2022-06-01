import {IApiIpbe} from "@nxt-ui/cp/api";
import {EErrorType, EIpbeMuxer} from "@nxt-ui/cp/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchIpbe, resetIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditMpegTsMuxerState} from "./types";
import {ipbeEditFormMpegTsMuxerMapper, mpegTsMuxerErrorState} from "./utils";

export const IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME = "mpegTsMuxer";

const initialState: IIpbeEditMpegTsMuxerState = {
    values: {
        muxer: EIpbeMuxer.libmpegts,
        muxrate: undefined,
        serviceName: "",
        serviceProvider: "",
        programNumber: undefined,
        videoPid: undefined,
        audioPid: undefined,
        pmtPid: undefined,
        pmtPeriod: undefined,
        pcrPid: undefined,
        pcrPeriod: undefined,
        tsId: undefined,
        addScte: undefined,
    },
    errors: mpegTsMuxerErrorState,
};

export const ipbeEditMpegTsMuxerSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME}`,
    initialState,
    reducers: {
        changeAddScte(state, action: PayloadAction<string>) {
            state.values.addScte = action.payload;
        },
        changeServiceProvider(state, action: PayloadAction<string>) {
            state.values.serviceProvider = action.payload;
        },
        changeMuxer(state, action: PayloadAction<EIpbeMuxer>) {
            state.values.muxer = action.payload;
        },
        changeMuxrate(state, action: PayloadAction<number>) {
            state.values.muxrate = action.payload;
        },
        changeServiceName(state, action: PayloadAction<string>) {
            state.values.serviceName = action.payload;
        },
        changeProgramNumber(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.programNumberError.error = true;
                state.errors.programNumberError.helperText = EErrorType.required;
            }

            if (state.errors.programNumberError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.programNumberError.error = false;
                delete state.errors.programNumberError.helperText;
            }

            state.values.programNumber = action.payload;
        },
        changeTsId(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.tsIdError.error = true;
                state.errors.tsIdError.helperText = EErrorType.required;
            }

            if (state.errors.tsIdError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.tsIdError.error = false;
                delete state.errors.tsIdError.helperText;
            }

            state.values.tsId = action.payload;
        },
        changePcrPid(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPidError.error = true;
                state.errors.pcrPidError.helperText = EErrorType.required;
            }

            if (state.errors.pcrPidError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPidError.error = false;
                delete state.errors.pcrPidError.helperText;
            }

            state.values.pcrPid = action.payload;
        },
        changePcrPeriod(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPeriodError.error = true;
                state.errors.pcrPeriodError.helperText = EErrorType.required;
            }

            if (state.errors.pcrPeriodError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPeriodError.error = false;
                delete state.errors.pcrPeriodError.helperText;
            }

            state.values.pcrPeriod = action.payload;
        },
        changePmtPid(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pmtPidError.error = true;
                state.errors.pmtPidError.helperText = EErrorType.required;
            }

            if (state.errors.pmtPidError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPidError.error = false;
                delete state.errors.pmtPidError.helperText;
            }

            state.values.pmtPid = action.payload;
        },
        changePmtPeriod(state, action: PayloadAction<number>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.pmtPeriod = undefined;
            } else {
                state.values.pmtPeriod = action.payload;
            }
        },
        //todo: do we really need this?
        changeVideoPid(state, action: PayloadAction<number>) {
            state.values.videoPid = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values = ipbeEditFormMpegTsMuxerMapper(action.payload);
            });
    },
});

export default ipbeEditMpegTsMuxerSlice.reducer;
