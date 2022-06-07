import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {EErrorType, EIpbeMuxer} from "@nxt-ui/cp/types";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe, validateAndSaveIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditMpegTsMuxer, IIpbeEditMpegTsMuxerErrors, IIpbeEditMpegTsMuxerState} from "./types";
import {ipbeEditFormMpegTsMuxerMapper, mpegTsMuxerErrorState} from "./utils";

export const IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME = "mpegTsMuxer";

const initialState: IIpbeEditMpegTsMuxerState = {
    values: {
        muxer: EIpbeMuxer.libmpegts,
        muxrate: undefined,
        serviceName: "Program1",
        serviceProvider: "Nextologies",
        programNumber: 1,
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
            if (isNaN(action.payload)) {
                state.values.muxrate = undefined;
            } else {
                state.values.muxrate = action.payload;
            }
        },
        changeServiceName(state, action: PayloadAction<string>) {
            state.values.serviceName = action.payload;
        },
        changeProgramNumber(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.programNumber.error = true;
                state.errors.programNumber.helperText = EErrorType.required;
            }

            if (state.errors.programNumber.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.programNumber.error = false;
                delete state.errors.programNumber.helperText;
            }

            state.values.programNumber = action.payload;
        },
        changeTsId(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.tsId.error = true;
                state.errors.tsId.helperText = EErrorType.required;
            }

            if (state.errors.tsId.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.tsId.error = false;
                delete state.errors.tsId.helperText;
            }

            state.values.tsId = action.payload;
        },
        changePcrPid(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPid.error = true;
                state.errors.pcrPid.helperText = EErrorType.required;
            }

            if (state.errors.pcrPid.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPid.error = false;
                delete state.errors.pcrPid.helperText;
            }

            state.values.pcrPid = action.payload;
        },
        changePcrPeriod(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pcrPeriod.error = true;
                state.errors.pcrPeriod.helperText = EErrorType.required;
            }

            if (state.errors.pcrPeriod.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPeriod.error = false;
                delete state.errors.pcrPeriod.helperText;
            }

            state.values.pcrPeriod = action.payload;
        },
        changePmtPid(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pmtPid.error = true;
                state.errors.pmtPid.helperText = EErrorType.required;
            }

            if (state.errors.pmtPid.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPid.error = false;
                delete state.errors.pmtPid.helperText;
            }

            state.values.pmtPid = action.payload;
        },
        changePmtPeriod(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.pmtPeriod.error = true;
                state.errors.pmtPeriod.helperText = EErrorType.required;
            }

            if (state.errors.pmtPeriod.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPeriod.error = false;
                delete state.errors.pmtPeriod.helperText;
            }

            state.values.pmtPeriod = action.payload;
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
            .addCase(updateIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditFormMpegTsMuxerMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditFormMpegTsMuxerMapper(action.payload as IApiIpbe);
            })
            .addCase(validateAndSaveIpbe, (state) => {
                const requiredFields = ["pcrPid", "programNumber", "pmtPid", "pcrPeriod", "tsId"] as Array<
                    keyof Pick<IIpbeEditMpegTsMuxer, "pcrPid" | "programNumber" | "pmtPid" | "pcrPeriod" | "tsId">
                >;
                requiredFields.forEach((key) => {
                    if (typeof state.values[key] !== "number") {
                        if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = EErrorType.required;
                        }
                    }
                });
            })
            .addCase(updateIpbe.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    errors.forEach((error) => {
                        const field = state.errors[error.key as keyof IIpbeEditMpegTsMuxerErrors];
                        if (field) {
                            if (Array.isArray(field)) {
                                return;
                            } else {
                                field.error = true;
                                field.helperText = error.message;
                            }
                        }
                    });
                }
            })
            .addCase(createIpbe.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    errors.forEach((error) => {
                        const field = state.errors[error.key as keyof IIpbeEditMpegTsMuxerErrors];
                        if (field) {
                            if (Array.isArray(field)) {
                                return;
                            } else {
                                field.error = true;
                                field.helperText = error.message;
                            }
                        }
                    });
                }
            })
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values = ipbeEditFormMpegTsMuxerMapper(action.payload);
            });
    },
});

export default ipbeEditMpegTsMuxerSlice.reducer;
