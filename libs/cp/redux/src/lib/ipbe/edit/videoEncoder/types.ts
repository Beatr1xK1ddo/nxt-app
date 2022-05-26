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

export enum EVideoEncoderFormError {
    videoEncoder = "videoEncoderError",
    preset = "presetError",
    profile = "profileError",
    level = "levelError",
    vbitrate = "vbitrateError",
    vbvMaxrate = "vbvMaxrateError",
    vbvBufsize = "vbvBufsizeError",
    aspectRatio = "aspectRatioError",
    keyint = "keyintError",
    bframes = "bframesError",
    maxRefs = "maxRefsError",
    lookahead = "lookaheadError",
    openGop = "openGopError",
    bFrameAdaptive = "bFrameAdaptiveError",
    scenecutThreshold = "scenecutThresholdError",
    interlaced = "interlacedError",
    cbr = "cbrError",
    intraRefresh = "intraRefreshError",
    threads = "threadsError",
}

export type IIpbeEditVideoEncoderErrorsState = {
    [key in EVideoEncoderFormError]: IFormError;
};

export type IIpbeEditVideoEncoder = {
    videoEncoder?: EIpbeVideoEncoder;
    preset: EIpbePreset;
    profile: EIpbeProfile;
    level: EIpbeLevel;
    vbitrate: number;
    vbvMaxrate: number;
    vbvBufsize: number;
    aspectRatio: EIpbeAspectRatio;
    keyint: number;
    bframes: number;
    maxRefs?: number;
    lookahead: number;
    openGop: boolean;
    bFrameAdaptive: EIpbeBFrameAdaptive;
    scenecutThreshold: number;
    interlaced: EIpbeInterlaced;
    cbr: boolean;
    intraRefresh: boolean;
    threads?: number;
};

export type IIpbeEditVideoEncoderTabState = {
    errors: IIpbeEditVideoEncoderErrorsState;
    values: Partial<IIpbeEditVideoEncoder>;
};
