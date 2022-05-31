import {IApiIpbe} from "@nxt-ui/cp/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchIpbe, IPBE_EDIT_SLICE_NAME} from "../slice";
import {IIpbeEditRTPMuxerTabState} from "./types";
import {ipbeEditFormRTPMuxerMapper} from "./utils";

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
                state.values.audioPid = action.payload;
            }
        },
        changeVideoPt(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.videoPid = action.payload;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditFormRTPMuxerMapper(action.payload);
        });
    },
});

export default ipbeEditMainFormSlice.reducer;
