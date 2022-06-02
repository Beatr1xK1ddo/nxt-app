import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {
    EErrorType,
    EIpbeAspectRatio,
    EIpbeBFrameAdaptive,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
} from "@nxt-ui/cp/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIpbeEditVideoEncoderErrors, IIpbeEditVideoEncoderState} from "./types";
import {ipbeEditVideoEncoderMapper, videoEncoderErrorState} from "./utils";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";

export const IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME = "videoEncoder";

const initialState: IIpbeEditVideoEncoderState = {
    values: {
        videoEncoder: EIpbeVideoEncoder.AVC1,
        preset: EIpbePreset.fast,
        profile: EIpbeProfile.high,
        level: EIpbeLevel["4.0"],
        videoBitrate: undefined,
        vbvMaxrate: 0,
        vbvBufsize: 0,
        aspectRatio: EIpbeAspectRatio["16:9"],
        keyint: 0,
        bframes: 0,
        maxRefs: 0,
        lookahead: 0,
        openGop: false,
        bFrameAdaptive: EIpbeBFrameAdaptive.fast,
        scenecutThreshold: 0,
        interlaced: EIpbeInterlaced.auto,
        cbr: false,
        intraRefresh: false,
        threads: 2,
    },
    errors: videoEncoderErrorState,
};

export const ipbeEditVideoEncoderSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        changeVideoEncoder(state, action: PayloadAction<EIpbeVideoEncoder>) {
            state.values.videoEncoder = action.payload;
        },
        changePreset(state, action: PayloadAction<EIpbePreset>) {
            state.values.preset = action.payload;
        },
        changeProfile(state, action: PayloadAction<EIpbeProfile>) {
            state.values.profile = action.payload;
        },
        changeLevel(state, action: PayloadAction<EIpbeLevel>) {
            state.values.level = action.payload;
        },
        changeVBitrate(state, action: PayloadAction<number>) {
            // check
            if (state.errors.videoBitrate.error && action.payload) {
                state.errors.videoBitrate.error = false;
                delete state.errors.videoBitrate.helperText;
            }

            state.values.videoBitrate = action.payload;
        },
        changeVBVMaxrate(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.vbvMaxrate.error = true;
                state.errors.vbvMaxrate.helperText = EErrorType.required;
            }

            if (state.errors.vbvMaxrate.error && action.payload) {
                state.errors.vbvMaxrate.error = false;
                delete state.errors.vbvMaxrate.helperText;
            }

            if (!action.payload) {
                state.values.vbvMaxrate = undefined;
            } else {
                state.values.vbvMaxrate = action.payload;
            }
        },
        changeVBVBufsize(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.vbvBufsize.error = true;
                state.errors.vbvBufsize.helperText = EErrorType.required;
            }

            if (state.errors.vbvBufsize.error && action.payload) {
                state.errors.vbvBufsize.error = false;
                delete state.errors.vbvBufsize.helperText;
            }

            if (!action.payload) {
                state.values.vbvBufsize = undefined;
            } else {
                state.values.vbvBufsize = action.payload;
            }
        },
        changeAspectRatio(state, action: PayloadAction<EIpbeAspectRatio>) {
            state.values.aspectRatio = action.payload;
        },
        changeKeyint(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.keyint.error = true;
                state.errors.keyint.helperText = EErrorType.required;
            }

            if (state.errors.keyint.error && action.payload) {
                state.errors.keyint.error = false;
                delete state.errors.keyint.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.keyint = undefined;
            } else {
                state.values.keyint = action.payload;
            }
        },
        changeBframes(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.bframes.error = true;
                state.errors.bframes.helperText = EErrorType.required;
            }

            if (state.errors.bframes.error && action.payload) {
                state.errors.bframes.error = false;
                delete state.errors.bframes.helperText;
            }

            if (!action.payload) {
                state.values.bframes = undefined;
            } else {
                state.values.bframes = action.payload;
            }
        },
        changeMaxRefs(state, action: PayloadAction<number | undefined>) {
            if (!action.payload && typeof action.payload !== "number") {
                state.values.maxRefs = undefined;
            } else {
                state.values.maxRefs = action.payload;
            }
        },
        changeLookahead(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.lookahead.error = true;
                state.errors.lookahead.helperText = EErrorType.required;
            }

            if (state.errors.lookahead.error && action.payload) {
                state.errors.lookahead.error = false;
                delete state.errors.lookahead.helperText;
            }

            if (!action.payload) {
                state.values.lookahead = undefined;
            } else {
                state.values.lookahead = action.payload;
            }
        },
        changeOpenGop(state) {
            state.values.openGop = !state.values.openGop;
        },
        changeCbr(state) {
            state.values.cbr = !state.values.cbr;
        },
        changeIntraRefresh(state) {
            state.values.intraRefresh = !state.values.intraRefresh;
        },
        changeBFrameAdaptive(state, action: PayloadAction<EIpbeBFrameAdaptive>) {
            state.values.bFrameAdaptive = action.payload;
        },
        changeScenecutThreshold(state, action: PayloadAction<number | undefined>) {
            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.errors.scenecutThreshold.error = true;
                state.errors.scenecutThreshold.helperText = EErrorType.required;
            }

            if (state.errors.scenecutThreshold.error && typeof action.payload === "number" && !isNaN(action.payload)) {
                state.errors.scenecutThreshold.error = false;
                delete state.errors.scenecutThreshold.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.scenecutThreshold = undefined;
            } else {
                state.values.scenecutThreshold = action.payload;
            }
        },
        changeInterlaced(state, action: PayloadAction<EIpbeInterlaced>) {
            state.values.interlaced = action.payload;
        },
        changeThread(state, action: PayloadAction<number>) {
            state.values.threads = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.rejected, (state, action) => {
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
            })
            .addCase(createIpbe.rejected, (state, action) => {
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
            })
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values = ipbeEditVideoEncoderMapper(action.payload);
            });
    },
});

export default ipbeEditVideoEncoderSlice.reducer;
