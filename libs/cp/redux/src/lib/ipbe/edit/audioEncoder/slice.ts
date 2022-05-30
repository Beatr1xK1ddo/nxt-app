import {fetchIpbe} from "../actions";
import {IIpbeAudioEncoderError, IIpbeEditAudioEncodersState} from "./types";
import {ipbeAudioEncoderErrorGenerator, ipbeAudioChannelGenerator, ipbeEditAudioEncoderMapper} from "./utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";
import {IApiIpbe} from "@nxt-ui/cp/api";
import {IPBE_EDIT_SLICE_NAME} from "../constants";

export const IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME = `audioEncoder`;

const audioEncoderInitialState = {
    id: undefined,
    pid: undefined,
    bitrate: 256,
    ac3DialogueLevel: 0,
    codec: EIpbeAudioCodec.mp2,
    channels: undefined,
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
            const newAudioEncoder = ipbeAudioChannelGenerator();
            state.values.push(newAudioEncoder);
        },
        addNewAudioChannel(state) {
            state.values.push(ipbeAudioChannelGenerator());
            state.errors.push(ipbeAudioEncoderErrorGenerator());
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (state.values[action.payload]) {
                state.values = state.values.filter((_, index) => index !== action.payload);
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditAudioEncoderMapper(action.payload);
        });
    },
});

export default ipbeEditMainSlice.reducer;
