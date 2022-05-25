import {EApiIpbeMuxer, IApiIpbeAudioEncoder} from "@nxt-ui/cp/api";
import {IFormError} from "@nxt-ui/cp/types";

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

export type IIpbeEditMpegTsMuxerErrorsState = {
    [key in EMpegTsMuxerFormError]: IFormError;
};

export type IIpbeEditMpegTsMuxer = {
    muxer?: EApiIpbeMuxer;
    muxrate?: string;
    serviceName?: string;
    serviceProvider?: string;
    programNumber?: number;
    videoPid?: string;
    pmtPid: number;
    pmtPeriod?: number;
    pcrPid: number;
    pcrPeriod: number;
    tsIdL: number;
    addScte?: string;
    ipbeAudioEncoders: Array<IApiIpbeAudioEncoder>;
};

export type IIpbeEditMpegTsMuxerTabState = {
    errors: IIpbeEditMpegTsMuxerErrorsState;
    values?: Partial<IIpbeEditMpegTsMuxer>;
};
