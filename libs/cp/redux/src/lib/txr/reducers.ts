import {combineReducers} from "@reduxjs/toolkit";
import {ITxrState} from "./types";
import txrListReducer, {TXR_LIST_SLICE_NAME} from "./list";
import txrEditReducer, {TXR_EDIT_SLICE_NAME} from "./edit";

export default combineReducers<ITxrState>({
    [TXR_LIST_SLICE_NAME]: txrListReducer,
    [TXR_EDIT_SLICE_NAME]: txrEditReducer,
});
