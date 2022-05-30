import {IIpbeEditMainState} from "./types";

export const selectIpbeEditMainValues = (state: IIpbeEditMainState) => state.values;
export const selectIpbeEditMainErrors = (state: IIpbeEditMainState) => state.errors;
