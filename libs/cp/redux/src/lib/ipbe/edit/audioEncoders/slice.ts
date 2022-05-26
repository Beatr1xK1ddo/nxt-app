import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditAudioEncodersTabState} from "./types";
import {ipbeAudioChannelErrorGenerator, ipbeAudioChannelGenerator} from "./utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EApiIpbeAudioCodec, EApiIpbeAudioEncoderChannels} from "@nxt-ui/cp/api";

const IPBE_EDIT_AUDIO_ENCODERS_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/audioEncoders`;

const initialState: IIpbeEditAudioEncodersTabState = {
    errors: [ipbeAudioChannelErrorGenerator()],
    values: {},
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_AUDIO_ENCODERS_SLICE_NAME,
    initialState,
    reducers: {
        changeChannel(state, action: PayloadAction<{id: number; value: EApiIpbeAudioEncoderChannels}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].channels = value;
            }
        },
        changeLanguage(state, action: PayloadAction<{id: number; value: string}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].language = value;
            }
        },
        changeSdiPair(state, action: PayloadAction<{id: number; value: number}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].sdiPair = value;
            }
        },
        changeAc3DialogueLevel(state, action: PayloadAction<{id: number; value: number}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].ac3DialogueLevel = value;
            }
        },
        changeBitrate(state, action: PayloadAction<{id: number; value: number}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].bitrate = value;
            }
        },
        changeCodec(state, action: PayloadAction<{id: number; value: EApiIpbeAudioCodec}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].codec = value;
            }
        },
        addNewAudioEncoder(state) {
            const newAudioEncoder = ipbeAudioChannelGenerator();
            state.values?.ipbeAudioEncoders?.push(newAudioEncoder);
        },
    },
});

export default ipbeEditMainFormSlice.reducer;
