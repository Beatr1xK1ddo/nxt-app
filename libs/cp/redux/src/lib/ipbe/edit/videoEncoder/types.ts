import {
    EIpbeAspectRatio,
    EIpbeBFrameAdaptive,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
    IFormError,
} from "@nxt-ui/cp/types";

export enum EVideoEncoderErrors {
    videoEncoder = "videoEncoder",
    preset = "preset",
    profile = "profile",
    level = "level",
    videoBitrate = "videoBitrate",
    vbvMaxrate = "vbvMaxrate",
    vbvBufsize = "vbvBufsize",
    aspectRatio = "aspectRatio",
    keyint = "keyint",
    bframes = "bframes",
    maxRefs = "maxRefs",
    lookahead = "lookahead",
    openGop = "openGop",
    bFrameAdaptive = "bFrameAdaptive",
    scenecutThreshold = "scenecutThreshold",
    interlaced = "interlaced",
    cbr = "cbr",
    intraRefresh = "intraRefresh",
    threads = "threads",
}

export type IIpbeEditVideoEncoderErrors = {
    [key in EVideoEncoderErrors]: IFormError;
};

export type IIpbeEditVideoEncoder = {
    videoEncoder?: EIpbeVideoEncoder;
    preset: EIpbePreset;
    profile: EIpbeProfile;
    level: EIpbeLevel;
    videoBitrate?: number;
    vbvMaxrate?: number;
    vbvBufsize?: number;
    aspectRatio: EIpbeAspectRatio;
    keyint?: number;
    bframes?: EIpbeBFrameAdaptive;
    maxRefs?: number;
    lookahead?: number;
    openGop: boolean;
    bFrameAdaptive: boolean;
    scenecutThreshold?: number;
    interlaced: EIpbeInterlaced;
    cbr: boolean;
    intraRefresh: boolean;
    threads?: number;
};

export type IIpbeEditVideoEncoderState = {
    values: IIpbeEditVideoEncoder;
    errors: IIpbeEditVideoEncoderErrors;
};
