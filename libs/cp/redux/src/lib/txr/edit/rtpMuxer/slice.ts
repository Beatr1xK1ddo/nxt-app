import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiTxr, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

import {fetchTxr, resetTxr, updateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {ITxrEditRTPMuxerErrors, ITxrEditRTPMuxerState} from "./types";
import {txrApiToRTPMuxerMapper} from "./utils";

export const TXR_EDIT_RTP_MUXER_SLICE_NAME = "rtpMuxer";

const initialState: ITxrEditRTPMuxerState = {
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

export const txrEditRtpMuxerSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_RTP_MUXER_SLICE_NAME}`,
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
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addCase(updateTxr.rejected, (state, action) => {
                const isBackendError = isIApiIpbeEditErrorResponse(action.payload as IApiIpbeEditErrorResponse);
                if (isBackendError) {
                    const errors = (action.payload as IApiIpbeEditErrorResponse).errors;
                    errors.forEach((error) => {
                        const field = state.errors[error.key as keyof ITxrEditRTPMuxerErrors];
                        if (field) {
                            field.error = true;
                            field.helperText = error.message;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = txrApiToRTPMuxerMapper(action.payload as IApiTxr);
            });
    },
});

export default txrEditRtpMuxerSlice.reducer;
