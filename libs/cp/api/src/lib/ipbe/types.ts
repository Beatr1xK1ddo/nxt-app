import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "../common";
import {
    EApiIpbeApplicationType,
    EApiIpbeEncoderVersion,
    EApiIpbeEncoderVideoFormat,
    EApiIpbeLatency,
    EApiIpbeOutputType,
    EApiIpbeVideoConnection,
    IApiIpbeDestinations,
    IApiIpbeListItemAudioEncoder,
    IApiIpbeListItemDestinations,
    IIpbeListItem,
} from "@nxt-ui/cp/types";

export interface IApiIpbeListItem extends IIpbeListItem {
    id: number;
    name: string;
    status: EApiAppGeneralStatus;
    statusChange: EApiAppGeneralStatusChange;
    node: number;
    nodeText: string;
    company: null | number;
    startedAtMs: null | number;
    videoBitrate: null | number;
    ipbeDestinations: Array<IApiIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<IApiIpbeListItemAudioEncoder>;
    cardIdx: null | number;
    inputFormat: null | string;
}

export enum EApiIpbeTimeCodeType {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EApiIpbeAudioCodec {
    mp2 = "mp2",
    aac = "aac",
    ac3 = "ac3",
}

export enum EApiIpbeAudioEncoderChannels {
    Default = "",
    Mono = "mono",
    Stereo = "stereo",
    "5.0" = "5.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "5.1" = "5.1",
}

export interface IApiIpbeAudioEncoder {
    id?: number;
    pid?: string;
    codec: EApiIpbeAudioCodec;
    bitrate: number; // select
    sdiPair: number; // select
    ac3DialogueLevel: number; // default 0 select
    channels?: EApiIpbeAudioEncoderChannels;
    language?: string;
}

export enum EApiIpbeVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
}

export enum EApiIpbePreset {
    default = "default",
    medium = "medium",
    ultrafast = "ultrafast",
    superfast = "superfast",
    veryfast = "veryfast",
    faster = "faster",
    fast = "fast",
    hp = "hp",
    hq = "hq",
    ll = "ll",
    llhq = "llhq",
    llhp = "llhp",
}

export enum EApiIpbeProfile {
    baseline = "baseline",
    main = "main",
    high = "high",
}

export enum EApiIpbeLevel {
    "3,0" = "3.0",
    "3,1" = "3.1",
    "3,2" = "3.2",
    "4,0" = "4.0",
    "4,1" = "4.1",
    "4,2" = "4.2",
    "5,0" = "5.0",
    "5,1" = "5.1",
}

export enum EApiIpbeAspectRatio {
    "not set" = "not set",
    "4:3" = "4:3",
    "16:9" = "16:9",
}

export enum EApiIpbeBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,
}

export enum EApiIpbeInterlaced {
    auto = -1,
    no = 0,
    yes = 1,
}

export enum EApiIpbeMuxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export type IApiIpbe = {
    //general metadata
    id: number;
    name: string;
    node: number;
    nodeText: string; // not in form
    company?: number;
    startedAtMs?: number; // not in form
    status: EApiAppGeneralStatus; // not in form
    statusChange?: EApiAppGeneralStatusChange;
    runMonitor: boolean; // default true
    restartOnError: boolean; // default true
    enableLoopback: boolean; // default false
    enablePreviewImages: boolean; // default default true
    enableSlateIfNoSignal: boolean; // default true
    slateImage?: string; // string single image
    cardIdx: number;
    //input
    inputFormat?: EApiIpbeEncoderVideoFormat;
    videoConnection?: EApiIpbeVideoConnection;
    //processing
    applicationType: EApiIpbeApplicationType;
    latency?: EApiIpbeLatency;
    encoderVersion?: EApiIpbeEncoderVersion;
    videoEncoder?: EApiIpbeVideoEncoder; // if type app = SDI2WEB
    ipbeAudioEncoders: Array<IApiIpbeAudioEncoder>;
    preset: EApiIpbePreset; // default superfast
    profile: EApiIpbeProfile; // default main
    level: EApiIpbeLevel; // default 4.0
    vbitrate: number; // default 2000
    vbvMaxrate: number; // defautl 2000
    vbvBufsize: number; // default 2000
    aspectRatio: EApiIpbeAspectRatio; // not set
    keyint: number; // default 30
    bframes: number; // default 2
    maxRefs?: number; // select 0 - 10
    lookahead: number; // default 5
    openGop: boolean; // default false
    bFrameAdaptive: EApiIpbeBFrameAdaptive; // default 0
    scenecutThreshold: number; // 0
    intraRefresh: boolean; // default false
    interlaced: EApiIpbeInterlaced; //default -1
    cbr: boolean; // default false
    threads?: number; // select 0 - 32
    muxer?: EApiIpbeMuxer; // select
    muxrate?: string;
    serviceName?: string;
    serviceProvider?: string;
    programNumber: number; // default 1
    videoPid?: string;
    pmtPid: number; // default 256
    pcrPid: number; // default 512
    pcrPeriod: number; // default 38
    pmtPeriod?: number;
    tsId: number; // default 1
    addScte?: string;
    videoPt?: string;
    audioPt?: string;
    addTimecode: boolean; // default false
    enablePsfEncoding: boolean; // default false
    //output
    ipbeDestinations: Array<IApiIpbeDestinations>;
    outputType?: EApiIpbeOutputType;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
};
