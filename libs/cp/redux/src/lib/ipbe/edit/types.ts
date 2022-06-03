import {IIpbeEditAdvancedState} from "./advanced/types";
import {IIpbeEditAudioEncodersState} from "./audioEncoder/types";
import {IIpbeEditMainState} from "./main/types";
import {IIpbeEditMpegTsMuxerState} from "./mpegTsMuxer/types";
import {IIpbeEditRTPMuxerState} from "./rtpMuxer/types";
import {IIpbeEditVideoEncoderState} from "./videoEncoder/types";
import {IPBE_EDIT_STATUS_SLICE_NAME} from "./status";
import {IPBE_EDIT_MAIN_SLICE_NAME} from "./main";
import {IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME} from "./videoEncoder";
import {IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME} from "./audioEncoder";
import {IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME} from "./mpegTsMuxer";
import {IPBE_EDIT_RTP_MUXER_SLICE_NAME} from "./rtpMuxer";
import {IPBE_EDIT_ADVANCED_SLICE_NAME} from "./advanced";
import {ENCODER_VERSIONS_SLICE_NAME, IEncoderVersion} from "./encoderVersions";

export type IIpbeEditState = {
    [IPBE_EDIT_STATUS_SLICE_NAME]: string;
    [IPBE_EDIT_MAIN_SLICE_NAME]: IIpbeEditMainState;
    [IPBE_EDIT_VIDEO_ENCODER_SLICE_NAME]: IIpbeEditVideoEncoderState;
    [IPBE_EDIT_AUDIO_ENCODER_SLICE_NAME]: IIpbeEditAudioEncodersState;
    [IPBE_EDIT_MPEG_TS_MUXER_SLICE_NAME]: IIpbeEditMpegTsMuxerState;
    [IPBE_EDIT_RTP_MUXER_SLICE_NAME]: IIpbeEditRTPMuxerState;
    [IPBE_EDIT_ADVANCED_SLICE_NAME]: IIpbeEditAdvancedState;
    [ENCODER_VERSIONS_SLICE_NAME]: IEncoderVersion;
};
