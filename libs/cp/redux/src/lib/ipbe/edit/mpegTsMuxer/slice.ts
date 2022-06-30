import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {EErrorType, EIpbeApplicationType, EIpbeMuxer, IValidateIpbePayload} from "@nxt-ui/cp/types";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

import {fetchIpbe, resetIpbe, updateIpbe, validateIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {setApplication} from "../main/actions";
import {IIpbeEditMpegTsMuxer, IIpbeEditMpegTsMuxerErrors, IIpbeEditMpegTsMuxerState} from "./types";
import {ipbeApiToMpegTsMuxerMapper, mpegTsMuxerErrorState} from "./utils";

export const IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME = "mpegTsMuxer";

const initialState: IIpbeEditMpegTsMuxerState = {
    values: {
        muxer: EIpbeMuxer.libmpegts,
        muxrate: null,
        serviceName: "Program1",
        serviceProvider: "Nextologies",
        programNumber: 1,
        videoPid: null,
        audioPid: null,
        pmtPid: null,
        pmtPeriod: null,
        pcrPid: null,
        pcrPeriod: null,
        tsId: null,
        addScte: null,
    },
    errors: mpegTsMuxerErrorState,
};

export const ipbeEditMpegTsMuxerSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME}`,
    initialState,
    reducers: {
        setAddScte(state, action: PayloadAction<string>) {
            state.values.addScte = action.payload;
        },
        setServiceProvider(state, action: PayloadAction<string>) {
            state.values.serviceProvider = action.payload;
        },
        setMuxer(state, action: PayloadAction<EIpbeMuxer>) {
            state.values.muxer = action.payload;
        },
        setMuxrate(state, action: PayloadAction<string>) {
            const floatValue = parseFloat(action.payload);
            if (state.errors.muxrate.error && !isNaN(floatValue)) {
                state.errors.muxrate.error = false;
                delete state.errors.muxrate.helperText;
            }

            if (!action.payload) {
                state.errors.muxrate.error = true;
                state.errors.muxrate.helperText = EErrorType.required;
            } else if (!/^[0-9]+\.[0-9]+$/i.test(action.payload) && !/^[0-9]+$/i.test(action.payload)) {
                state.errors.muxrate.error = true;
                state.errors.muxrate.helperText = EErrorType.badFloat;
            }
            state.values.muxrate = action.payload;
        },
        setServiceName(state, action: PayloadAction<string>) {
            state.values.serviceName = action.payload;
        },
        setProgramNumber(state, action: PayloadAction<number | null>) {
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
        setTsId(state, action: PayloadAction<number | null>) {
            if (state.errors.tsId.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.tsId.error = false;
                delete state.errors.tsId.helperText;
            }

            state.values.tsId = action.payload;
        },
        setPcrPid(state, action: PayloadAction<number | null>) {
            if (state.errors.pcrPid.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPid.error = false;
                delete state.errors.pcrPid.helperText;
            }

            state.values.pcrPid = action.payload;
        },
        setPcrPeriod(state, action: PayloadAction<number | null>) {
            if (state.errors.pcrPeriod.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pcrPeriod.error = false;
                delete state.errors.pcrPeriod.helperText;
            }

            state.values.pcrPeriod = action.payload;
        },
        setPmtPid(state, action: PayloadAction<number | null>) {
            if (state.errors.pmtPid.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPid.error = false;
                delete state.errors.pmtPid.helperText;
            }

            state.values.pmtPid = action.payload;
        },
        setPmtPeriod(state, action: PayloadAction<number | null>) {
            if (state.errors.pmtPeriod.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.pmtPeriod.error = false;
                delete state.errors.pmtPeriod.helperText;
            }

            state.values.pmtPeriod = action.payload;
        },
        //todo: do we really need this?
        setVideoPid(state, action: PayloadAction<number>) {
            if (isNaN(action.payload)) {
                state.values.videoPid = null;
            } else {
                state.values.videoPid = action.payload;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(setApplication, (state, action) => {
                const {payload} = action;
                if (payload !== EIpbeApplicationType.AVDS2 && state.values.muxer === EIpbeMuxer.mainconcept) {
                    state.values.muxer = EIpbeMuxer.libmpegts;
                }
                if (payload === EIpbeApplicationType.Sdi2Web && state.errors.programNumber.error) {
                    state.errors.programNumber.error = false;
                    delete state.errors.programNumber.helperText;
                }
                if (payload === EIpbeApplicationType.Sdi2Web && state.errors.muxrate.error) {
                    state.errors.muxrate.error = false;
                    delete state.errors.muxrate.helperText;
                }
            })
            .addCase(validateIpbe, (state, action: PayloadAction<IValidateIpbePayload>) => {
                const requiredFields = ["programNumber"] as Array<keyof Pick<IIpbeEditMpegTsMuxer, "programNumber">>;
                const {applicationType} = action.payload;
                if (applicationType !== EIpbeApplicationType.Sdi2Web) {
                    requiredFields.forEach((key) => {
                        if (typeof state.values[key] !== "number") {
                            if (state.errors[key]) {
                                state.errors[key].error = true;
                                state.errors[key].helperText = EErrorType.required;
                            }
                        }
                    });
                }
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
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled), (state, action) => {
                state.values = ipbeApiToMpegTsMuxerMapper(action.payload as IApiIpbe);
            });
    },
});
export default ipbeEditMpegTsMuxerSlice.reducer;
