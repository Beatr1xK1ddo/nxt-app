import {EDataProcessingStatus, IFormError} from "@nxt-ui/cp/types";
import {IIpbeEditAdvancedTabState} from "./advanced/types";
import {IIpbeEditAudioEncodersTabState} from "./audioEncoders/types";
import {IIpbeEditMainTabState} from "./main/types";
import {IIpbeEditMpegTsMuxerTabState} from "./mpegTsMuxer/types";
import {IIpbeEditRTPMuxerTabState} from "./rtpMuxer/types";
import {IIpbeEditVideoEncoderTabState} from "./videoEncoder/types";

export enum EMpegTsMuxerFormError {
    muxer = "muxerError",
    muxrate = "muxrateError",
    serviceName = "serviceNameError",
    serviceProvider = "serviceProviderError",
    programNumber = "programNumberError",
    videoPid = "videoPidError",
    pmtPid = "pmtPidError",
    pmtPeriod = "pmtPeriodError",
    pcrPid = "pcrPidError",
    pcrPeriod = "pcrPeriodError",
    tsId = "tsIdError",
    addScte = "addScteError",
    ipbeAudioEncoders = "ipbeAudioEncodersError",
}

export enum ERTPMuxerError {
    videoPt = "videoPtError",
    audioPt = "audioPtError",
}

export type IRTPMuxerError = {
    [key in ERTPMuxerError]: IFormError;
};

export type IAudioChannelError = {
    codec: IFormError;
    bitrate: IFormError;
    sdiPair: IFormError;
    ac3DialogueLevel: IFormError;
    channels?: IFormError;
    language?: IFormError;
};

export type IFormErrorState<T extends string> = {
    [key in T]: IFormError;
};

export type IMpegTsMuxerErrorState = {
    [key in EMpegTsMuxerFormError]: IFormError;
};

export type IIpbeEditGeneralState = {
    status: EDataProcessingStatus;
    fetchError: IFormError;
};

export type IIpbeEditRootState = {
    // status: EDataProcessingStatus;
    // fetchError: IFormError;
    main: IIpbeEditMainTabState;
    videoEncoder: IIpbeEditVideoEncoderTabState;
    advanced: IIpbeEditAdvancedTabState;
    // audioEncoder: IIpbeEditAudioEncodersTabState;
    // mpegMuxer: IIpbeEditMpegTsMuxerTabState;
    // rtpMuxer: IIpbeEditRTPMuxerTabState;
};
