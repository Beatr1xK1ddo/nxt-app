import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {
    EErrorType,
    EIpbeApplicationTypeKeys,
    EIpbeAspectRatio,
    EIpbeFieldOrder,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
} from "@nxt-ui/cp/types";
import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {
    EVideoEncoderFields,
    IIpbeEditVideoEncoder,
    IIpbeEditVideoEncoderErrors,
    IIpbeEditVideoEncoderState,
} from "./types";
import {ipbeApiToVideoEncoderMapper, requiredFields, videoEncoderErrorState} from "./utils";
import {fetchIpbe, resetIpbe, updateIpbe, validateIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {setApplication} from "../main/actions";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

export const IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME = "videoEncoder";

const initialState: IIpbeEditVideoEncoderState = {
    values: {
        videoEncoder: EIpbeVideoEncoder.x264,
        preset: EIpbePreset.superfast,
        profile: EIpbeProfile.high,
        level: EIpbeLevel["4.0"],
        videoBitrate: "8",
        vbvMaxrate: "8",
        vbvBufsize: "8",
        aspectRatio: EIpbeAspectRatio["not set"],
        keyint: 15,
        bframes: 2,
        maxRefs: 4,
        lookahead: 5,
        openGop: false,
        bFrameAdaptive: false,
        scenecutThreshold: 0,
        interlaced: EIpbeInterlaced.auto,
        cbr: true,
        intraRefresh: false,
        threads: 8,
    },
    errors: videoEncoderErrorState,
    dirty: {},
};

export const ipbeEditVideoEncoderSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        setVideoEncoder(state, action: PayloadAction<EIpbeVideoEncoder>) {
            if (state.errors.videoEncoder.error && action.payload) {
                state.errors.videoEncoder.error = false;
                delete state.errors.videoEncoder.helperText;
            }

            if (!(EVideoEncoderFields.videoEncoder in state.dirty)) {
                state.dirty[EVideoEncoderFields.videoEncoder] = true;
            }

            state.values.videoEncoder = action.payload;
        },
        setPreset(state, action: PayloadAction<EIpbePreset>) {
            if (state.errors.preset.error && action.payload) {
                state.errors.preset.error = false;
                delete state.errors.preset.helperText;
            }
            state.values.preset = action.payload;
        },
        setProfile(state, action: PayloadAction<EIpbeProfile>) {
            if (state.errors.profile.error && action.payload) {
                state.errors.profile.error = false;
                delete state.errors.profile.helperText;
            }
            state.values.profile = action.payload;
        },
        setLevel(state, action: PayloadAction<EIpbeLevel>) {
            if (state.errors.level.error && action.payload) {
                state.errors.level.error = false;
                delete state.errors.level.helperText;
            }
            state.values.level = action.payload;
        },
        setVBitrate(state, action: PayloadAction<string>) {
            const floatValue = parseFloat(action.payload);
            if (state.errors.videoBitrate.error && !isNaN(floatValue)) {
                state.errors.videoBitrate.error = false;
                delete state.errors.videoBitrate.helperText;
            }

            if (!action.payload) {
                state.errors.videoBitrate.error = true;
                state.errors.videoBitrate.helperText = EErrorType.required;
                state.values.videoBitrate = action.payload;
            } else if (!/^[0-9]+\.[0-9]+$/i.test(action.payload) && !/^[0-9]+$/i.test(action.payload)) {
                state.errors.videoBitrate.error = true;
                state.errors.videoBitrate.helperText = EErrorType.badFloat;
            }
            state.values.videoBitrate = action.payload;
        },
        setVBVMaxrate(state, action: PayloadAction<string>) {
            const floatValue = parseFloat(action.payload);
            if (state.errors.vbvMaxrate.error && !isNaN(floatValue)) {
                state.errors.vbvMaxrate.error = false;
                delete state.errors.vbvMaxrate.helperText;
            }

            if (!action.payload) {
                state.errors.vbvMaxrate.error = true;
                state.errors.vbvMaxrate.helperText = EErrorType.required;
            } else if (!/^[0-9]+\.[0-9]+$/i.test(action.payload) && !/^[0-9]+$/i.test(action.payload)) {
                state.errors.vbvMaxrate.error = true;
                state.errors.vbvMaxrate.helperText = EErrorType.badFloat;
            }
            state.values.vbvMaxrate = action.payload;
        },
        setVBVBufsize(state, action: PayloadAction<string>) {
            const floatValue = parseFloat(action.payload);
            if (state.errors.vbvBufsize.error && !isNaN(floatValue)) {
                state.errors.vbvBufsize.error = false;
                delete state.errors.vbvBufsize.helperText;
            }

            if (!action.payload) {
                state.errors.vbvBufsize.error = true;
                state.errors.vbvBufsize.helperText = EErrorType.required;
            } else if (!/^[0-9]+\.[0-9]+$/i.test(action.payload) && !/^[0-9]+$/i.test(action.payload)) {
                state.errors.vbvBufsize.error = true;
                state.errors.vbvBufsize.helperText = EErrorType.badFloat;
            }
            state.values.vbvBufsize = action.payload;
        },
        setAspectRatio(state, action: PayloadAction<EIpbeAspectRatio>) {
            state.values.aspectRatio = action.payload;
        },
        setKeyint(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.keyint.error = true;
                state.errors.keyint.helperText = EErrorType.required;
            }

            if (state.errors.keyint.error && action.payload) {
                state.errors.keyint.error = false;
                delete state.errors.keyint.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.keyint = null;
            } else {
                state.values.keyint = action.payload;
            }
        },
        setBframes(state, action: PayloadAction<number>) {
            if (state.errors.bframes.error && !isNaN(action.payload)) {
                state.errors.bframes.error = false;
                delete state.errors.bframes.helperText;
            }

            state.values.bframes = action.payload;
        },
        setMaxRefs(state, action: PayloadAction<number | undefined>) {
            if (!action.payload && typeof action.payload !== "number") {
                state.values.maxRefs = null;
            } else {
                state.values.maxRefs = action.payload;
            }
        },
        setLookahead(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.lookahead.error = true;
                state.errors.lookahead.helperText = EErrorType.required;
            }

            if (state.errors.lookahead.error && action.payload) {
                state.errors.lookahead.error = false;
                delete state.errors.lookahead.helperText;
            }

            if (!action.payload) {
                state.values.lookahead = null;
            } else {
                state.values.lookahead = action.payload;
            }
        },
        setOpenGop(state) {
            state.values.openGop = !state.values.openGop;
        },
        setCbr(state) {
            state.values.cbr = !state.values.cbr;
        },
        setIntraRefresh(state) {
            state.values.intraRefresh = !state.values.intraRefresh;
        },
        setBFrameAdaptive(state) {
            state.values.bFrameAdaptive = !state.values.bFrameAdaptive;
        },
        setScenecutThreshold(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.scenecutThreshold.error = true;
                state.errors.scenecutThreshold.helperText = EErrorType.required;
            }

            if (state.errors.scenecutThreshold.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.scenecutThreshold.error = false;
                delete state.errors.scenecutThreshold.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.scenecutThreshold = null;
            } else {
                state.values.scenecutThreshold = action.payload;
            }
        },
        setInterlaced(state, action: PayloadAction<EIpbeInterlaced>) {
            state.values.interlaced = action.payload;
        },
        setFieldOrder(state, action: PayloadAction<EIpbeFieldOrder>) {
            state.values.fieldOrder = action.payload;
        },
        setThread(state, action: PayloadAction<number>) {
            state.values.threads = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(setApplication, (state, action) => {
                const {payload} = action;
                if (
                    payload !== EIpbeApplicationTypeKeys.Sdi2Web &&
                    state.values.videoEncoder === EIpbeVideoEncoder.VP8
                ) {
                    if (payload === EIpbeApplicationTypeKeys.AVDS2) {
                        state.values.videoEncoder = EIpbeVideoEncoder.AVC1;
                    } else {
                        state.values.videoEncoder = EIpbeVideoEncoder.x264;
                    }
                } else if (!(EVideoEncoderFields.videoEncoder in state.dirty)) {
                    if (payload === EIpbeApplicationTypeKeys.AVDS2) {
                        state.values.videoEncoder = EIpbeVideoEncoder.AVC1;
                    } else if (payload === "IPBE") {
                        state.values.videoEncoder = EIpbeVideoEncoder.x264;
                    } else {
                        state.values.videoEncoder = EIpbeVideoEncoder.VP8;
                    }
                }
                if (payload === "IPBE" && state.values.preset !== EIpbePreset.superfast) {
                    state.values.preset = EIpbePreset.superfast;
                }
            })
            .addCase(validateIpbe, (state) => {
                requiredFields.forEach((key) => {
                    if (typeof state.values[key] !== "number" && !state.values[key]) {
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
                        const field = state.errors[error.key as keyof IIpbeEditVideoEncoderErrors];
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
                state.values = ipbeApiToVideoEncoderMapper(action.payload as IApiIpbe);
            });
    },
});
export default ipbeEditVideoEncoderSlice.reducer;
