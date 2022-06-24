import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiIpbe, IApiIpbeEditErrorField, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

import {fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {IIpbeEditAdvancedError, IIpbeEditAdvancedState} from "./types";
import {ipbeApiToAdvancedMapper} from "./utils";

export const IPBE_EDIT_ADVANCED_SLICE_NAME = "advanced";

const initialState: IIpbeEditAdvancedState = {
    values: {
        addTimecode: false,
        enablePsfEncoding: false,
        enableLoopback: false,
        enablePreviewImages: true,
        enableSlateIfNoSignal: false,
        restartOnError: true,
        runMonitor: true,
        isEndpoint: false,
        slateImage: null,
    },
    errors: {slateImage: {error: false}},
};

export const ipbeEditAdvancedSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_ADVANCED_SLICE_NAME}`,
    initialState,
    reducers: {
        setAddTimecode(state) {
            if (state.values) {
                state.values.addTimecode = !state.values.addTimecode;
            }
        },
        setIsEndpoint(state) {
            if (state.values) {
                state.values.isEndpoint = !state.values.isEndpoint;
            }
        },
        setEnablePsfEncoding(state) {
            if (state.values) {
                state.values.enablePsfEncoding = !state.values.enablePsfEncoding;
            }
        },
        setRunMonitor(state) {
            if (state.values) {
                state.values.runMonitor = !state.values.runMonitor;
            }
        },
        setRestartOnError(state) {
            if (state.values) {
                state.values.restartOnError = !state.values.restartOnError;
            }
        },
        setEnableLoopback(state) {
            if (state.values) {
                state.values.enableLoopback = !state.values.enableLoopback;
            }
        },
        setEnablePreviewImages(state) {
            if (state.values) {
                state.values.enablePreviewImages = !state.values.enablePreviewImages;
            }
        },
        setEnableSlateIfNoSignal(state) {
            if (state.values) {
                state.values.enableSlateIfNoSignal = !state.values.enableSlateIfNoSignal;
            }
        },
        setSlateImage(state, action: PayloadAction<string>) {
            if (state.values) {
                state.values.slateImage = action.payload;
            }
        },
        deleteSlateImage(state) {
            if (state.values) {
                state.values.slateImage = null;
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
                    errors.forEach((error: IApiIpbeEditErrorField) => {
                        const field = state.errors[error.key as keyof IIpbeEditAdvancedError];
                        if (field) {
                            field.error = true;
                            field.helperText = error.message;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled), (state, action) => {
                state.values = ipbeApiToAdvancedMapper(action.payload as IApiIpbe);
            });
    },
});
export default ipbeEditAdvancedSlice.reducer;
