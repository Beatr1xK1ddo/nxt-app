import {IApiIpbe} from "@nxt-ui/cp/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPBE_EDIT_SLICE_NAME} from "../reducer";
import {fetchIpbe} from "../actions";
import {IIpbeEditRTPMuxerState} from "./types";
import {ipbeEditRTPMuxerMapper} from "./utils";

export const IPBE_EDIT_RTP_MUXER_SLICE_NAME = "rtpMuxer";

const initialState: IIpbeEditRTPMuxerState = {
    values: {
        audioPt: null,
        videoPt: null,
    },
    errors: {
        videoPt: {
            error: false,
        },
        audioPt: {
            error: false,
        },
    },
};

export const ipbeEditRtpMuxerSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_RTP_MUXER_SLICE_NAME}`,
    initialState,
    reducers: {
        changeAudioPt(state, action: PayloadAction<number>) {
            state.values.audioPt = action.payload;
        },
        changeVideoPt(state, action: PayloadAction<number>) {
            state.values.videoPt = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditRTPMuxerMapper(action.payload);
        });
    },
});

export default ipbeEditRtpMuxerSlice.reducer;
