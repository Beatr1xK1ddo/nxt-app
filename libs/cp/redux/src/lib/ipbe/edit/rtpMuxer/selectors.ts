import {IIpbeEditRTPMuxerState} from "./types";

export const selectIpbeEditRtpMuxerValues = (state: IIpbeEditRTPMuxerState) => state.values;
export const selectIpbeEditRtpMuxerErrors = (state: IIpbeEditRTPMuxerState) => state.errors;
