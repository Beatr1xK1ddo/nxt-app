import {combineReducers} from "@reduxjs/toolkit";
import {ICpRootState} from "./types";
import processingReducer, {PROCESSING_SLICE_NAME} from "./processing";
import ipbeReducer, {IPBE_SLICE_NAME} from "./ipbe";

export const cpRootReducer = combineReducers<ICpRootState>({
    [PROCESSING_SLICE_NAME]: processingReducer,
    [IPBE_SLICE_NAME]: ipbeReducer,
});
