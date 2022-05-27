import {IIpbeEditState} from "./types";
import {IPBE_EDIT_ADVANCED_SLICE_NAME, advancedSelectors} from "./advanced";
import {IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME, audioEncoderSelectors} from "./audioEncoder";
import {IPBE_EDIT_MAIN_SLICE_NAME, mainSelectors} from "./main";
import {IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME, videoEncoderSelectors} from "./videoEncoder";
import {IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME, mpegTsMuxerSelectors} from "./mpegTsMuxer";
import {IPBE_EDIT_RTP_MUXER_SLICE_NAME, rtpMuxerSelectors} from "./rtpMuxer";
import {IPBE_EDIT_STATUS_SLICE_NAME} from "./status";

export const selectIpbeEditStatus = (state: IIpbeEditState) => state[IPBE_EDIT_STATUS_SLICE_NAME];
export const selectIpbeEditMainValues = (state: IIpbeEditState) => mainSelectors.selectIpbeEditMainValues(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditVideoEncoderValues = (state: IIpbeEditState) => videoEncoderSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectIpbeEditAudioEncoderValues = (state: IIpbeEditState) => audioEncoderSelectors.selectIpbeEditAudioEncoderValues(state[IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]);
export const selectIpbeEditMpegTsMuxerValues = (state: IIpbeEditState) => mpegTsMuxerSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]);
export const selectIpbeEditRtpMuxerValues = (state: IIpbeEditState) => rtpMuxerSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_EDIT_RTP_MUXER_SLICE_NAME]);
export const selectIpbeEditAdvancedValues = (state: IIpbeEditState) => advancedSelectors.selectIpbeEditAdvancedValues(state[IPBE_EDIT_ADVANCED_SLICE_NAME]);
