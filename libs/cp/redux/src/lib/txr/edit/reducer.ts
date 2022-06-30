import {combineReducers} from "@reduxjs/toolkit";
import {ITxrEditState} from "./types";
import txrEditStatusReducer, {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import txrEditMainReducer, {TXR_EDIT_MAIN_SLICE_NAME} from "./main";
import txrEditVideoEncoderReducer, {TXR_EDIT_VIDEO_ENCODER_SLICE_NAME} from "./videoEncoder";
import txrEditAdvancedReducer, {TXR_EDIT_ADVANCED_SLICE_NAME} from "./advanced";
import txrAudioEncodersReducer, {TXR_EDIT_AUDIO_ENCODER_SLICE_NAME} from "./audioEncoder";
import txrMpegTsMuxerReducer, {TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME} from "./mpegTsMuxer";
import txrRTPMuxerReducer, {TXR_EDIT_RTP_MUXER_SLICE_NAME} from "./rtpMuxer";
import txrEncoderVersionsReducer, {ENCODER_VERSIONS_SLICE_NAME} from "./encoderVersions/slice";
import txrVideoConnectionsReducer, {VIDEO_CONNECTIONS_SLICE_NAME} from "./videoConnections";

const txrEditReducer = combineReducers<ITxrEditState>({
    [TXR_EDIT_STATUS_SLICE_NAME]: txrEditStatusReducer,
    [TXR_EDIT_MAIN_SLICE_NAME]: txrEditMainReducer,
    [TXR_EDIT_VIDEO_ENCODER_SLICE_NAME]: txrEditVideoEncoderReducer,
    [TXR_EDIT_ADVANCED_SLICE_NAME]: txrEditAdvancedReducer,
    [TXR_EDIT_AUDIO_ENCODER_SLICE_NAME]: txrAudioEncodersReducer,
    [TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME]: txrMpegTsMuxerReducer,
    [TXR_EDIT_RTP_MUXER_SLICE_NAME]: txrRTPMuxerReducer,
    [ENCODER_VERSIONS_SLICE_NAME]: txrEncoderVersionsReducer,
    [VIDEO_CONNECTIONS_SLICE_NAME]: txrVideoConnectionsReducer,
});

export default txrEditReducer;
