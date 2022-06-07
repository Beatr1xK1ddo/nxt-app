import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";

import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {IIpbeAudioEncoderError, IIpbeEditAudioEncodersState} from "./types";
import {ipbeAudioChannelGenerator, ipbeAudioEncoderErrorGenerator, ipbeEditAudioEncoderMapper} from "./utils";

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
    values: [audioEncoderInitialState],
    errors: [audioEncoderErrorsInitialState],
};

export const ipbeEditMainSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        changeChannel(state, action: PayloadAction<{index: number; value: EIpbeAudioEncoderChannels}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].channels = value;
            }
        },
        changeLanguage(state, action: PayloadAction<{index: number; value: string}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].language = value;
            }
        },
        changeSdiPair(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].sdiPair = value;
            }
        },
        changeAc3DialogueLevel(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].ac3DialogueLevel = value;
            }
        },
        changeBitrate(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].bitrate = value;
            }
        },
        changeCodec(state, action: PayloadAction<{index: number; value: EIpbeAudioCodec}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].codec = value;
            }
        },
        addNewAudioEncoder(state) {
            state.values.push(ipbeAudioChannelGenerator());
            state.errors.push(ipbeAudioEncoderErrorGenerator());
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (state.values[action.payload]) {
                state.values = state.values.filter((_, index) => index !== action.payload);
            }
        },
        changeAudioPid(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (isNaN(value)) {
                state.values[index].pid = undefined;
            } else {
                state.values[index].pid = value;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditAudioEncoderMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditAudioEncoderMapper(action.payload as IApiIpbe);
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
                            if (field && !isNaN(id)) {
                                const errorField = state.errors[id][field];
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
                            if (field && !isNaN(id)) {
                                const errorField = state.errors[id][field];
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
                state.values = ipbeEditAudioEncoderMapper(action.payload);
            });
    },
});

export default ipbeEditMainSlice.reducer;
