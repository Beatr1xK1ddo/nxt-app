import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIpbeEditAdvancedTabState} from "./types";

const IPBE_EDIT_ADVANCED_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/audioEncoders`;

const initialState: IIpbeEditAdvancedTabState = {
    errors: {slateImage: {error: false}},
    values: {},
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_ADVANCED_SLICE_NAME,
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
    },
});

export default ipbeEditMainFormSlice.reducer;
// export const reducer = createReducer<IFormRootState>(initialState, {
//     [changeCbr.type]: (state) => {
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.cbr = !state.values.cbr;
//         }
//     },
//     [addNewAudioChannel.type]: (state) => {
//         if (state.values?.ipbeAudioEncoders) {
//             state.errors.audioEncoder.push(ipbeAudioChannelErrorGenerator());
//             state.values.ipbeAudioEncoders.push(ipbeAudioChannelGenerator());
//         }
//     },
//     [changeLanguage.type]: (state, action: PayloadAction<{id: number; value: string}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].language = value;
//         }
//     },
//     [changeChannel.type]: (state, action: PayloadAction<{id: number; value: keyof typeof EChannels}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].channels = value;
//         }
//     },
//     [changeChannel.type]: (state, action: PayloadAction<{id: number; value: keyof typeof EChannels}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].channels = value;
//         }
//     },
//     [changeSdiPair.type]: (state, action: PayloadAction<{id: number; value: number}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].sdiPair = value;
//         }
//     },
//     [changeAc3DialogueLevel.type]: (state, action: PayloadAction<{id: number; value: number}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].ac3DialogueLevel = value;
//         }
//     },
//     [changeBitrate.type]: (state, action: PayloadAction<{id: number; value: number}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].bitrate = value;
//         }
//     },
//     [changeCodec.type]: (state, action: PayloadAction<{id: number; value: ECodec}>) => {
//         const {id, value} = action.payload;
//         if (state.values?.ipbeAudioEncoders) {
//             state.values.ipbeAudioEncoders[id].codec = value;
//         }
//     },
//     [addNewAudioEncoder.type]: (state, action: PayloadAction<Omit<IAudioChannels, "id">>) => {
//         state.values?.ipbeAudioEncoders?.push(action.payload);
//     },
//     [changeSlateImage.type]: (state, action: PayloadAction<string>) => {
//         if (state.values) {
//             state.values.slateImage = action.payload;
//         }
//     },
//     [deleteSlateImage.type]: (state) => {
//         if (state.values) {
//             state.values.slateImage = undefined;
//         }
//     },
//     [changeEnableSlateIfNoSignal.type]: (state) => {
//         if (state.values) {
//             state.values.enableSlateIfNoSignal = !state.values.enableSlateIfNoSignal;
//         }
//     },
//     [changeEnablePreviewImages.type]: (state) => {
//         if (state.values) {
//             state.values.enablePreviewImages = !state.values.enablePreviewImages;
//         }
//     },
//     [changeEnableLoopback.type]: (state) => {
//         if (state.values) {
//             state.values.enableLoopback = !state.values.enableLoopback;
//         }
//     },
//     [changeRestartOnError.type]: (state) => {
//         if (state.values) {
//             state.values.restartOnError = !state.values.restartOnError;
//         }
//     },
//     [changeRunMonitor.type]: (state) => {
//         if (state.values) {
//             state.values.runMonitor = !state.values.runMonitor;
//         }
//     },
//     [changeEnablePsfEncoding.type]: (state) => {
//         if (state.values) {
//             state.values.enablePsfEncoding = !state.values.enablePsfEncoding;
//         }
//     },
//     [changeAddTimecode.type]: (state) => {
//         if (state.values) {
//             state.values.addTimecode = !state.values.addTimecode;
//         }
//     },
//     [changeIntraRefresh.type]: (state) => {
//         if (state.values) {
//             state.values.intraRefresh = !state.values.intraRefresh;
//         }
//     },
//     [deleteAudioEncoder.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values?.ipbeAudioEncoders) {
//             return;
//         }
//         state.values.ipbeAudioEncoders = state.values?.ipbeAudioEncoders?.filter((_, i) => i !== action.payload);
//         console.log("state.values?.ipbeAudioEncoders", action.payload);
//     },
//     [changeCardIdx.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.cardIdx = action.payload;
//     },
//     [changeAspectRatio.type]: (state, action: PayloadAction<EAspectRatio>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.aspectRatio = action.payload;
//     },
//     [changeMuxrate.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.muxrate = action.payload;
//     },
//     [changeAudioPt.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.audioPt = action.payload;
//     },
//     [changeVideoPt.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.videoPt = action.payload;
//     },
//     [changeAddScte.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.addScte = action.payload;
//     },
//     [changePmtPeriod.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }
//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.pmtPeriod = undefined;
//         } else {
//             state.values.pmtPeriod = action.payload;
//         }
//     },
//     [changeVideoPid.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.videoPid = action.payload;
//     },
//     [changeServiceName.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.serviceName = action.payload;
//     },
//     [changeServiceProvider.type]: (state, action: PayloadAction<string>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.serviceProvider = action.payload;
//     },
//     [changeMuxer.type]: (state, action: PayloadAction<EMuxer>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.muxer = action.payload;
//     },
//     [changePreset.type]: (state, action: PayloadAction<EPreset>) => {
//         if (state.values) {
//             state.values.preset = action.payload;
//         }
//     },
//     [changeMaxRefs.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload && typeof action.payload !== "number") {
//             state.values.maxRefs = undefined;
//         } else {
//             state.values.maxRefs = action.payload;
//         }
//     },
//     [changeKeyint.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload) {
//             state.errors.videoEncoder.keyintError.error = true;
//             state.errors.videoEncoder.keyintError.helperText = EErrorType.required;
//         }

//         if (state.errors.videoEncoder.keyintError.error && action.payload) {
//             state.errors.videoEncoder.keyintError.error = false;
//             delete state.errors.videoEncoder.keyintError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.keyint = undefined;
//         } else {
//             state.values.keyint = action.payload;
//         }
//     },
//     [changeProgramNumber.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.programNumberError.error = true;
//             state.errors.mpegTsMuxer.programNumberError.helperText = EErrorType.required;
//         }

//         if (
//             state.errors.mpegTsMuxer.programNumberError.error &&
//             typeof action.payload === "number" &&
//             !isNaN(action.payload)
//         ) {
//             state.errors.mpegTsMuxer.programNumberError.error = false;
//             delete state.errors.mpegTsMuxer.programNumberError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.programNumber = undefined;
//         } else {
//             state.values.programNumber = action.payload;
//         }
//     },
//     [changeTsId.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.tsIdError.error = true;
//             state.errors.mpegTsMuxer.tsIdError.helperText = EErrorType.required;
//         }

//         if (state.errors.mpegTsMuxer.tsIdError.error && typeof action.payload === "number" && !isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.tsIdError.error = false;
//             delete state.errors.mpegTsMuxer.tsIdError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.tsId = undefined;
//         } else {
//             state.values.tsId = action.payload;
//         }
//     },
//     [changePcrPid.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.pcrPidError.error = true;
//             state.errors.mpegTsMuxer.pcrPidError.helperText = EErrorType.required;
//         }

//         if (
//             state.errors.mpegTsMuxer.pcrPidError.error &&
//             typeof action.payload === "number" &&
//             !isNaN(action.payload)
//         ) {
//             state.errors.mpegTsMuxer.pcrPidError.error = false;
//             delete state.errors.mpegTsMuxer.pcrPidError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.pcrPid = undefined;
//         } else {
//             state.values.pcrPid = action.payload;
//         }
//     },
//     [changePcrPeriod.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.pcrPeriodError.error = true;
//             state.errors.mpegTsMuxer.pcrPeriodError.helperText = EErrorType.required;
//         }

//         if (
//             state.errors.mpegTsMuxer.pcrPeriodError.error &&
//             typeof action.payload === "number" &&
//             !isNaN(action.payload)
//         ) {
//             state.errors.mpegTsMuxer.pcrPeriodError.error = false;
//             delete state.errors.mpegTsMuxer.pcrPeriodError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.pcrPeriod = undefined;
//         } else {
//             state.values.pcrPeriod = action.payload;
//         }
//     },
//     [changePmtPid.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.mpegTsMuxer.pmtPidError.error = true;
//             state.errors.mpegTsMuxer.pmtPidError.helperText = EErrorType.required;
//         }

//         if (
//             state.errors.mpegTsMuxer.pmtPidError.error &&
//             typeof action.payload === "number" &&
//             !isNaN(action.payload)
//         ) {
//             state.errors.mpegTsMuxer.pmtPidError.error = false;
//             delete state.errors.mpegTsMuxer.pmtPidError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.pmtPid = undefined;
//         } else {
//             state.values.pmtPid = action.payload;
//         }
//     },
//     [changeScenecutThreshold.type]: (state, action: PayloadAction<number>) => {
//         if (!state.values) {
//             return;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.errors.videoEncoder.scenecutThresholdError.error = true;
//             state.errors.videoEncoder.scenecutThresholdError.helperText = EErrorType.required;
//         }

//         if (
//             state.errors.videoEncoder.scenecutThresholdError.error &&
//             typeof action.payload === "number" &&
//             !isNaN(action.payload)
//         ) {
//             state.errors.videoEncoder.scenecutThresholdError.error = false;
//             delete state.errors.videoEncoder.scenecutThresholdError.helperText;
//         }

//         if (typeof action.payload !== "number" || isNaN(action.payload)) {
//             state.values.scenecutThreshold = undefined;
//         } else {
//             state.values.scenecutThreshold = action.payload;
//         }
//     },
//     [changeLookahead.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload) {
//             state.errors.videoEncoder.lookaheadError.error = true;
//             state.errors.videoEncoder.lookaheadError.helperText = EErrorType.required;
//         }

//         if (state.errors.videoEncoder.lookaheadError.error && action.payload) {
//             state.errors.videoEncoder.lookaheadError.error = false;
//             delete state.errors.videoEncoder.lookaheadError.helperText;
//         }

//         if (!action.payload) {
//             state.values.lookahead = undefined;
//         } else {
//             state.values.lookahead = action.payload;
//         }
//     },
//     [changeBframes.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload) {
//             state.errors.videoEncoder.bframesError.error = true;
//             state.errors.videoEncoder.bframesError.helperText = EErrorType.required;
//         }

//         if (state.errors.videoEncoder.bframesError.error && action.payload) {
//             state.errors.videoEncoder.bframesError.error = false;
//             delete state.errors.videoEncoder.bframesError.helperText;
//         }

//         if (!action.payload) {
//             state.values.bframes = undefined;
//         } else {
//             state.values.bframes = action.payload;
//         }
//     },
//     [changeVBVBufsize.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload) {
//             state.errors.videoEncoder.vbvBufsizeError.error = true;
//             state.errors.videoEncoder.vbvBufsizeError.helperText = EErrorType.required;
//         }

//         if (state.errors.videoEncoder.vbvBufsizeError.error && action.payload) {
//             state.errors.videoEncoder.vbvBufsizeError.error = false;
//             delete state.errors.videoEncoder.vbvBufsizeError.helperText;
//         }

//         if (!action.payload) {
//             state.values.vbvBufsize = undefined;
//         } else {
//             state.values.vbvBufsize = action.payload;
//         }
//     },
//     [changeVBVMaxrate.type]: (state, action: PayloadAction<number | undefined>) => {
//         if (!state.values) {
//             return;
//         }

//         if (!action.payload) {
//             state.errors.videoEncoder.vbvMaxrateError.error = true;
//             state.errors.videoEncoder.vbvMaxrateError.helperText = EErrorType.required;
//         }

//         if (state.errors.videoEncoder.vbvMaxrateError.error && action.payload) {
//             state.errors.videoEncoder.vbvMaxrateError.error = false;
//             delete state.errors.videoEncoder.vbvMaxrateError.helperText;
//         }

//         if (!action.payload) {
//             state.values.vbvMaxrate = undefined;
//         } else {
//             state.values.vbvMaxrate = action.payload;
//         }
//     },
//     [changeLevel.type]: (state, action: PayloadAction<ValueOf<typeof ELevel>>) => {
//         if (state.values) {
//             state.values.level = action.payload;
//         }
//     },
//     [changeVBitrate.type]: (state, action: PayloadAction<number>) => {
//         if (state.values) {
//             state.values.vbitrate = action.payload;
//         }
//     },
//     [changeThread.type]: (state, action: PayloadAction<number>) => {
//         if (state.values) {
//             console.log("dasdad", action);
//             state.values.threads = action.payload;
//         }
//     },
//     [changeProfile.type]: (state, action: PayloadAction<EProfile>) => {
//         if (state.values) {
//             state.values.profile = action.payload;
//         }
//     },
//     [changeVideoEncoder.type]: (state, action: PayloadAction<EVideoEncoder>) => {
//         if (state.values) {
//             state.values.videoEncoder = action.payload;
//         }
//     },
//     [changeBFrameAdaptive.type]: (state, action: PayloadAction<keyof typeof EBFrameAdaptive>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.bFrameAdaptive = EBFrameAdaptive[action.payload];
//     },
//     [changeInterlaced.type]: (state, action: PayloadAction<keyof typeof EInterlaced>) => {
//         if (!state.values) {
//             return;
//         }
//         state.values.interlaced = EInterlaced[action.payload];
//     },
//     [setInitialState.type]: (state, action: PayloadAction<IIpbe>) => {
//         state.values = action.payload;

//         if (action.payload.ipbeDestinations.length) {
//             state.errors.main.ipbeDestinations = [];
//             action.payload.ipbeDestinations.forEach(() => {
//                 const destination = ipbeDestinationErrorGenerator();
//                 state.errors.main.ipbeDestinations?.push(destination);
//             });
//         }

//         if (action.payload.ipbeAudioEncoders.length) {
//             action.payload.ipbeAudioEncoders.forEach(() => {
//                 const audiochanel = ipbeAudioChannelErrorGenerator();
//                 state.errors.audioEncoder.push(audiochanel);
//             });
//         }
//     },
//     [setError.type]: (state, action: PayloadAction<IErrorPayload>) => {
//         const {tab, field, text} = action.payload;
//         state.errors[tab][field].error = true;
//         state.errors[tab][field].helperText = text;
//     },
//     [removeError.type]: (state, action: PayloadAction<IErrorPayload>) => {
//         const {tab, field} = action.payload;
//         state.errors[tab][field].error = false;
//         state.errors[tab][field].helperText = undefined;
//     },
//     [changeName.type]: (state, action: PayloadAction<string>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.name = payload;
//         }

//         if (!payload) {
//             state.errors.main.nameError.error = true;
//             state.errors.main.nameError.helperText = EErrorType.required;
//         }
//     },
//     [changeCompany.type]: (state, action: PayloadAction<number>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.company = payload;
//         }
//     },
//     [changeNode.type]: (state, action: PayloadAction<number>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.node = payload;
//         }
//     },
//     [changeVideoConnection.type]: (state, action: PayloadAction<EIpbeVideoConnection>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.videoConnection = payload;
//         }
//     },
//     [changeEncoder.type]: (state, action: PayloadAction<keyof typeof EEncoderVersion>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.encoderVersion = payload;
//         }
//     },
//     [changeApplication.type]: (state, action: PayloadAction<EApplicationType>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.applicationType = payload;
//         }
//     },
//     [changeInputFormat.type]: (state, action: PayloadAction<EIpbeEncoderVideoFormat>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.inputFormat = payload;
//         }
//     },
//     [changeOutputType.type]: (state, action: PayloadAction<EOutputType>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.outputType = payload;
//         }
//     },
//     [changeLatency.type]: (state, action: PayloadAction<ELatency>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.latency = payload;
//         }
//     },
//     [changeVideoOutputIp.type]: (state, action: PayloadAction<string>) => {
//         const {payload} = action;

//         if (!state.values) {
//             return;
//         }
//         const isValid = stringIpMask(payload);

//         if (!isValid && payload) {
//             state.errors.main.videoOutputIpError.error = true;
//             state.errors.main.videoOutputIpError.helperText = EErrorType.badIp;
//         }

//         if ((state.errors.main.videoOutputIpError.error && isValid) || !payload) {
//             state.errors.main.videoOutputIpError.error = false;
//             delete state.errors.main.videoOutputIpError.helperText;
//         }

//         state.values.videoOutputIp = payload;
//     },
//     [changeVideoOutputPort.type]: (state, action: PayloadAction<number>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.videoOutputPort = payload;
//         }
//     },
//     [changeAudioOutputPort.type]: (state, action: PayloadAction<number>) => {
//         const {payload} = action;
//         if (state.values) {
//             state.values.audioOutputPort = payload;
//         }
//     },
//     [changeAudioOutputIp.type]: (state, action: PayloadAction<string>) => {
//         const {payload} = action;
//         if (!state.values) {
//             return;
//         }
//         const isValid = stringIpMask(payload);

//         if (!isValid && payload) {
//             state.errors.main.audioOutputIpError.error = true;
//             state.errors.main.audioOutputIpError.helperText = EErrorType.badIp;
//         }

//         if ((state.errors.main.audioOutputIpError.error && isValid) || !payload) {
//             state.errors.main.audioOutputIpError.error = false;
//             delete state.errors.main.audioOutputIpError.helperText;
//         }

//         state.values.audioOutputIp = payload;
//     },
//     [changeOutputIp.type]: (state, action: PayloadAction<IOutputIpPayload>) => {
//         const {payload} = action;
//         const isValid = stringIpMask(payload.value);
//         let itemIndex;
//         const item = state.values?.ipbeDestinations?.find((item, index) => {
//             if (item.id === payload.id) {
//                 itemIndex = index;
//             }
//             return item.id === payload.id;
//         });

//         if (!item || (!itemIndex && typeof itemIndex !== "number")) {
//             return;
//         }

//         if (!isValid && state.errors.main.ipbeDestinations?.length) {
//             state.errors.main.ipbeDestinations[itemIndex].outputIp.error = true;
//             state.errors.main.ipbeDestinations[itemIndex].outputIp.helperText = EErrorType.badIp;
//         }

//         if (state.errors.main.ipbeDestinations?.[itemIndex].outputIp.error && isValid) {
//             state.errors.main.ipbeDestinations[itemIndex].outputIp.error = false;
//             delete state.errors.main.ipbeDestinations[itemIndex].outputIp.helperText;
//         }

//         item.outputIp = payload.value;
//     },
//     [changeOutputPort.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
//         const {payload} = action;
//         const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
//         if (!item) {
//             return;
//         }
//         item.outputPort = payload.value;
//     },
//     [changeTtl.type]: (state, action: PayloadAction<IOutputPortPayload>) => {
//         const {payload} = action;
//         const item = state.values?.ipbeDestinations?.find((item) => item.id === payload.id);
//         if (!item) {
//             return;
//         }
//         item.ttl = payload.value;
//     },
// });
