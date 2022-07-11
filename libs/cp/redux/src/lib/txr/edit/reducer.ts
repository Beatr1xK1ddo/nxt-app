import {combineReducers} from "@reduxjs/toolkit";
import {ITxrEditState} from "./types";
import txrEditStatusReducer, {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import txrEditTemplatesReducer, {TXR_TEMPLATE_SLICE_NAME} from "./templates";
import txrEditMainReducer, {TXR_EDIT_MAIN_SLICE_NAME} from "./main";

const txrEditReducer = combineReducers<ITxrEditState>({
    [TXR_EDIT_STATUS_SLICE_NAME]: txrEditStatusReducer,
    [TXR_EDIT_MAIN_SLICE_NAME]: txrEditMainReducer,
    //@ts-ignore
    [TXR_TEMPLATE_SLICE_NAME]: txrEditTemplatesReducer,
});

export default txrEditReducer;
