import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeState} from "./types";
import ipbeListReducer, {IPBE_LIST_SLICE_NAME} from "./list";
import ipbeEditReducer, {IPBE_EDIT_SLICE_NAME} from "./edit";

export default combineReducers<IIpbeState>({
    [IPBE_LIST_SLICE_NAME]: ipbeListReducer,
    [IPBE_EDIT_SLICE_NAME]: ipbeEditReducer,
});
