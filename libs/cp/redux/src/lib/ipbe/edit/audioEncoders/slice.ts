import {fetchIpbe, IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditAudioEncodersTabState} from "./types";
import {ipbeAudioChannelErrorGenerator, ipbeAudioChannelGenerator, ipbeEditFormAudioEncodersMapper} from "./utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";
import {IApiIpbe} from "@nxt-ui/cp/api";

const IPBE_EDIT_AUDIO_ENCODERS_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/audioEncoders`;

const initialState: IIpbeEditAudioEncodersTabState = {
    errors: [ipbeAudioChannelErrorGenerator()],
    values: {
        ipbeAudioEncoders: [
            {
                codec: EIpbeAudioCodec.mp2,
                bitrate: undefined,
                sdiPair: undefined,
                pid: undefined,
                ac3DialogueLevel: 0,
                channels: EIpbeAudioEncoderChannels.Default,
                language: "",
            },
        ],
    },
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_AUDIO_ENCODERS_SLICE_NAME,
    initialState,
    reducers: {
        changeChannel(state, action: PayloadAction<{id: number; value: EIpbeAudioEncoderChannels}>) {
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
        changeCodec(state, action: PayloadAction<{id: number; value: EIpbeAudioCodec}>) {
            const {id, value} = action.payload;
            if (state.values?.ipbeAudioEncoders) {
                state.values.ipbeAudioEncoders[id].codec = value;
            }
        },
        addNewAudioEncoder(state) {
            const newAudioEncoder = ipbeAudioChannelGenerator();
            state.values?.ipbeAudioEncoders?.push(newAudioEncoder);
        },
        addNewAudioChannel(state) {
            if (state.values?.ipbeAudioEncoders) {
                state.errors.push(ipbeAudioChannelErrorGenerator());
                state.values.ipbeAudioEncoders.push(ipbeAudioChannelGenerator());
            }
        },
        deleteAudioEncoder(state, action: PayloadAction<number>) {
            if (!state.values?.ipbeAudioEncoders) {
                return;
            }
            state.values.ipbeAudioEncoders = state.values?.ipbeAudioEncoders?.filter((_, i) => i !== action.payload);
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditFormAudioEncodersMapper(action.payload);
        });
    },
});

export default ipbeEditMainFormSlice.reducer;
