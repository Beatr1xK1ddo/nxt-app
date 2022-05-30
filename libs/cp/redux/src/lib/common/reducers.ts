import {combineReducers} from "@reduxjs/toolkit";
import {ICommonState} from "./types";
import nodesReducer, {NODES_SLICE_NAME} from "./nodes";
import companiesReducer, {COMPANIES_SLICE_NAME} from "./companies";
import {APPLICATION_TYPE_SLICE_NAME} from "./encoderVersions";
import applicationTypeReducer from "./encoderVersions";

export const COMMON_SLICE_NAME = "common";

//state slice itself
export default combineReducers<ICommonState>({
    [NODES_SLICE_NAME]: nodesReducer,
    [COMPANIES_SLICE_NAME]: companiesReducer,
    [APPLICATION_TYPE_SLICE_NAME]: applicationTypeReducer,
});
