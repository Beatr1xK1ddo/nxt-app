import {IIpbeEditAdvancedTabState} from "./advanced/types";
import {IIpbeEditAudioEncodersTabState} from "./audioEncoders/types";
import {IIpbeEditMainTabState} from "./main/types";
import {IIpbeEditMpegTsMuxerTabState} from "./mpegTsMuxer/types";
import {IIpbeEditRTPMuxerTabState} from "./rtpMuxer/types";
import {IIpbeEditVideoEncoderTabState} from "./videoEncoder/types";

export * from "./advanced/types";
export * from "./audioEncoders/types";
export * from "./main/types";
export * from "./mpegTsMuxer/types";
export * from "./rtpMuxer/types";
export * from "./videoEncoder/types";

export type IIpbeEditRootState = {
    status: string;
    main: IIpbeEditMainTabState;
    videoEncoder: IIpbeEditVideoEncoderTabState;
    advanced: IIpbeEditAdvancedTabState;
    audioEncoder: IIpbeEditAudioEncodersTabState;
    mpegMuxer: IIpbeEditMpegTsMuxerTabState;
    rtpMuxer: IIpbeEditRTPMuxerTabState;
};
