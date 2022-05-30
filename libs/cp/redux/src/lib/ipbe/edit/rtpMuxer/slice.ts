import {IApiIpbe} from "@nxt-ui/cp/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
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
            if (typeof action.payload === "number" && !isNaN(action.payload)) {
                state.values.audioPt = action.payload;
            } else {
                state.values.audioPt = null;
            }
        },
        changeVideoPt(state, action: PayloadAction<number>) {
            if (typeof action.payload === "number" && !isNaN(action.payload)) {
                state.values.videoPt = action.payload;
            } else {
                state.values.videoPt = null;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state.values = ipbeEditRTPMuxerMapper(action.payload);
        });
    },
});

export default ipbeEditRtpMuxerSlice.reducer;
