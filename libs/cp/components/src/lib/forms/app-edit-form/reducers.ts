import {
    EAspectRatio,
    EBFrameAdaptive,
    EEncoderVersion,
    EErrorType,
    EInterlaced,
    ELatency,
    ELevel,
    EMuxer,
    EOutputType,
    EPreset,
    EProfile,
    EIpbeVideoConnection,
    EVideoEncoder,
    EIpbeEncoderVideoFormat,
    ValueOf,
} from "@nxt-ui/cp/types";
import {createAction, createReducer, PayloadAction} from "@reduxjs/toolkit";
import {IOutputIpPayload, IOutputPortPayload} from "./types";
import {EApplicationType, IAudioChannels, IIpbe} from "@nxt-ui/cp/api";
import {stringIpMask} from "@nxt-ui/cp/utils";

export enum ETabs {
    main = "main",
}

export enum EMainFormError {
    name = "nameError",
    node = "nodeError",
    company = "companyError",
    applicationType = "applicationTypeError",
    videoConnection = "videoConnectionError",
    videoOutputIp = "videoOutputIpError",
    videoOutputPort = "videoOutputPortError",
    audioOutputIp = "audioOutputIpError",
    audioOutputPort = "audioOutputPortError",
    encoderVersion = "encoderVersionError",
    inputFormat = "inputFormatError",
    latency = "latencyError",
    outputType = "outputTypeError",
}

export enum EVideoEncoderFormError {
    videoEncoder = "videoEncoderError",
    preset = "presetError",
    profile = "profileError",
    level = "levelError",
    vbitrate = "vbitrateError",
    vbvMaxrate = "vbvMaxrateError",
    vbvBufsize = "vbvBufsizeError",
    aspectRatio = "aspectRatioError",
    keyint = "keyintError",
    bframes = "bframesError",
    maxRefs = "maxRefsError",
    lookahead = "lookaheadError",
    openGop = "openGopError",
    bFrameAdaptive = "bFrameAdaptiveError",
    scenecutThreshold = "scenecutThresholdError",
    interlaced = "interlacedError",
    cbr = "cbrError",
    intraRefresh = "intraRefreshError",
}

export enum EMpegTsMuxerFormError {
    muxer = "muxerError",
    muxrate = "muxrateError",
    serviceName = "serviceNameError",
    serviceProvider = "serviceProviderError",
    programNumber = "programNumberError",
    videoPid = "videoPidError",
    pmtPid = "pmtPidError",
    pmtPeriod = "pmtPeriodError",
    pcrPid = "pcrPidError",
    pcrPeriod = "pcrPeriodError",
    tsId = "tsIdError",
    addScte = "addScteError",
    ipbeAudioEncoders = "ipbeAudioEncodersError",
}

export enum ERTPMuxerError {
    videoPt = "videoPtError",
    audioPt = "audioPtError",
}

export type IRTPMuxer = {
    [key in ERTPMuxerError]: IFormError;
};

export type IDestinationError = {
    outputIp: IFormError;
    ttl: IFormError;
    outputPort: IFormError;
};

// may be not needed ??
export type IAudioChannelError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

const mainErrorState: IFormRootState["errors"]["main"] = Object.values(EMainFormError).reduce((obj: any, key) => {
    obj[key] = {
        error: false,
    };
    return obj;
}, {});

