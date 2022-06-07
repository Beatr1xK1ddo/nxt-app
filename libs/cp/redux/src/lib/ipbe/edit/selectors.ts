import {createSelector} from "@reduxjs/toolkit";
import {IIpbeEditState} from "./types";
import {IPBE_EDIT_STATUS_SLICE_NAME} from "./status";
import {IPBE_EDIT_MAIN_SLICE_NAME, mainSelectors} from "./main";
import {IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME, videoEncoderSelectors} from "./videoEncoder";
import {ENCODER_VERSIONS_SLICE_NAME, encoderVersionsSelector} from "./encoderVersions";
import {IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME, audioEncoderSelectors} from "./audioEncoder";
import {IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME, mpegTsMuxerSelectors} from "./mpegTsMuxer";
import {IPBE_EDIT_RTP_MUXER_SLICE_NAME, rtpMuxerSelectors} from "./rtpMuxer";
import {VIDEO_CONNECTIONS_SLICE_NAME, videoConnectionsSelector} from "./videoConnections";
import {IPBE_EDIT_ADVANCED_SLICE_NAME, advancedSelectors} from "./advanced";
import {stateValidator} from "./utils";

export const selectIpbeEditVideoConnections = (state: IIpbeEditState) =>
    videoConnectionsSelector.selectVideoConnectionValues(state[VIDEO_CONNECTIONS_SLICE_NAME]);

export const selectIpbeEditStatus = (state: IIpbeEditState) => state[IPBE_EDIT_STATUS_SLICE_NAME];
export const selectIpbeEditMainId = (state: IIpbeEditState) => state[IPBE_EDIT_MAIN_SLICE_NAME].values.id;
export const selectBasicApplication = (state: IIpbeEditState) =>
    mainSelectors.selectBasicApplication(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditMainApplication = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainApplication(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditMainOutputType = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainOutputType(state[IPBE_EDIT_MAIN_SLICE_NAME]);
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

export const selectEncoderVersions = (state: IIpbeEditState) =>
    encoderVersionsSelector.selectEncoderVersionsRootState(state[ENCODER_VERSIONS_SLICE_NAME]);
export const selectIpbeEditMainName = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainName(state[IPBE_EDIT_MAIN_SLICE_NAME]);

export const selectIpbeEditValidStatus = createSelector(
    [
        selectIpbeEditMainErrors,
        selectIpbeEditVideoEncoderErrors,
        selectIpbeEditAudioEncoderErrors,
        selectIpbeEditMpegTsMuxerErrors,
        selectIpbeEditRtpMuxerErrors,
        selectIpbeEditAdvancedErrors,
    ],
    (main, videoEncoder, audioEncoder, mpegTs, rtp, advanced) => {
        const states = [main, videoEncoder, audioEncoder, mpegTs, rtp, advanced];
        for (const state of states) {
            const valid = stateValidator(state);
            if (!valid) return false;
        }
        return true;
    }
);
export const selectIpbeEditMainError = (state: IIpbeEditState) =>
    mainSelectors.selectIpbeEditMainError(state[IPBE_EDIT_MAIN_SLICE_NAME]);
export const selectIpbeEditVideoEncoderError = (state: IIpbeEditState) =>
    videoEncoderSelectors.selectIpbeEditVideoEncoderError(state[IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectIpbeEditAudioEncoderError = (state: IIpbeEditState) =>
    audioEncoderSelectors.selectIpbeEditAudioEncoderError(state[IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]);
