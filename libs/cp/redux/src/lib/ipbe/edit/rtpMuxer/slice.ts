import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditRTPMuxerTabState} from "./types";

const IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME = `${IPBE_EDIT_SLICE_NAME}/videoEncoder`;

const initialState: IIpbeEditRTPMuxerTabState = {
    errors: {
        videoPtError: {
            error: false,
        },
        audioPtError: {
            error: false,
        },
    },
    values: {},
};

export const ipbeEditMainFormSlice = createSlice({
    name: IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME,
    initialState,
    reducers: {
        changeAudioPt(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.audioPt = action.payload;
            }
        },
        changeVideoPt(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.videoPt = action.payload;
            }
        },
    },
});
