import {IIpbeEditAdvancedTabState} from "./advanced/types";
import {IIpbeEditAudioEncodersTabState} from "./audioEncoders/types";
import {IIpbeEditMainTabState} from "./main/types";
import {IIpbeEditMpegTsMuxerTabState} from "./mpegTsMuxer/types";
import {IIpbeEditRTPMuxerTabState} from "./rtpMuxer/types";
import {IIpbeEditRootState} from "./types";
import {IIpbeEditVideoEncoderTabState} from "./videoEncoder/types";

export const selectIpbeEditAdvanced = (state: IIpbeEditRootState): IIpbeEditAdvancedTabState => state.advanced;
export const selectIpbeEditAudioEncoders = (state: IIpbeEditRootState): IIpbeEditAudioEncodersTabState =>
    state.audioEncoder;
export const selectIpbeEditMain = (state: IIpbeEditRootState): IIpbeEditMainTabState => state.main;
export const selectIpbeEditMpegTsMuxer = (state: IIpbeEditRootState): IIpbeEditMpegTsMuxerTabState => state.mpegMuxer;
export const selectIpbeEditRtpMuxer = (state: IIpbeEditRootState): IIpbeEditRTPMuxerTabState => state.rtpMuxer;
export const selectIpbeEditVideoEncoder = (state: IIpbeEditRootState): IIpbeEditVideoEncoderTabState =>
    state.videoEncoder;
export const selectIpbeEditStatus = (state: IIpbeEditRootState): string => state.status;
