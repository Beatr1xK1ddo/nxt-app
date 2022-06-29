import {ITxrEditAdvancedState} from "./advanced/types";
import {ITxrEditAudioEncodersState} from "./audioEncoder/types";
import {ITxrEditMainState} from "./main/types";
import {ITxrEditMpegTsMuxerState} from "./mpegTsMuxer/types";
import {ITxrEditRTPMuxerState} from "./rtpMuxer/types";
import {ITxrEditVideoEncoderState} from "./videoEncoder/types";
import {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import {TXR_EDIT_MAIN_SLICE_NAME} from "./main";
import {TXR_EDIT_VIDEO_ENCODER_SLICE_NAME} from "./videoEncoder";
import {TXR_EDIT_AUDIO_ENCODER_SLICE_NAME} from "./audioEncoder";
import {TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME} from "./mpegTsMuxer";
import {TXR_EDIT_RTP_MUXER_SLICE_NAME} from "./rtpMuxer";
import {TXR_EDIT_ADVANCED_SLICE_NAME} from "./advanced";
import {ENCODER_VERSIONS_SLICE_NAME, IEncoderVersion} from "./encoderVersions";
import {IVideoConnectionsState, VIDEO_CONNECTIONS_SLICE_NAME} from "./videoConnections";

export type ITxrEditState = {
    [TXR_EDIT_STATUS_SLICE_NAME]: string;
    [TXR_EDIT_MAIN_SLICE_NAME]: ITxrEditMainState;
    [TXR_EDIT_VIDEO_ENCODER_SLICE_NAME]: ITxrEditVideoEncoderState;
    [TXR_EDIT_AUDIO_ENCODER_SLICE_NAME]: ITxrEditAudioEncodersState;
    [TXR_EDIT_MPEG_TS_MUXER_SLICE_NAME]: ITxrEditMpegTsMuxerState;
    [TXR_EDIT_RTP_MUXER_SLICE_NAME]: ITxrEditRTPMuxerState;
    [TXR_EDIT_ADVANCED_SLICE_NAME]: ITxrEditAdvancedState;
    [ENCODER_VERSIONS_SLICE_NAME]: IEncoderVersion;
    [VIDEO_CONNECTIONS_SLICE_NAME]: IVideoConnectionsState;
};