const videoEncoderErrorState: IFormRootState["errors"]["videoEncoder"] = Object.values(EVideoEncoderFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

const mpegTsMuxerErrorState: IFormRootState["errors"]["mpegTsMuxer"] = Object.values(EMpegTsMuxerFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

const rtpMuxerErrorState: IFormRootState["errors"]["rtpMuxer"] = Object.values(
    ERTPMuxerError
).reduce((obj: any, key) => {
    obj[key] = {
        error: false,
    };
    return obj;
}, {});

const ipbeAudioChannelErrorGenerator = () => {
    const result: IAudioChannelError = [
        "codec",
        "bitrate",
        "sdiPair",
        "ac3DialogueLevel",
        "channels",
        "language",
    ].reduce((obj: any, key) => {
        obj[key] = {
            error: false,
        };

        return obj;
    }, {});

    return result;
};

const ipbeDestinationErrorGenerator = () => {
    const result: IDestinationError = ["outputIp", "ttl", "outputPort"].reduce((obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    }, {});

    return result;
};

export type IFormError = {
    error: boolean;
    helperText?: EErrorType;
};

export type IFormErrorState<T extends string> = {
    [key in T]: IFormError;
};

export type IErrorPayload = {tab: ETabs; field: EFormError; text?: EErrorType};

export type EFormError = EMainFormError;

export type IMpegTsMuxerErrorState = {
    [key in EMpegTsMuxerFormError]: IFormError;
};

export type IVideoEncoderErrorState = {
    [key in EVideoEncoderFormError]: IFormError;
};

export type IMainErrorState = {
    [key in EMainFormError]: IFormError;
} & {
    ipbeDestinations?: IDestinationError[];
    ipbeAudioEncoders?: IAudioChannelError[];
};

export type IFormRootState = {
    values?: Partial<IIpbe>;
    errors: {
        main: IMainErrorState;
        videoEncoder: IVideoEncoderErrorState;
        mpegTsMuxer: IMpegTsMuxerErrorState;
        rtpMuxer: IRTPMuxer;
    };
};

export const initialState: IFormRootState = {
    errors: {
        main: mainErrorState,
        videoEncoder: videoEncoderErrorState,
        mpegTsMuxer: mpegTsMuxerErrorState,
        rtpMuxer: rtpMuxerErrorState,
    },
};

export const setInitialState = createAction<IIpbe>("SET_INITIAL_STATE");

export const changeCompany = createAction<number>("CHANGE_COMPANY");

export const changeNode = createAction<number>("CHANGE_NODE");

export const changeName = createAction<string>("CHANGE_NAME");

export const addNewAudioEncoder = createAction<Omit<IAudioChannels, "id">, "ADD_NEW_AUDIOENCODER">(
    "ADD_NEW_AUDIOENCODER"
);

export const deleteAudioEncoder = createAction<number, "DELETE_AUDIOENCODER">(
    "DELETE_AUDIOENCODER"
);

export const changeVideoEncoder = createAction<EVideoEncoder, "CHANGE_VIDEO_ENCODER">(
    "CHANGE_VIDEO_ENCODER"
);

export const changePreset = createAction<EPreset, "CHANGE_PRESET">("CHANGE_PRESET");

export const changeProfile = createAction<EProfile, "CHANGE_PROFILE">("CHANGE_PROFILE");

export const changeLevel = createAction<ValueOf<typeof ELevel>, "CHANGE_LEVEL">("CHANGE_LEVEL");

export const changeVBitrate = createAction<number, "CHANGE_VBITRATE">("CHANGE_VBITRATE");

export const changeVBVMaxrate = createAction<number, "CHANGE_VBVMAXRATE">("CHANGE_VBVMAXRATE");

export const changeVBVBufsize = createAction<number, "CHANGE_VBVBUFSIZE">("CHANGE_VBVBUFSIZE");

export const changeBframes = createAction<number, "CHANGE_BFRAMES">("CHANGE_BFRAMES");

export const changeMaxRefs = createAction<number, "CHANGE_MAX_REF">("CHANGE_MAX_REF");

export const changeLookahead = createAction<number, "CHANGE_LOOKAHEAD">("CHANGE_LOOKAHEAD");

export const changeBFrameAdaptive = createAction<
    keyof typeof EBFrameAdaptive,
    "CHANGE_BFRAMEADAPTIVE"
>("CHANGE_BFRAMEADAPTIVE");

export const changeInterlaced = createAction<keyof typeof EInterlaced, "CHANGE_INTERLANCED">(
    "CHANGE_INTERLANCED"
);

export const changeKeyint = createAction<number, "CHANGE_KEYINT">("CHANGE_KEYINT");

export const changeScenecutThreshold = createAction<number, "CHANGE_SCENICUT_TRESHOLD">(
    "CHANGE_SCENICUT_TRESHOLD"
);

export const changeAspectRatio = createAction<EAspectRatio, "CHANGE_ASPECT_RATIO">(
    "CHANGE_ASPECT_RATIO"
);

//MpegTsMuxer
export const changeMuxer = createAction<EMuxer, "CHANGE_MUXER">("CHANGE_MUXER");

export const changeMuxrate = createAction<string, "CHANGE_MUXRATE">("CHANGE_MUXRATE");

export const changeServiceName = createAction<string, "CHANGE_SERVICE_NAME">("CHANGE_SERVICE_NAME");

export const changeProgramNumber = createAction<number, "CHANGE_PROGRAM_NUMBER">(
    "CHANGE_PROGRAM_NUMBER"
);

export const changeServiceProvider = createAction<string, "CHANGE_SERVICE_PROVIDER">(
    "CHANGE_SERVICE_PROVIDER"
);

export const changePmtPid = createAction<number, "CHANGE_PMT_PID">("CHANGE_PMT_PID");

export const changeVideoPid = createAction<string, "CHANGE_VIDEO_PID">("CHANGE_VIDEO_PID");

export const changePmtPeriod = createAction<number, "CHANGE_PMT_PERIOD">("CHANGE_PMT_PERIOD");

export const changePcrPid = createAction<number, "CHANGE_PCR_PID">("CHANGE_PCR_PID");

export const changePcrPeriod = createAction<number, "CHANGE_PCR_PERIOD">("CHANGE_PCR_PERIOD");

export const changeTsId = createAction<number, "CHANGE_TS_ID">("CHANGE_TS_ID");

export const changeAudioPt = createAction<string, "CHANGE_AUDIO_PT">("CHANGE_AUDIO_PT");

export const changeVideoPt = createAction<string, "CHANGE_VIDEO_PT">("CHANGE_VIDEO_PT");

export const changeAddScte = createAction<string, "CHANGE_ADD_SCTE">("CHANGE_ADD_SCTE");

export const changeAudioPid = createAction<string, "CHANGE_AUDIO_PID">("CHANGE_AUDIO_PID");

export const sendForm = createAction("SEND_FORM");

export const changeEncoder = createAction<keyof typeof EEncoderVersion, "CHANGE_ENCODER_VERSION">(
    "CHANGE_ENCODER_VERSION"
);

export const changeVideoOutputIp = createAction<string, "CHANGE_VIDEO_OUTPUT_IP">(
    "CHANGE_VIDEO_OUTPUT_IP"
);

export const changeAudioOutputIp = createAction<string, "CHANGE_AUDIO_OUTPUT_IP">(
    "CHANGE_AUDIO_OUTPUT_IP"
);

export const changeAudioOutputPort = createAction<number, "CHANGE_AUDIO_OUTPUT_PORT">(
    "CHANGE_AUDIO_OUTPUT_PORT"
);

export const changeVideoOutputPort = createAction<number, "CHANGE_VIDEO_OUTPUT_PORT">(
    "CHANGE_VIDEO_OUTPUT_PORT"
);

export const changeOutputIp = createAction<IOutputIpPayload, "CHANGE_OUTPUT_IP">(
    "CHANGE_OUTPUT_IP"
);

export const changeOutputPort = createAction<IOutputPortPayload, "CHANGE_OUTPUT_PORT">(
    "CHANGE_OUTPUT_PORT"
);

export const changeInputFormat = createAction<EIpbeEncoderVideoFormat, "CHANGE_INPUT_FORMAT">(
    "CHANGE_INPUT_FORMAT"
);

export const changeApplication = createAction<EApplicationType, "CHANGE_APPLICATION_TYPE">(
    "CHANGE_APPLICATION_TYPE"
);

export const changeOutputType = createAction<EOutputType, "CHANGE_OUTPUT_TYPE">(
    "CHANGE_OUTPUT_TYPE"
);

export const changeLatency = createAction<ELatency, "CHANGE_LATENCY">("CHANGE_LATENCY");

export const setError = createAction<IErrorPayload, "SET_ERROR">("SET_ERROR");

export const removeError = createAction<IErrorPayload, "REMOVE_ERROR">("REMOVE_ERROR");

export const changeTtl = createAction<IOutputPortPayload, "CHANGE_TTL">("CHANGE_TTL");

export const changeVideoConnection = createAction<EIpbeVideoConnection, "CHANGE_VIDEO_CONNECTION">(
    "CHANGE_VIDEO_CONNECTION"
);

export const reducer = createReducer<IFormRootState>(initialState, {
    [addNewAudioEncoder.type]: (state, action: PayloadAction<Omit<IAudioChannels, "id">>) => {
        state.values?.ipbeAudioEncoders?.push(action.payload);
    },
    [deleteAudioEncoder.type]: (state, action: PayloadAction<number>) => {
        if (!state.values?.ipbeAudioEncoders) {
            return;
        }
        state.values.ipbeAudioEncoders = state.values?.ipbeAudioEncoders?.filter(
            (_, i) => i !== action.payload
        );
        console.log("state.values?.ipbeAudioEncoders", action.payload);
    },
    [changeAspectRatio.type]: (state, action: PayloadAction<EAspectRatio>) => {
        if (!state.values) {
            return;
        }
        state.values.aspectRatio = action.payload;
    },
    [changeMuxrate.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.muxrate = action.payload;
    },
    [changeAudioPt.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.audioPt = action.payload;
    },
    [changeVideoPt.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.videoPt = action.payload;
    },
    [changeAddScte.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.addScte = action.payload;
    },
    [changePmtPeriod.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }
        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.pmtPeriod = undefined;
        } else {
            state.values.pmtPeriod = action.payload;
        }
    },
    [changeVideoPid.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.videoPid = action.payload;
    },
    [changeServiceName.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.serviceName = action.payload;
    },
    [changeServiceProvider.type]: (state, action: PayloadAction<string>) => {
        if (!state.values) {
            return;
        }
        state.values.serviceProvider = action.payload;
    },
    [changeMuxer.type]: (state, action: PayloadAction<EMuxer>) => {
        if (!state.values) {
            return;
        }
        state.values.muxer = action.payload;
    },
    [changePreset.type]: (state, action: PayloadAction<EPreset>) => {
        if (state.values) {
            state.values.preset = action.payload;
        }
    },
    [changeMaxRefs.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload && typeof action.payload !== "number") {
            state.values.maxRefs = undefined;
        } else {
            state.values.maxRefs = action.payload;
        }
    },
    [changeKeyint.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload) {
            state.errors.videoEncoder.keyintError.error = true;
            state.errors.videoEncoder.keyintError.helperText = EErrorType.required;
        }

        if (state.errors.videoEncoder.keyintError.error && action.payload) {
            state.errors.videoEncoder.keyintError.error = false;
            delete state.errors.videoEncoder.keyintError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.keyint = undefined;
        } else {
            state.values.keyint = action.payload;
        }
    },
    [changeProgramNumber.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.mpegTsMuxer.programNumberError.error = true;
            state.errors.mpegTsMuxer.programNumberError.helperText = EErrorType.required;
        }

        if (
            state.errors.mpegTsMuxer.programNumberError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.mpegTsMuxer.programNumberError.error = false;
            delete state.errors.mpegTsMuxer.programNumberError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.programNumber = undefined;
        } else {
            state.values.programNumber = action.payload;
        }
    },
    [changeTsId.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.mpegTsMuxer.tsIdError.error = true;
            state.errors.mpegTsMuxer.tsIdError.helperText = EErrorType.required;
        }

        if (
            state.errors.mpegTsMuxer.tsIdError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.mpegTsMuxer.tsIdError.error = false;
            delete state.errors.mpegTsMuxer.tsIdError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.tsId = undefined;
        } else {
            state.values.tsId = action.payload;
        }
    },
    [changePcrPid.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.mpegTsMuxer.pcrPidError.error = true;
            state.errors.mpegTsMuxer.pcrPidError.helperText = EErrorType.required;
        }

        if (
            state.errors.mpegTsMuxer.pcrPidError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.mpegTsMuxer.pcrPidError.error = false;
            delete state.errors.mpegTsMuxer.pcrPidError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.pcrPid = undefined;
        } else {
            state.values.pcrPid = action.payload;
        }
    },
    [changePcrPeriod.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.mpegTsMuxer.pcrPeriodError.error = true;
            state.errors.mpegTsMuxer.pcrPeriodError.helperText = EErrorType.required;
        }

        if (
            state.errors.mpegTsMuxer.pcrPeriodError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.mpegTsMuxer.pcrPeriodError.error = false;
            delete state.errors.mpegTsMuxer.pcrPeriodError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.pcrPeriod = undefined;
        } else {
            state.values.pcrPeriod = action.payload;
        }
    },
    [changePmtPid.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.mpegTsMuxer.pmtPidError.error = true;
            state.errors.mpegTsMuxer.pmtPidError.helperText = EErrorType.required;
        }

        if (
            state.errors.mpegTsMuxer.pmtPidError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.mpegTsMuxer.pmtPidError.error = false;
            delete state.errors.mpegTsMuxer.pmtPidError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.pmtPid = undefined;
        } else {
            state.values.pmtPid = action.payload;
        }
    },
    [changeScenecutThreshold.type]: (state, action: PayloadAction<number>) => {
        if (!state.values) {
            return;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.errors.videoEncoder.scenecutThresholdError.error = true;
            state.errors.videoEncoder.scenecutThresholdError.helperText = EErrorType.required;
        }

        if (
            state.errors.videoEncoder.scenecutThresholdError.error &&
            typeof action.payload === "number" &&
            !isNaN(action.payload)
        ) {
            state.errors.videoEncoder.scenecutThresholdError.error = false;
            delete state.errors.videoEncoder.scenecutThresholdError.helperText;
        }

        if (typeof action.payload !== "number" || isNaN(action.payload)) {
            state.values.scenecutThreshold = undefined;
        } else {
            state.values.scenecutThreshold = action.payload;
        }
    },
    [changeLookahead.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload) {
            state.errors.videoEncoder.lookaheadError.error = true;
            state.errors.videoEncoder.lookaheadError.helperText = EErrorType.required;
        }

        if (state.errors.videoEncoder.lookaheadError.error && action.payload) {
            state.errors.videoEncoder.lookaheadError.error = false;
            delete state.errors.videoEncoder.lookaheadError.helperText;
        }

        if (!action.payload) {
            state.values.lookahead = undefined;
        } else {
            state.values.lookahead = action.payload;
        }
    },
    [changeBframes.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload) {
            state.errors.videoEncoder.bframesError.error = true;
            state.errors.videoEncoder.bframesError.helperText = EErrorType.required;
        }

        if (state.errors.videoEncoder.bframesError.error && action.payload) {
            state.errors.videoEncoder.bframesError.error = false;
            delete state.errors.videoEncoder.bframesError.helperText;
        }

        if (!action.payload) {
            state.values.bframes = undefined;
        } else {
            state.values.bframes = action.payload;
        }
    },
    [changeVBVBufsize.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload) {
            state.errors.videoEncoder.vbvBufsizeError.error = true;
            state.errors.videoEncoder.vbvBufsizeError.helperText = EErrorType.required;
        }

        if (state.errors.videoEncoder.vbvBufsizeError.error && action.payload) {
            state.errors.videoEncoder.vbvBufsizeError.error = false;
            delete state.errors.videoEncoder.vbvBufsizeError.helperText;
        }

        if (!action.payload) {
            state.values.vbvBufsize = undefined;
        } else {
            state.values.vbvBufsize = action.payload;
        }
    },
    [changeVBVMaxrate.type]: (state, action: PayloadAction<number | undefined>) => {
        if (!state.values) {
            return;
        }

        if (!action.payload) {
            state.errors.videoEncoder.vbvMaxrateError.error = true;
            state.errors.videoEncoder.vbvMaxrateError.helperText = EErrorType.required;
        }

        if (state.errors.videoEncoder.vbvMaxrateError.error && action.payload) {
            state.errors.videoEncoder.vbvMaxrateError.error = false;
            delete state.errors.videoEncoder.vbvMaxrateError.helperText;
        }

        if (!action.payload) {
            state.values.vbvMaxrate = undefined;
        } else {
            state.values.vbvMaxrate = action.payload;
        }
    },
    [changeLevel.type]: (state, action: PayloadAction<ValueOf<typeof ELevel>>) => {
        if (state.values) {
            state.values.level = action.payload;
        }
    },
    [changeVBitrate.type]: (state, action: PayloadAction<number>) => {
        if (state.values) {
            console.log("state.values.vbitrate", typeof action.payload);
            state.values.vbitrate = action.payload;
        }
    },
    [changeProfile.type]: (state, action: PayloadAction<EProfile>) => {
        if (state.values) {
            state.values.profile = action.payload;
        }
    },
    [changeVideoEncoder.type]: (state, action: PayloadAction<EVideoEncoder>) => {
        if (state.values) {
            state.values.videoEncoder = action.payload;
        }
    },
    [changeBFrameAdaptive.type]: (state, action: PayloadAction<keyof typeof EBFrameAdaptive>) => {
        if (!state.values) {
            return;
        }
        state.values.bFrameAdaptive = EBFrameAdaptive[action.payload];
    },
    [changeInterlaced.type]: (state, action: PayloadAction<keyof typeof EInterlaced>) => {
        if (!state.values) {
            return;
        }
        state.values.interlaced = EInterlaced[action.payload];
    },
    [setInitialState.type]: (state, action: PayloadAction<IIpbe>) => {
        state.values = action.payload;

        if (action.payload.ipbeDestinations.length) {
            state.errors.main.ipbeDestinations = [];
            action.payload.ipbeDestinations.forEach(() => {
                const destination = ipbeDestinationErrorGenerator();
                state.errors.main.ipbeDestinations?.push(destination);
            });
        }

        if (action.payload.ipbeAudioEncoders.length) {
            state.errors.main.ipbeAudioEncoders = [];
            action.payload.ipbeAudioEncoders.forEach(() => {
                const audiochanel = ipbeAudioChannelErrorGenerator();
                state.errors.main.ipbeAudioEncoders?.push(audiochanel);
            });
        }
    },
    [setError.type]: (state, action: PayloadAction<IErrorPayload>) => {
        const {tab, field, text} = action.payload;
        state.errors[tab][field].error = true;
        state.errors[tab][field].helperText = text;
    },
    [removeError.type]: (state, action: PayloadAction<IErrorPayload>) => {
        const {tab, field} = action.payload;
        state.errors[tab][field].error = false;
        state.errors[tab][field].helperText = undefined;
    },
    [changeName.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.name = payload;
        }

        if (!payload) {
            state.errors.main.nameError.error = true;
            state.errors.main.nameError.helperText = EErrorType.required;
        }
    },
    [changeCompany.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.company = payload;
        }
    },
    [changeNode.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.node = payload;
        }
    },
    [changeVideoConnection.type]: (state, action: PayloadAction<EIpbeVideoConnection>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoConnection = payload;
        }
    },
    [changeEncoder.type]: (state, action: PayloadAction<keyof typeof EEncoderVersion>) => {
        const {payload} = action;
        if (state.values) {
            state.values.encoderVersion = payload;
        }
    },
    [changeApplication.type]: (state, action: PayloadAction<EApplicationType>) => {
        const {payload} = action;
        if (state.values) {
            state.values.applicationType = payload;
        }
    },
    [changeInputFormat.type]: (state, action: PayloadAction<EIpbeEncoderVideoFormat>) => {
        const {payload} = action;
        if (state.values) {
            state.values.inputFormat = payload;
        }
    },
    [changeOutputType.type]: (state, action: PayloadAction<EOutputType>) => {
        const {payload} = action;
        if (state.values) {
            state.values.outputType = payload;
        }
    },
    [changeLatency.type]: (state, action: PayloadAction<ELatency>) => {
        const {payload} = action;
        if (state.values) {
            state.values.latency = payload;
        }
    },
    [changeVideoOutputIp.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoOutputIp = payload;
        }
    },
    [changeVideoOutputPort.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.videoOutputPort = payload;
        }
    },
    [changeAudioOutputPort.type]: (state, action: PayloadAction<number>) => {
        const {payload} = action;
        if (state.values) {
            state.values.audioOutputPort = payload;
        }
    },
    [changeAudioOutputIp.type]: (state, action: PayloadAction<string>) => {
        const {payload} = action;
        if (state.values) {
            state.values.audioOutputIp = payload;
        }
    },
    [changeOutputIp.type]: (state, action: PayloadAction<IOutputIpPayload>) => {
        const {payload} = action;
        const isValid = stringIpMask(payload.value);
        let itemIndex;
        const item = state.values?.ipbeDestinations?.find((item, index) => {
            if (item.id === payload.id) {
                itemIndex = index;
            }
            return item.id === payload.id;
        });

        if (!item || (!itemIndex && typeof itemIndex !== "number")) {
            return;
        }

        if (!isValid && state.errors.main.ipbeDestinations?.length) {
            state.errors.main.ipbeDestinations[itemIndex].outputIp.error = true;
            state.errors.main.ipbeDestinations[itemIndex].outputIp.helperText = EErrorType.badIp;
        }

        if (state.errors.main.ipbeDestinations?.[itemIndex].outputIp.error && isValid) {
            state.errors.main.ipbeDestinations[itemIndex].outputIp.error = false;
            delete state.errors.main.ipbeDestinations[itemIndex].outputIp.helperText;
        }

        item.outputIp = payload.value;
    },
    [changeOutputPort.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
        const {payload} = action;
        const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
        if (!item) {
            return;
        }
        item.outputPort = payload.value;
    },
    [changeTtl.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
        const {payload} = action;
        const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
        if (!item) {
            return;
        }
        item.ttl = payload.value;
    },
});
