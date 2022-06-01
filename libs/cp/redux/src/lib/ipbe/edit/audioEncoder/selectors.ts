import {IIpbeEditAudioEncodersState} from "./types";

export const selectIpbeEditAudioEncoderValues = (state: IIpbeEditAudioEncodersState) => state.values.audioEncoders;
export const selectIpbeEditAudioEncoderErrors = (state: IIpbeEditAudioEncodersState) => state.errors.audioEncoders;
