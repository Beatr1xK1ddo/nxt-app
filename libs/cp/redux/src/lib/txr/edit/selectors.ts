import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditState} from "./types";
import {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import {TXR_EDIT_MAIN_SLICE_NAME, mainSelectors} from "./main";
import {TXR_EDIT_VIDEO_ENCODER_SLICE_NAME, videoEncoderSelectors} from "./videoEncoder";
import {ENCODER_VERSIONS_SLICE_NAME, encoderVersionsSelector} from "./encoderVersions";
import {TXR_EDIT_AUDIO_ENCODER_SLICE_NAME, audioEncoderSelectors} from "./audioEncoder";
import {TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME, mpegTsMuxerSelectors} from "./mpegTsMuxer";
import {TXR_EDIT_RTP_MUXER_SLICE_NAME, rtpMuxerSelectors} from "./rtpMuxer";
import {VIDEO_CONNECTIONS_SLICE_NAME, videoConnectionsSelector} from "./videoConnections";
import {TXR_EDIT_ADVANCED_SLICE_NAME, advancedSelectors} from "./advanced";
import {stateValidator} from "./utils";

export const selectTxrEditVideoConnections = (state: ITxrEditState) =>
    videoConnectionsSelector.selectVideoConnectionValues(state[VIDEO_CONNECTIONS_SLICE_NAME]);

export const selectTxrEditStatus = (state: ITxrEditState) => state[TXR_EDIT_STATUS_SLICE_NAME];
export const selectTxrEditMainId = (state: ITxrEditState) => state[TXR_EDIT_MAIN_SLICE_NAME].values.id;
export const selectBasicApplication = (state: ITxrEditState) =>
    mainSelectors.selectBasicApplication(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainApplication = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainApplication(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainOutputType = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainOutputType(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditNode = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditNode(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainValues = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainValues(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainErrors = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainErrors(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainStatus = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainStatus(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainStartedAtMs = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainStartedAtMs(state[TXR_EDIT_MAIN_SLICE_NAME]);

export const selectTxrEditVideoEncoderValues = (state: ITxrEditState) =>
    videoEncoderSelectors.selectTxrEditVideoEncoderValues(state[TXR_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectTxrEditVideoEncoderErrors = (state: ITxrEditState) =>
    videoEncoderSelectors.selectTxrEditVideoEncoderErrors(state[TXR_EDIT_VIDEO_ENCODER_SLICE_NAME]);

export const selectTxrEditAudioEncoderValues = (state: ITxrEditState) =>
    audioEncoderSelectors.selectTxrEditAudioEncoderValues(state[TXR_EDIT_AUDIO_ENCODER_SLICE_NAME]);
export const selectTxrEditAudioEncoderDirty = (state: ITxrEditState, index: number) =>
    audioEncoderSelectors.selectTxrEditAudioEncoderDirty(state[TXR_EDIT_AUDIO_ENCODER_SLICE_NAME], index);
export const selectTxrEditAudioEncoderErrors = (state: ITxrEditState) =>
    audioEncoderSelectors.selectTxrEditAudioEncoderErrors(state[TXR_EDIT_AUDIO_ENCODER_SLICE_NAME]);

export const selectTxrEditMpegTsMuxerValues = (state: ITxrEditState) =>
    mpegTsMuxerSelectors.selectTxrEditMpegTsMuxerValues(state[TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME]);
export const selectTxrEditMpegTsMuxerErrors = (state: ITxrEditState) =>
    mpegTsMuxerSelectors.selectTxrEditMpegTsMuxerErrors(state[TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME]);
export const selectTxrEditMpegTsMuxerError = (state: ITxrEditState) =>
    mpegTsMuxerSelectors.selectTxrEditMpegTsMuxerError(state[TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME]);

export const selectTxrEditRtpMuxerValues = (state: ITxrEditState) =>
    rtpMuxerSelectors.selectTxrEditRtpMuxerValues(state[TXR_EDIT_RTP_MUXER_SLICE_NAME]);
export const selectTxrEditRtpMuxerErrors = (state: ITxrEditState) =>
    rtpMuxerSelectors.selectTxrEditRtpMuxerErrors(state[TXR_EDIT_RTP_MUXER_SLICE_NAME]);
export const selectTxrEditRtpMuxerError = (state: ITxrEditState) =>
    rtpMuxerSelectors.selectTxrEditRtpMuxerError(state[TXR_EDIT_RTP_MUXER_SLICE_NAME]);

export const selectTxrEditAdvancedValues = (state: ITxrEditState) =>
    advancedSelectors.selectTxrEditAdvancedValues(state[TXR_EDIT_ADVANCED_SLICE_NAME]);
export const selectTxrEditAdvancedImageUrl = (state: ITxrEditState) =>
    advancedSelectors.selectTxrEditAdvancedImageUrl(state[TXR_EDIT_ADVANCED_SLICE_NAME]);
export const selectTxrEditAdvancedErrors = (state: ITxrEditState) =>
    advancedSelectors.selectTxrEditAdvancedErrors(state[TXR_EDIT_ADVANCED_SLICE_NAME]);
export const selectTxrEditAdvancedError = (state: ITxrEditState) =>
    advancedSelectors.selectTxrEditAdvancedError(state[TXR_EDIT_ADVANCED_SLICE_NAME]);

export const selectEncoderVersions = (state: ITxrEditState) =>
    encoderVersionsSelector.selectEncoderVersionsRootState(state[ENCODER_VERSIONS_SLICE_NAME]);
export const selectTxrEditMainName = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainName(state[TXR_EDIT_MAIN_SLICE_NAME]);

export const selectTxrEditValidStatus = createSelector(
    [
        selectTxrEditMainErrors,
        selectTxrEditVideoEncoderErrors,
        selectTxrEditAudioEncoderErrors,
        selectTxrEditMpegTsMuxerErrors,
        selectTxrEditRtpMuxerErrors,
        selectTxrEditAdvancedErrors,
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
export const selectTxrEditMainError = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainError(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditVideoEncoderError = (state: ITxrEditState) =>
    videoEncoderSelectors.selectTxrEditVideoEncoderError(state[TXR_EDIT_VIDEO_ENCODER_SLICE_NAME]);
export const selectTxrEditAudioEncoderError = (state: ITxrEditState) =>
    audioEncoderSelectors.selectTxrEditAudioEncoderError(state[TXR_EDIT_AUDIO_ENCODER_SLICE_NAME]);
