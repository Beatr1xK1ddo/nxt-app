import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {EIpbeApplicationType, EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";

import {setApplication} from "../main/actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {fetchIpbe, resetIpbe, updateIpbe, cloneIpbes} from "../actions";
import {IIpbeAudioEncoderError, IIpbeEditAudioEncodersState} from "./types";
import {ipbeAudioChannelGenerator, ipbeAudioEncoderErrorGenerator} from "./utils";

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

const audioEncoderDirtyInitialState = {dirty: false};

const initialState: IIpbeEditAudioEncodersState = {
    values: [audioEncoderInitialState],
    errors: [audioEncoderErrorsInitialState],
    dirty: [audioEncoderDirtyInitialState],
};

export const ipbeEditMainSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME}`,
    initialState,
    reducers: {
        setChannel(state, action: PayloadAction<{index: number; value: EIpbeAudioEncoderChannels}>) {
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
        setCodec(state, action: PayloadAction<{index: number; value: EIpbeAudioCodec}>) {
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
            state.values.push(ipbeAudioChannelGenerator());
            state.errors.push(ipbeAudioEncoderErrorGenerator());
            state.dirty.push({dirty: false});
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (state.values[action.payload]) {
                state.values = state.values.filter((_, index) => index !== action.payload);
                state.dirty.splice(action.payload, 1);
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
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(setApplication, (state, action) => {
                const {payload} = action;
                state.dirty.forEach((field, i) => {
                    if (!field.dirty) {
                        if (payload === EIpbeApplicationType.IPBE && state.values[i].codec !== EIpbeAudioCodec.mp2) {
                            state.values[i].codec = EIpbeAudioCodec.mp2;
                        } else if (
                            payload === EIpbeApplicationType.AVDS2 &&
                            state.values[i].codec !== EIpbeAudioCodec.ac3
                        ) {
                            state.values[i].codec = EIpbeAudioCodec.ac3;
                        } else if (
                            payload === EIpbeApplicationType.Sdi2Web &&
                            state.values[i].codec !== EIpbeAudioCodec.opus
                        ) {
                            state.values[i].codec = EIpbeAudioCodec.opus;
                        }
                    } else {
                        if (payload === EIpbeApplicationType.IPBE && state.values[i].codec === EIpbeAudioCodec.opus) {
                            state.values[i].codec = EIpbeAudioCodec.mp2;
                        }
                    }
                });
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
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled, cloneIpbes.fulfilled), (state, action) => {
                state.values = (action.payload as IApiIpbe).ipbeAudioEncoders;
                state.dirty = (action.payload as IApiIpbe).ipbeAudioEncoders.map(() => ({
                    dirty: false,
                }));
            });
    },
});

export default ipbeEditMainSlice.reducer;
