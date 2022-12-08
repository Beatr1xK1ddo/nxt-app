import {combineReducers} from "@reduxjs/toolkit";
import {ICpRootState} from "./types";
import commonReducer, {COMMON_SLICE_NAME} from "./common";
import processingReducer, {PROCESSING_SLICE_NAME} from "./processing";
import ipbeReducer, {IPBE_SLICE_NAME} from "./ipbe";
import txrReducer, {TXR_SLICE_NAME} from "./txr";
import userNotificationsReducer, {NOTIFICATIONS_SLICE_NAME} from "./notifications";

export const cpRootReducer = combineReducers<ICpRootState>({
    [COMMON_SLICE_NAME]: commonReducer,
    [PROCESSING_SLICE_NAME]: processingReducer,
    [IPBE_SLICE_NAME]: ipbeReducer,
    [TXR_SLICE_NAME]: txrReducer,
    [NOTIFICATIONS_SLICE_NAME]: userNotificationsReducer,
});
