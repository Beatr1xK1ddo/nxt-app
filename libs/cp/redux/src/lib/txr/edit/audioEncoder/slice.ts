import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiTxr, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {ETxrApplicationType, ETxrAudioCodec, ETxrAudioEncoderChannels} from "@nxt-ui/cp/types";

import {setApplication} from "../main/actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {fetchTxr, resetTxr, updateTxr} from "../actions";
import {ITxrAudioEncoderError, ITxrEditAudioEncodersState} from "./types";
import {txrAudioChannelGenerator, txrAudioEncoderErrorGenerator} from "./utils";

export const TXR_EDIT_AUDIO_ENCODER_SLICE_NAME = `audioEncoder`;

const audioEncoderInitialState = {
    id: undefined,
    pid: undefined,
    bitrate: 256,
    ac3DialogueLevel: 0,
    codec: ETxrAudioCodec.mp2,
    channels: ETxrAudioEncoderChannels.stereo,
    sdiPair: 0,
    language: undefined,
};

const audioEncoderErrorsInitialState: ITxrAudioEncoderError = {
    codec: {error: false},
    bitrate: {error: false},
    sdiPair: {error: false},
    ac3DialogueLevel: {error: false},
    channels: {error: false},
    language: {error: false},
};

const audioEncoderDirtyInitialState = {dirty: false};

const initialState: ITxrEditAudioEncodersState = {
    values: [audioEncoderInitialState],
    errors: [audioEncoderErrorsInitialState],
    dirty: [audioEncoderDirtyInitialState],
};

export const txrEditMainSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_AUDIO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        setChannel(state, action: PayloadAction<{index: number; value: ETxrAudioEncoderChannels}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].channels = value;
            }
        },
        setLanguage(state, action: PayloadAction<{index: number; value: string}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].language = value;
            }
        },
        setSdiPair(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].sdiPair = value;
            }
        },
        setAc3DialogueLevel(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].ac3DialogueLevel = value;
            }
        },
        setBitrate(state, action: PayloadAction<{index: number; value: number}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].bitrate = value;
            }
        },
        setCodec(state, action: PayloadAction<{index: number; value: ETxrAudioCodec}>) {
            const {index, value} = action.payload;
            if (state.values[index]) {
                state.values[index].codec = value;
            }
        },
        setDirty(state, action: PayloadAction<number>) {
            const {payload} = action;
            if (!state.dirty[payload].dirty) {
                state.dirty[payload].dirty = true;
            }
        },
        addNewAudioEncoder(state) {
            state.values.push(txrAudioChannelGenerator());
            state.errors.push(txrAudioEncoderErrorGenerator());
            state.dirty.push({dirty: false});
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (state.values[action.payload]) {
                state.values = state.values.filter((_, index) => index !== action.payload);
            }
        },
        setAudioPid(state, action: PayloadAction<{index: number; value: number}>) {
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
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(setApplication, (state, action) => {
                const {payload} = action;
                state.dirty.forEach((field, i) => {
                    if (!field.dirty) {
                        if (payload === ETxrApplicationType.TXR && state.values[i].codec !== ETxrAudioCodec.mp2) {
                            state.values[i].codec = ETxrAudioCodec.mp2;
                        } else if (
                            payload === ETxrApplicationType.AVDS2 &&
                            state.values[i].codec !== ETxrAudioCodec.ac3
                        ) {
                            state.values[i].codec = ETxrAudioCodec.ac3;
                        } else if (
                            payload === ETxrApplicationType.Sdi2Web &&
                            state.values[i].codec !== ETxrAudioCodec.opus
                        ) {
                            state.values[i].codec = ETxrAudioCodec.opus;
                        }
                    } else {
                        if (payload === ETxrApplicationType.TXR && state.values[i].codec === ETxrAudioCodec.opus) {
                            state.values[i].codec = ETxrAudioCodec.mp2;
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
                        if (error.key.includes("audioEncoders")) {
                            const resultsArr = error.key.split(".");
                            const field = resultsArr.pop() as keyof ITxrAudioEncoderError | undefined;
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
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = (action.payload as IApiTxr).txrAudioEncoders;
                state.dirty = (action.payload as IApiTxr).txrAudioEncoders.map(() => ({
                    dirty: false,
                }));
            });
    },
});

export default txrEditMainSlice.reducer;
