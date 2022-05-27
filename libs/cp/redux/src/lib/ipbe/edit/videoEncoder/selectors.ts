import {IIpbeEditVideoEncoderState} from "./types";

export const selectIpbeEditVideoEncoderValues = (state: IIpbeEditVideoEncoderState) => state.values;
export const selectIpbeEditVideoEncoderErrors = (state: IIpbeEditVideoEncoderState) => state.errors;
