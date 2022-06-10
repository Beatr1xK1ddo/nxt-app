import {IApiIpbe, IApiIpbeEditErrorField, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe} from "../actions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IIpbeEditAdvancedError, IIpbeEditAdvancedState} from "./types";
import {ipbeEditAdvancedMapper} from "./utils";
import {IPBE_EDIT_SLICE_NAME} from "../constants";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

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
        slateImage: null,
    },
    errors: {slateImage: {error: false}},
};

export const ipbeEditAdvancedSlice = createSlice({
    name: `${IPBE_EDIT_SLICE_NAME}/${IPBE_EDIT_ADVANCED_SLICE_NAME}`,
    initialState,
    reducers: {
        changeAddTimecode(state) {
            if (state.values) {
                state.values.addTimecode = !state.values.addTimecode;
            }
        },
        changeEnablePsfEncoding(state) {
            if (state.values) {
                state.values.enablePsfEncoding = !state.values.enablePsfEncoding;
            }
        },
        changeRunMonitor(state) {
            if (state.values) {
                state.values.runMonitor = !state.values.runMonitor;
            }
        },
        changeRestartOnError(state) {
            if (state.values) {
                state.values.restartOnError = !state.values.restartOnError;
            }
        },
        changeEnableLoopback(state) {
            if (state.values) {
                state.values.enableLoopback = !state.values.enableLoopback;
            }
        },
        changeEnablePreviewImages(state) {
            if (state.values) {
                state.values.enablePreviewImages = !state.values.enablePreviewImages;
            }
        },
        changeEnableSlateIfNoSignal(state) {
            if (state.values) {
                state.values.enableSlateIfNoSignal = !state.values.enableSlateIfNoSignal;
            }
        },
        changeSlateImage(state, action: PayloadAction<string>) {
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
            .addCase(createIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditAdvancedMapper(action.payload as IApiIpbe);
            })
            .addCase(createIpbe.rejected, (state, action) => {
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
            .addCase(updateIpbe.fulfilled, (state, action) => {
                state.values = ipbeEditAdvancedMapper(action.payload as IApiIpbe);
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
            .addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
                state.values = ipbeEditAdvancedMapper(action.payload);
            });
    },
});

export default ipbeEditAdvancedSlice.reducer;
