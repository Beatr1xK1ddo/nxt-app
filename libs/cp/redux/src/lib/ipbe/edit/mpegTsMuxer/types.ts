import {EIpbeApplicationType, EIpbeMuxer, IFormError, ISdiValues, Optional} from "@nxt-ui/cp/types";

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
    muxer: Optional<EIpbeMuxer>;
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

export type IIpbeEditMpegTsMuxerState = {
    values: IIpbeEditMpegTsMuxer;
    errors: IIpbeEditMpegTsMuxerErrors;
};

export type IOutputIpPayload = {id: number; value: string};
export type IOutputPortPayload = {id: number; value: number};

export type IValidateIpbePayload = {
    sdiValues?: ISdiValues;
    applicationType: keyof typeof EIpbeApplicationType;
};
