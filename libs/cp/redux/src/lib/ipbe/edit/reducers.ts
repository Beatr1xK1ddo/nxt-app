import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeEditRootState} from "./types";
import ipbeEditGeneralSlice from "./slice";
import ipbeEditMainReducer from "./main";
import ipbeEditVideoEncoderReducer from "./videoEncoder";
import ipbeEditAdvancedReducer from "./advanced";

export const ipbeEditRootReducer = combineReducers<IIpbeEditRootState>({
    main: ipbeEditMainReducer,
    videoEncoder: ipbeEditVideoEncoderReducer,
    advanced: ipbeEditAdvancedReducer,
});
