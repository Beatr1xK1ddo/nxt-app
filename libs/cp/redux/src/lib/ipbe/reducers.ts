import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeState} from "./types";
import ipbeListReducer, {IPBE_LIST_SLICE_NAME} from "./list";
import {IPBE_EDIT_SLICE_NAME} from "./edit/slice";
import {ipbeEditRootReducer} from "./edit/reducers";

export const IPBE_SLICE_NAME = "ipbe";

export default combineReducers<IIpbeState>({
    [IPBE_LIST_SLICE_NAME]: ipbeListReducer,
    [IPBE_EDIT_SLICE_NAME]: ipbeEditRootReducer,
});
