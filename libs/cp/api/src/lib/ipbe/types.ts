import {
    EIpbeAudioCodec,
    EIpbeAudioEncoderChannels,
    EIpbeVideoConnection,
    NumericId,
    Optional,
    EApiAppType,
} from "@nxt-ui/cp/types";
import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "../common";

export import EApiIpbeAudioCodec = EIpbeAudioCodec;

export import EApiIpbeAudioEncoderChannels = EIpbeAudioEncoderChannels;

export enum EApiIpbeBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,
}

export type IApiIpbeEditErrorField = {
    error: string;
    key: keyof IApiIpbe;
    message: string;
};

export type IApiIpbeEditErrorResponse = {
    origin: string;
    errors: Array<IApiIpbeEditErrorField>;
};

export type IApiIpbeListItemDestinations = {
    id: number;
    outputIp: string;
    ttl: number;
    outputPort: number;
};

export type IApiIpbeDestinations = {
    output_port: number;
    output_ip: string;
};

export type IApiIpbeListItemAudioEncoder = {
    id: number;
    codec: string;
    bitrate: number;
};

export interface IApiIpbeListItem {
    id: number;
    name: string;
    status: EApiAppGeneralStatus;
    statusChange: EApiAppGeneralStatusChange;
    node: number;
    nodeText: string;
    company: Optional<number>;
    startedAtMs: null | number;
    videoBitrate: null | number;
    ipbeDestinations: Array<IApiIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<IApiIpbeListItemAudioEncoder>;
    sdiDevice: null | number;
    inputFormat: null | string;
    runMonitor: boolean;
    isEndpoint: boolean;
    _appType: EApiAppType;
}

export enum EApiIpbeTimeCodeType {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export type IApiIpbeEditAudioEncoder = {
    id?: number;
    pid?: number;
    codec: EApiIpbeAudioCodec;
    bitrate: number; // select
    sdiPair: number; // select
    ac3DialogueLevel: number; // default 0 select
    channels?: EApiIpbeAudioEncoderChannels;
    language?: string;
};

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

export enum EApiIpbeVideoConnection {
    sdi = "sdi",
    hdmi = "hdmi",
}

export enum EApiIpbeApplicationType {
    IPBE = "IPBE",
    Sdi2Web = "Sdi2Web",
    AVDS2 = "AVDS2",
}

export enum EApiIpbeInterlaced {
    auto = -1,
    no = 0,
    yes = 1,
}

export enum EApiIpbeLatency {
    normal = "Normal",
    low = "Low latency",
}

export enum EApiIpbeMuxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EApiIpbeOutputType {
    udp = "udp",
    rtp = "rtp",
}

export enum EApiIpbeEncoderVersion {
    v1 = "original ipbe, r1.0",
    v2 = "ffmpeg for SDI",
    v3 = "custom ipbe, r1.0.9 nxt primary",
    v4 = "custom ipbe, r1.0.2 lowest latency only",
    v5 = "custom ipbe, r1.0.2 real-time bitrate change",
    v3_106 = "static ipbe, r1.0.6",
    v3_120 = "static ipbe, r1.2.0",
    v3_130 = "static ipbe, r1.3.1 (new)",
    avds2 = "avds2",
}

export enum EApiIpbeEncoderVideoFormat {
    PAL = "PAL",
    NTSC = "NTSC",
    "720p50" = "720p50",
    "720p59.94" = "720p59.94",
    "720p60" = "720p60",
    "1080i50" = "1080i50",
    "1080i59.94" = "1080i59.94",
    "1080i60" = "1080i60",
    "1080p23.98" = "1080p23.98",
    "1080p24" = "1080p24",
    "1080p25" = "1080p25",
    "1080p29.97" = "1080p29.97",
    "1080p30" = "1080p30",
    "1080p50" = "1080p50",
    "1080p59.94" = "1080p59.94",
    "1080p60" = "1080p60",
}

export type IApiIpbe = {
    //general metadata
    id: number;
    name: string;
    node: number;
    _appType: EApiAppType;
    company: Optional<NumericId>;
    startedAtMs: Optional<number>; // not in form
    status: EApiAppGeneralStatus; // not in form
    statusChange: Optional<EApiAppGeneralStatusChange>;
    runMonitor: boolean; // default true
    restartOnError: boolean; // default true
    enableLoopback: boolean; // default false
    enablePreviewImages: boolean; // default default true
    enableSlateIfNoSignal: boolean; // default true
    slateImage: Optional<string>; // string single image
    slateImageUrl: Optional<string>;
    sdiDevice: Optional<number>;
    //input
    inputFormat: Optional<EApiIpbeEncoderVideoFormat>;
    videoConnection: Optional<EApiIpbeVideoConnection>;
    //processing
    applicationType: EApiIpbeApplicationType;
    latency: Optional<EApiIpbeLatency>;
    encoderVersion: Optional<EApiIpbeEncoderVersion>;
    videoEncoder: Optional<EApiIpbeVideoEncoder>; // if type app = SDI2WEB
    ipbeAudioEncoders: Array<IApiIpbeEditAudioEncoder>;
    preset: EApiIpbePreset; // default superfast
    profile: EApiIpbeProfile; // default main
    level: number; // default 4.0
    videoBitrate: number; // default 2000
    vbvMaxrate: number; // defautl 2000
    vbvBufsize: number; // default 2000
    aspectRatio: EApiIpbeAspectRatio; // not set
    keyint: number; // default 30
    bframes: number; // default 2
    maxRefs: Optional<number>; // select 0 - 10
    lookahead: number; // default 5
    openGop: boolean; // default false
    bFrameAdaptive: boolean; // default 0
    scenecutThreshold: number; // 0
    intraRefresh: boolean; // default false
    interlaced: number; //default -1
    cbr: boolean; // default false
    threads: Optional<number>; // select 0 - 32
    muxer: Optional<EApiIpbeMuxer>; // select
    muxrate: Optional<number>;
    serviceName: Optional<string>;
    serviceProvider: Optional<string>;
    programNumber: number; // default 1
    pmtPid: number; // default 256
    pcrPid: number; // default 512
    pcrPeriod: number; // default 38
    pmtPeriod: Optional<number>;
    tsId: number; // default 1
    addScte: Optional<string>;
    videoPid: Optional<number>;
    audioPid: number;
    addTimecode: boolean; // default false
    enablePsfEncoding: boolean; // default false
    isEndpoint: boolean; // default false
    //output
    ipbeDestinations: Array<IApiIpbeDestinations>;
    outputType: Optional<EApiIpbeOutputType>;
    videoOutputIp: Optional<string>;
    videoOutputPort: Optional<number>;
    audioOutputIp: Optional<string>;
    audioOutputPort: Optional<number>;
    //rtp muxer
    videoPt: Optional<number>;
    audioPt: Optional<number>;
};

export type IApiEncoderVersion = {
    [key: string]: string;
};

export type IApiVideoConnections = {
    [key in EIpbeVideoConnection]: EIpbeVideoConnection;
};

export interface IApiFetchMainSelectValues {
    encoderVersion: {
        avds2: IApiEncoderVersion | null;
        ipbe: IApiEncoderVersion | null;
        sdi2web: IApiEncoderVersion | null;
    };
    videoConnection: IApiVideoConnections;
}
