import {createIpbe, fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {IIpbeAudioEncoderError, IIpbeEditAudioEncodersState} from "./types";
import {ipbeAudioEncoderErrorGenerator, ipbeAudioChannelGenerator, ipbeEditAudioEncoderMapper} from "./utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";
import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

export const IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME = `audioEncoder`;

const audioEncoderInitialState = {
    id: undefined,
    pid: undefined,
    bitrate: 256,
    ac3DialogueLevel: 0,
    codec: EIpbeAudioCodec.mp2,
    channels: EIpbeAudioEncoderChannels.stereo,
    sdiPair: 0,
    language: undefined,
};

const audioEncoderErrorsInitialState: IIpbeAudioEncoderError = {
    codec: {error: false},
    bitrate: {error: false},
    sdiPair: {error: false},
    ac3DialogueLevel: {error: false},
    channels: {error: false},
    language: {error: false},
};
const initialState: IIpbeEditAudioEncodersState = {
    values: {
        audioEncoders: [audioEncoderInitialState],
    },
    errors: {
        audioEncoders: [audioEncoderErrorsInitialState],
    },
};

export const ipbeEditMainSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        changeChannel(state, action: PayloadAction<{index: number; value: EIpbeAudioEncoderChannels}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].channels = value;
            }
        },
        changeLanguage(state, action: PayloadAction<{index: number; value: string}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].language = value;
            }
        },
        changeSdiPair(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].sdiPair = value;
            }
        },
        changeAc3DialogueLevel(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].ac3DialogueLevel = value;
            }
        },
        changeBitrate(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].bitrate = value;
            }
        },
        changeCodec(state, action: PayloadAction<{index: number; value: EIpbeAudioCodec}>) {
            const {index, value} = action.payload;
            if (state.values.audioEncoders[index]) {
                state.values.audioEncoders[index].codec = value;
            }
        },
        addNewAudioEncoder(state) {
            const newAudioEncoder = ipbeAudioChannelGenerator();
            state.values.audioEncoders.push(newAudioEncoder);
        },
        addNewAudioChannel(state) {
            state.values.audioEncoders.push(ipbeAudioChannelGenerator());
            state.errors.audioEncoders.push(ipbeAudioEncoderErrorGenerator());
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (state.values.audioEncoders[action.payload]) {
                state.values.audioEncoders = state.values.audioEncoders.filter((_, index) => index !== action.payload);
            }
        },
        changeAudioPid(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (typeof value !== "number" || isNaN(value)) {
                state.values.audioEncoders[index].pid = undefined;
            } else {
                state.values.audioEncoders[index].pid = value;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.fulfilled, (state, action) => {
                state.values.audioEncoders = ipbeEditAudioEncoderMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.fulfilled, (state, action) => {
                state.values.audioEncoders = ipbeEditAudioEncoderMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    errors.forEach((error) => {
                        if (error.key.includes("audioEncoders")) {
                            const resultsArr = error.key.split(".");
                            const field = resultsArr.pop() as keyof IIpbeAudioEncoderError | undefined;
                            const id = parseInt(resultsArr[0].slice(resultsArr[0].length - 2));
                            if (field && typeof id === "number" && !isNaN(id)) {
                                const errorField = state.errors.audioEncoders[id][field];
                                if (errorField) {
                                    errorField.error = true;
                                    errorField.helperText = error.message;
                                }
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
                        if (error.key.includes("audioEncoders")) {
                            const resultsArr = error.key.split(".");
                            const field = resultsArr.pop() as keyof IIpbeAudioEncoderError | undefined;
                            const id = parseInt(resultsArr[0].slice(resultsArr[0].length - 2));
                            if (field && typeof id === "number" && !isNaN(id)) {
                                const errorField = state.errors.audioEncoders[id][field];
                                if (errorField) {
                                    errorField.error = true;
                                    errorField.helperText = error.message;
                                }
                            }
                        }
                    });
                }
            })
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values.audioEncoders = ipbeEditAudioEncoderMapper(action.payload);
            });
    },
});

export default ipbeEditMainSlice.reducer;
