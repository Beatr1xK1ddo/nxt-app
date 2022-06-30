import {IApiTxr, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {
    EErrorType,
    ETxrApplicationType,
    ETxrAspectRatio,
    ETxrInterlaced,
    ETxrLevel,
    ETxrPreset,
    ETxrProfile,
    ETxrVideoEncoder,
} from "@nxt-ui/cp/types";
import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {ITxrEditVideoEncoder, ITxrEditVideoEncoderErrors, ITxrEditVideoEncoderState} from "./types";
import {txrApiToVideoEncoderMapper, videoEncoderErrorState} from "./utils";
import {fetchTxr, resetTxr, updateTxr, validateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {setApplication} from "../main/actions";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

export const TXR_EDIT_VIDEO_ENCODER_SLICE_NAME = "videoEncoder";

const initialState: ITxrEditVideoEncoderState = {
    values: {
        videoEncoder: ETxrVideoEncoder.x264,
        preset: ETxrPreset.superfast,
        profile: ETxrProfile.high,
        level: ETxrLevel["4.0"],
        videoBitrate: null,
        vbvMaxrate: "0",
        vbvBufsize: "0",
        aspectRatio: ETxrAspectRatio["not set"],
        keyint: 15,
        bframes: 2,
        maxRefs: 4,
        lookahead: 0,
        openGop: false,
        bFrameAdaptive: false,
        scenecutThreshold: 0,
        interlaced: ETxrInterlaced.auto,
        cbr: false,
        intraRefresh: false,
        threads: 2,
    },
    errors: videoEncoderErrorState,
};

export const txrEditVideoEncoderSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_VIDEO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        setVideoEncoder(state, action: PayloadAction<ETxrVideoEncoder>) {
            if (state.errors.videoEncoder.error && action.payload) {
                state.errors.videoEncoder.error = false;
                delete state.errors.videoEncoder.helperText;
            }

            state.values.videoEncoder = action.payload;
        },
        setPreset(state, action: PayloadAction<ETxrPreset>) {
            if (state.errors.preset.error && action.payload) {
                state.errors.preset.error = false;
                delete state.errors.preset.helperText;
            }
            state.values.preset = action.payload;
        },
        setProfile(state, action: PayloadAction<ETxrProfile>) {
            if (state.errors.profile.error && action.payload) {
                state.errors.profile.error = false;
                delete state.errors.profile.helperText;
            }
            state.values.profile = action.payload;
        },
        setLevel(state, action: PayloadAction<ETxrLevel>) {
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
        setAspectRatio(state, action: PayloadAction<ETxrAspectRatio>) {
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
        setInterlaced(state, action: PayloadAction<ETxrInterlaced>) {
            state.values.interlaced = action.payload;
        },
        setThread(state, action: PayloadAction<number>) {
            state.values.threads = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(setApplication, (state, action) => {
                const {payload} = action;
                if (payload !== ETxrApplicationType.Sdi2Web && state.values.videoEncoder === ETxrVideoEncoder.VP8) {
                    if (payload === ETxrApplicationType.AVDS2) {
                        state.values.videoEncoder = ETxrVideoEncoder.AVC1;
                    } else {
                        state.values.videoEncoder = ETxrVideoEncoder.x264;
                    }
                }
                if (
                    payload !== ETxrApplicationType.AVDS2 &&
                    state.values.videoEncoder !== ETxrVideoEncoder.VP8 &&
                    state.values.videoEncoder !== ETxrVideoEncoder.x264
                ) {
                    if (payload === ETxrApplicationType.TXR) {
                        state.values.videoEncoder = ETxrVideoEncoder.x264;
                    } else {
                        state.values.videoEncoder = ETxrVideoEncoder.VP8;
                    }
                }
                if (payload === ETxrApplicationType.TXR && state.values.preset !== ETxrPreset.superfast) {
                    state.values.preset = ETxrPreset.superfast;
                }
            })
            .addCase(updateTxr.fulfilled, (state, action) => {
                state.values = txrApiToVideoEncoderMapper(action.payload as IApiTxr);
            })
            .addCase(validateTxr, (state) => {
                //todo kan: fix this
                const requiredFields = [
                    "videoBitrate",
                    "profile",
                    "aspectRatio",
                    "scenecutThreshold",
                    "videoEncoder",
                ] as Array<
                    keyof Pick<
                        ITxrEditVideoEncoder,
                        "videoBitrate" | "profile" | "aspectRatio" | "scenecutThreshold" | "videoEncoder"
                    >
                >;
                requiredFields.forEach((key) => {
                    if (typeof state.values[key] !== "number" && !state.values[key]) {
                        if (state.errors[key]) {
                            state.errors[key].error = true;
                            state.errors[key].helperText = EErrorType.required;
                        }
                    }
                });
            })
            .addCase(updateTxr.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    //@ts-ignore
                    errors.forEach((error) => {
                        const field = state.errors[error.key as keyof ITxrEditVideoEncoderErrors];
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
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = txrApiToVideoEncoderMapper(action.payload as IApiTxr);
            });
    },
});
export default txrEditVideoEncoderSlice.reducer;
