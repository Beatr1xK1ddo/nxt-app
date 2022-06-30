import {
    ETxrAspectRatio,
    ETxrBFrameAdaptive,
    ETxrInterlaced,
    ETxrLevel,
    ETxrPreset,
    ETxrProfile,
    ETxrVideoEncoder,
    IFormError,
    Optional,
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

export type ITxrEditVideoEncoderErrors = {
    [key in EVideoEncoderErrors]: IFormError;
};

export type ITxrEditVideoEncoder = {
    videoEncoder: Optional<ETxrVideoEncoder>;
    preset: ETxrPreset;
    profile: ETxrProfile;
    level: ETxrLevel;
    videoBitrate: Optional<string>; // must be float
    vbvMaxrate: Optional<string>; // must be float
    vbvBufsize: Optional<string>; // must be float
    aspectRatio: ETxrAspectRatio;
    keyint: Optional<number>;
    bframes: Optional<ETxrBFrameAdaptive>;
    maxRefs: Optional<number>;
    lookahead: Optional<number>;
    openGop: boolean;
    bFrameAdaptive: boolean;
    scenecutThreshold: Optional<number>;
    interlaced: ETxrInterlaced;
    cbr: boolean;
    intraRefresh: boolean;
    threads: Optional<number>;
};

export type ITxrEditVideoEncoderState = {
    values: ITxrEditVideoEncoder;
    errors: ITxrEditVideoEncoderErrors;
};
