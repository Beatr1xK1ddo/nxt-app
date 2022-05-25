import {
    EApiIpbeAspectRatio,
    EApiIpbeBFrameAdaptive,
    EApiIpbeInterlaced,
    EApiIpbeLevel,
    EApiIpbePreset,
    EApiIpbeProfile,
    EApiIpbeVideoEncoder,
} from "@nxt-ui/cp/api";
import {IFormError} from "@nxt-ui/cp/types";

enum EVideoEncoderFormError {
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

type IIpbeEditVideoEncoderErrorsState = {
    [key in EVideoEncoderFormError]: IFormError;
};

export type IIpbeEditVideoEncoder = {
    videoEncoder?: EApiIpbeVideoEncoder;
    preset: EApiIpbePreset;
    profile: EApiIpbeProfile;
    level: EApiIpbeLevel;
    vbitrate: number;
    vbvMaxrate: number;
    vbvBufsize: number;
    aspectRatio: EApiIpbeAspectRatio;
    keyint: number;
    bframes: number;
    maxRefs?: number;
    lookahead: number;
    openGop: boolean;
    bFrameAdaptive: EApiIpbeBFrameAdaptive;
    scenecutThreshold: number;
    interlaced: EApiIpbeInterlaced;
    cbr: boolean;
    intraRefresh: boolean;
    threads?: number;
};

export type IIpbeEditVideoEncoderTabState = {
    errors: IIpbeEditVideoEncoderErrorsState;
    values?: Partial<IIpbeEditVideoEncoder>;
};
