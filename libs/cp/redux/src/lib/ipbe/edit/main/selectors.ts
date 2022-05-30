import {IIpbeEditMainState} from "./types";
import {createSelector} from "@reduxjs/toolkit";

export const selectIpbeEditMainValues = (state: IIpbeEditMainState) => state.values;
export const selectIpbeEditMainErrors = (state: IIpbeEditMainState) => state.errors;
export const selectIpbeEditMainApplication = createSelector(selectIpbeEditMainValues, (state) => state.applicationType);
export const selectIpbeEditNode = createSelector(selectIpbeEditMainValues, (state) => state.node);
