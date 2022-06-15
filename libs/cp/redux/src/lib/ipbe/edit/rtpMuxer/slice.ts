import {IApiIpbe, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditRTPMuxerErrors, IIpbeEditRTPMuxerState} from "./types";
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
        setAudioPt(state, action: PayloadAction<number>) {
            if (typeof action.payload === "number" && !isNaN(action.payload)) {
                state.values.audioPt = action.payload;
            } else {
                state.values.audioPt = null;
            }
        },
        setVideoPt(state, action: PayloadAction<number>) {
            if (typeof action.payload === "number" && !isNaN(action.payload)) {
                state.values.videoPt = action.payload;
            } else {
                state.values.videoPt = null;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(updateIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditRTPMuxerMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditRTPMuxerMapper(action.payload as IApiIpbe);
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
            .addCase(createIpbe.rejected, (state, action) => {
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
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values = ipbeEditRTPMuxerMapper(action.payload);
            });
    },
});

export default ipbeEditRtpMuxerSlice.reducer;
