import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

import {fetchIpbe, resetIpbe, updateIpbe, cloneIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditRTPMuxerErrors, IIpbeEditRTPMuxerState} from "./types";
import {ipbeApiToRTPMuxerMapper} from "./utils";

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
        setAudioPt(state, action: PayloadAction<number>) {
            if (isNaN(action.payload)) {
                state.values.audioPt = null;
            } else {
                state.values.audioPt = action.payload;
            }
        },
        setVideoPt(state, action: PayloadAction<number>) {
            if (isNaN(action.payload)) {
                state.values.videoPt = null;
            } else {
                state.values.videoPt = action.payload;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    errors.forEach((error) => {
                        const field = state.errors[error.key as keyof IIpbeEditRTPMuxerErrors];
                        if (field) {
                            field.error = true;
                            field.helperText = error.message;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled), (state, action) => {
                state.values = ipbeApiToRTPMuxerMapper(action.payload as IApiIpbe);
            });
    },
});

export default ipbeEditRtpMuxerSlice.reducer;
