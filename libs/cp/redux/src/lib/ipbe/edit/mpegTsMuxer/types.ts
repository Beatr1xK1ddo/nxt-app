import {EIpbeMuxer, IFormError, IIpbeEditAudioEncoder} from "@nxt-ui/cp/types";

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

export type IIpbeEditMpegTsMuxerErrors = {
    [key in EMpegTsMuxerFormError]: IFormError;
};

export type IIpbeEditMpegTsMuxer = {
    muxer?: EIpbeMuxer;
    muxrate?: number;
    serviceName?: string;
    serviceProvider?: string;
    programNumber?: number;
    videoPid?: number;
    audioPid?: number;
    pmtPid?: number;
    pmtPeriod?: number;
    pcrPid?: number;
    pcrPeriod?: number;
    tsId?: number;
    addScte?: string;
};

export type IIpbeEditMpegTsMuxerState = {
    values: IIpbeEditMpegTsMuxer;
    errors: IIpbeEditMpegTsMuxerErrors;
};
