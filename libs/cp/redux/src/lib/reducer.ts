import {combineReducers} from "@reduxjs/toolkit";
import {ICpRootState} from "./types";
import commonReducer, {COMMON_SLICE_NAME} from "./common";
import processingReducer, {PROCESSING_SLICE_NAME} from "./processing";
import ipbeReducer, {IPBE_SLICE_NAME} from "./ipbe";

export const cpRootReducer = combineReducers<ICpRootState>({
    [COMMON_SLICE_NAME]: commonReducer,
    [PROCESSING_SLICE_NAME]: processingReducer,
    [IPBE_SLICE_NAME]: ipbeReducer,
});
