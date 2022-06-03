import {IIpbeEditState} from "./types";
import {IPBE_EDIT_ADVANCED_SLICE_NAME, advancedSelectors} from "./advanced";
import {IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME, audioEncoderSelectors} from "./audioEncoder";
import {IPBE_EDIT_MAIN_SLICE_NAME, mainSelectors} from "./main";
import {IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME, videoEncoderSelectors} from "./videoEncoder";
import {IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME, mpegTsMuxerSelectors} from "./mpegTsMuxer";
import {IPBE_EDIT_RTP_MUXER_SLICE_NAME, rtpMuxerSelectors} from "./rtpMuxer";
import {ENCODER_VERSIONS_SLICE_NAME, encoderVersionsSelector} from "./encoderVersions";
import {IPBE_EDIT_STATUS_SLICE_NAME} from "./status/slice";
import {IPBE_EDIT_STATE_SLICE_NAME} from "./state";

export const selectIpbeEditStatus = (state: IIpbeEditState) => state[IPBE_EDIT_STATUS_SLICE_NAME];
export const selectIpbeEditState = (state: IIpbeEditState) => state[IPBE_EDIT_STATE_SLICE_NAME];
export const selectIpbeEditMainId = (state: IIpbeEditState) => state[IPBE_EDIT_MAIN_SLICE_NAME].values.id;
export const selectIpbeEditMainApplication = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainApplication(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditNode = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditNode(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditMainValues = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainValues(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditMainErrors = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainErrors(state[IPBE_EDIT_MAIN_SLICE_NAME]);

export const selectIpbeEditVideoEncoderValues = (state: IIpbeEditState) =>
    videoEncoderSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectIpbeEditVideoEncoderErrors = (state: IIpbeEditState) =>
    videoEncoderSelectors.selectIpbeEditVideoEncoderErrors(state[IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]);

export const selectIpbeEditAudioEncoderValues = (state: IIpbeEditState) =>
    audioEncoderSelectors.selectIpbeEditAudioEncoderValues(state[IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]);
export const selectIpbeEditAudioEncoderErrors = (state: IIpbeEditState) =>
    audioEncoderSelectors.selectIpbeEditAudioEncoderErrors(state[IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]);

export const selectIpbeEditMpegTsMuxerValues = (state: IIpbeEditState) =>
    mpegTsMuxerSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]);
export const selectIpbeEditMpegTsMuxerErrors = (state: IIpbeEditState) =>
    mpegTsMuxerSelectors.selectIpbeEditMpegTsMuxerErrors(state[IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]);
export const selectIpbeEditMpegTsMuxerError = (state: IIpbeEditState) =>
    mpegTsMuxerSelectors.selectIpbeEditMpegTsMuxerError(state[IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]);

export const selectIpbeEditRtpMuxerValues = (state: IIpbeEditState) =>
    rtpMuxerSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_EDIT_RTP_MUXER_SLICE_NAME]);
export const selectIpbeEditRtpMuxerErrors = (state: IIpbeEditState) =>
    rtpMuxerSelectors.selectIpbeEditRtpMuxerErrors(state[IPBE_EDIT_RTP_MUXER_SLICE_NAME]);
export const selectIpbeEditRtpMuxerError = (state: IIpbeEditState) =>
    rtpMuxerSelectors.selectIpbeEditRtpMuxerError(state[IPBE_EDIT_RTP_MUXER_SLICE_NAME]);

export const selectIpbeEditAdvancedValues = (state: IIpbeEditState) =>
    advancedSelectors.selectIpbeEditAdvancedValues(state[IPBE_EDIT_ADVANCED_SLICE_NAME]);
export const selectIpbeEditAdvancedErrors = (state: IIpbeEditState) =>
    advancedSelectors.selectIpbeEditAdvancedErrors(state[IPBE_EDIT_ADVANCED_SLICE_NAME]);
export const selectIpbeEditAdvancedError = (state: IIpbeEditState) =>
    advancedSelectors.selectIpbeEditAdvancedError(state[IPBE_EDIT_ADVANCED_SLICE_NAME]);

export const selectEncoderVersionsStatus = (state: IIpbeEditState) =>
    encoderVersionsSelector.selectEncoderVersionsStatus(state[ENCODER_VERSIONS_SLICE_NAME]);
export const selectEncoderVersionsValues = (state: IIpbeEditState) =>
    encoderVersionsSelector.selectEncoderVersionsValues(state[ENCODER_VERSIONS_SLICE_NAME]);
export const selectIpbeEditMainName = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainName(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditMainError = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainError(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditVideoEncoderError = (state: IIpbeEditState) =>
    videoEncoderSelectors.selectIpbeEditVideoEncoderError(state[IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectIpbeEditAudioEncoderError = (state: IIpbeEditState) =>
    audioEncoderSelectors.selectIpbeEditAudioEncoderError(state[IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]);
