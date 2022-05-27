import {IIpbeEditAudioEncodersState} from "./types";

export const selectIpbeEditAudioEncoderValues = (state: IIpbeEditAudioEncodersState) => state.values;
export const selectIpbeEditAudioEncoderErrors = (state: IIpbeEditAudioEncodersState) => state.errors;
