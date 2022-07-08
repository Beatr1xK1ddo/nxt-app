import {combineReducers} from "@reduxjs/toolkit";
import {ITxrEditState} from "./types";
import txrEditStatusReducer, {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import txrEditMainReducer, {TXR_EDIT_MAIN_SLICE_NAME} from "./main";

const txrEditReducer = combineReducers<ITxrEditState>({
    [TXR_EDIT_STATUS_SLICE_NAME]: txrEditStatusReducer,
    [TXR_EDIT_MAIN_SLICE_NAME]: txrEditMainReducer,
});

export default txrEditReducer;
