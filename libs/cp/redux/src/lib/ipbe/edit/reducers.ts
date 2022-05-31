import {combineReducers} from "@reduxjs/toolkit";
import {IIpbeEditRootState} from "./types";
import ipbeEditStateReducer from "./slice";
import ipbeEditMainReducer from "./main/slice";
import ipbeEditVideoEncoderReducer from "./videoEncoder/slice";
import ipbeEditAdvancedReducer from "./advanced/slice";
import ipbeAudioEncodersReducer from "./audioEncoders/slice";
import ipbeMpegTsMuxerReducer from "./mpegTsMuxer/slice";
import ipbeRTPMuxerReducer from "./rtpMuxer/slice";

export const ipbeEditRootReducer = combineReducers<IIpbeEditRootState>({
    status: ipbeEditStateReducer,
    main: ipbeEditMainReducer,
    videoEncoder: ipbeEditVideoEncoderReducer,
    advanced: ipbeEditAdvancedReducer,
    audioEncoder: ipbeAudioEncodersReducer,
    mpegMuxer: ipbeMpegTsMuxerReducer,
    rtpMuxer: ipbeRTPMuxerReducer,
});
