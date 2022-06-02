import {EIpbeMuxer, IFormError} from "@nxt-ui/cp/types";

export enum EMpegTsMuxerFormError {
    muxer = "muxer",
    muxrate = "muxrate",
    serviceName = "serviceName",
    serviceProvider = "serviceProvider",
    programNumber = "programNumber",
    videoPid = "videoPid",
    pmtPid = "pmtPid",
    pmtPeriod = "pmtPeriod",
    pcrPid = "pcrPid",
    pcrPeriod = "pcrPeriod",
    tsId = "tsId",
    addScte = "addScte",
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
