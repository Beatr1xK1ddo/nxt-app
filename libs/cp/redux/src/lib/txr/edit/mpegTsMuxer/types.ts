import {ETxrMuxer, IFormError, Optional} from "@nxt-ui/cp/types";

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

export type ITxrEditMpegTsMuxerErrors = {
    [key in EMpegTsMuxerFormError]: IFormError;
};

export type ITxrEditMpegTsMuxer = {
    muxer: Optional<ETxrMuxer>;
    muxrate: Optional<string>;
    serviceName: Optional<string>;
    serviceProvider: Optional<string>;
    programNumber: Optional<number>;
    videoPid: Optional<number>;
    audioPid: Optional<number>;
    pmtPid: Optional<number>;
    pmtPeriod: Optional<number>;
    pcrPid: Optional<number>;
    pcrPeriod: Optional<number>;
    tsId: Optional<number>;
    addScte: Optional<string>;
};

export type ITxrEditMpegTsMuxerState = {
    values: ITxrEditMpegTsMuxer;
    errors: ITxrEditMpegTsMuxerErrors;
};
