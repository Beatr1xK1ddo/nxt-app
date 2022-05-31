import {IApiIpbe} from "@nxt-ui/cp/api";
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
import {fetchIpbe, IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditVideoEncoderTabState} from "./types";
import {ipbeEditFormVideoEncoderMapper, videoEncoderErrorState} from "./utils";

const IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/videoEncoder`;

const initialState: IIpbeEditVideoEncoderTabState = {
    errors: videoEncoderErrorState,
    values: {
        preset: EIpbePreset.default,
        profile: EIpbeProfile.main,
        level: EIpbeLevel["4.0"],
        vbitrate: 2000,
        vbvMaxrate: 2000,
        vbvBufsize: 2000,
        aspectRatio: EIpbeAspectRatio["not set"],
        keyint: 30,
        bframes: 2,
        lookahead: 5,
        openGop: false,
        bFrameAdaptive: EIpbeBFrameAdaptive.disabled,
        interlaced: EIpbeInterlaced.auto,
        cbr: false,
        intraRefresh: false,
    },
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME,
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
            state.values.vbitrate = action.payload;
        },
        changeVBVMaxrate(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.vbvMaxrateError.error = true;
                state.errors.vbvMaxrateError.helperText = EErrorType.required;
            }

            if (state.errors.vbvMaxrateError.error && action.payload) {
                state.errors.vbvMaxrateError.error = false;
                delete state.errors.vbvMaxrateError.helperText;
            }

            if (!action.payload) {
                state.values.vbvMaxrate = undefined;
            } else {
                state.values.vbvMaxrate = action.payload;
            }
        },
        changeVBVBufsize(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.vbvBufsizeError.error = true;
                state.errors.vbvBufsizeError.helperText = EErrorType.required;
            }

            if (state.errors.vbvBufsizeError.error && action.payload) {
                state.errors.vbvBufsizeError.error = false;
                delete state.errors.vbvBufsizeError.helperText;
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
                state.errors.keyintError.error = true;
                state.errors.keyintError.helperText = EErrorType.required;
            }

            if (state.errors.keyintError.error && action.payload) {
                state.errors.keyintError.error = false;
                delete state.errors.keyintError.helperText;
            }

            if (typeof action.payload !== "number" || isNaN(action.payload)) {
                state.values.keyint = undefined;
            } else {
                state.values.keyint = action.payload;
            }
        },
        changeBframes(state, action: PayloadAction<number | undefined>) {
            if (!action.payload) {
                state.errors.bframesError.error = true;
                state.errors.bframesError.helperText = EErrorType.required;
            }

            if (state.errors.bframesError.error && action.payload) {
                state.errors.bframesError.error = false;
                delete state.errors.bframesError.helperText;
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
                state.errors.lookaheadError.error = true;
                state.errors.lookaheadError.helperText = EErrorType.required;
            }

            if (state.errors.lookaheadError.error && action.payload) {
                state.errors.lookaheadError.error = false;
                delete state.errors.lookaheadError.helperText;
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
                state.errors.scenecutThresholdError.error = true;
                state.errors.scenecutThresholdError.helperText = EErrorType.required;
            }

            if (
                state.errors.scenecutThresholdError.error &&
                typeof action.payload === "number" &&
                !isNaN(action.payload)
            ) {
                state.errors.scenecutThresholdError.error = false;
                delete state.errors.scenecutThresholdError.helperText;
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
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditFormVideoEncoderMapper(action.payload);
        });
    },
});

export default ipbeEditMainFormSlice.reducer;
