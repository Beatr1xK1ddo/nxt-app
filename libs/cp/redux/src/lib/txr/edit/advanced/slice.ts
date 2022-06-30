import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IApiTxr, IApiTxrEditErrorField, IApiIpbeEditErrorResponse} from "@nxt-ui/cp/api";
import {isIApiIpbeEditErrorResponse} from "@nxt-ui/cp/utils";

import {fetchTxr, resetTxr, updateTxr} from "../actions";
import {TXR_EDIT_SLICE_NAME} from "../constants";
import {ITxrEditAdvancedError, ITxrEditAdvancedState} from "./types";
import {txrApiToAdvancedMapper} from "./utils";

export const TXR_EDIT_ADVANCED_SLICE_NAME = "advanced";

const initialState: ITxrEditAdvancedState = {
    values: {
        addTimecode: false,
        enablePsfEncoding: false,
        enableLoopback: false,
        enablePreviewImages: true,
        enableSlateIfNoSignal: false,
        restartOnError: true,
        runMonitor: true,
        isEndpoint: false,
        image: {
            slateImage: null,
            dirty: false,
            slateImageUrl: null,
        },
    },
    errors: {slateImage: {error: false}},
};

export const txrEditAdvancedSlice = createSlice({
    name: `${TXR_EDIT_SLICE_NAME}/${TXR_EDIT_ADVANCED_SLICE_NAME}`,
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
                if (!state.values.image.dirty) {
                    state.values.image.dirty = true;
                }
                state.values.image.slateImage = action.payload;
            }
        },
        deleteSlateImage(state) {
            if (state.values) {
                if (!state.values.image.dirty) {
                    state.values.image.dirty = true;
                }
                state.values.image.slateImage = null;
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
                    //@ts-ignore
                    errors.forEach((error: IApiTxrEditErrorField) => {
                        const field = state.errors[error.key as keyof ITxrEditAdvancedError];
                        if (field) {
                            field.error = true;
                            field.helperText = error.message;
                        }
                    });
                }
            })
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), (state, action) => {
                state.values = txrApiToAdvancedMapper(action.payload as IApiTxr);
            });
    },
});
export default txrEditAdvancedSlice.reducer;
