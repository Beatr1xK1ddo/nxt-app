import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeState} from "./types";
import ipbeListReducer, {IPBE_LIST_SLICE_NAME} from "./list";
import { IPBE_EDIT_SLICE_NAME } from "./edit/slice";

export const IPBE_SLICE_NAME = "ipbe";

//state slice itself
export default combineReducers<IIpbeState>({
    [IPBE_LIST_SLICE_NAME]: ipbeListReducer,
    [IPBE_EDIT_SLICE_NAME]: 
});
