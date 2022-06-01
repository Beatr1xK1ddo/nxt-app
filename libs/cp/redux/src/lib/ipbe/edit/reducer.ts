import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeEditState} from "./types";
import ipbeEditStateReducer, {IPBE_EDIT_STATUS_SLICE_NAME} from "./status";
import ipbeEditMainReducer, {IPBE_EDIT_MAIN_SLICE_NAME} from "./main";
import ipbeEditVideoEncoderReducer, {IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME} from "./videoEncoder";
import ipbeEditAdvancedReducer, {IPBE_EDIT_ADVANCED_SLICE_NAME} from "./advanced";
import ipbeAudioEncodersReducer, {IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME} from "./audioEncoder";
import ipbeMpegTsMuxerReducer, {IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME} from "./mpegTsMuxer";
import ipbeRTPMuxerReducer, {IPBE_EDIT_RTP_MUXER_SLICE_NAME} from "./rtpMuxer";
import ipbeEncoderVersionsReducer, {ENCODER_VERSIONS_SLICE_NAME} from "./encoderVersions/slice";

const ipbeEditReducer = combineReducers<IIpbeEditState>({
    [IPBE_EDIT_STATUS_SLICE_NAME]: ipbeEditStateReducer,
    [IPBE_EDIT_MAIN_SLICE_NAME]: ipbeEditMainReducer,
    [IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]: ipbeEditVideoEncoderReducer,
    [IPBE_EDIT_ADVANCED_SLICE_NAME]: ipbeEditAdvancedReducer,
    [IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]: ipbeAudioEncodersReducer,
    [IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]: ipbeMpegTsMuxerReducer,
    [IPBE_EDIT_RTP_MUXER_SLICE_NAME]: ipbeRTPMuxerReducer,
    [ENCODER_VERSIONS_SLICE_NAME]: ipbeEncoderVersionsReducer,
});

export default ipbeEditReducer;
