import {
    EIpbeAspectRatio,
    EIpbeBFrameAdaptive,
    EIpbeFieldOrder,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
    IFormError,
    Optional,
} from "@nxt-ui/cp/types";

export enum EVideoEncoderFields {
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

export type IVideoEncoderDirty = {
    [key: string]: boolean;
};

export type IIpbeEditVideoEncoderErrors = {
    [key in EVideoEncoderFields]: IFormError;
};

export type IIpbeEditVideoEncoder = {
    videoEncoder: Optional<EIpbeVideoEncoder>;
    preset: EIpbePreset;
    profile: EIpbeProfile;
    level: EIpbeLevel;
    videoBitrate: Optional<string>; // must be float
    vbvMaxrate: Optional<string>; // must be float
    vbvBufsize: Optional<string>; // must be float
    aspectRatio: EIpbeAspectRatio;
    keyint: Optional<number>;
    bframes: Optional<EIpbeBFrameAdaptive>;
    maxRefs: Optional<number>;
    lookahead: Optional<number>;
    openGop: boolean;
    bFrameAdaptive: boolean;
    scenecutThreshold: Optional<number>;
    interlaced: EIpbeInterlaced;
    fieldOrder?: EIpbeFieldOrder;
    cbr: boolean;
    intraRefresh: boolean;
    threads: Optional<number>;
};

export type IIpbeEditVideoEncoderState = {
    values: IIpbeEditVideoEncoder;
    errors: IIpbeEditVideoEncoderErrors;
    dirty: IVideoEncoderDirty;
};
