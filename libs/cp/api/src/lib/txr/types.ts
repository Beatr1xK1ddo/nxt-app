import {ETxrAudioCodec, ETxrAudioEncoderChannels, ETxrVideoConnection, NumericId, Optional} from "@nxt-ui/cp/types";
import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "../common";

export import EApiTxrAudioCodec = ETxrAudioCodec;

export import EApiTxrAudioEncoderChannels = ETxrAudioEncoderChannels;

export enum EApiTxrBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,
}

export type IApiTxrEditErrorField = {
    error: string;
    key: keyof IApiTxr;
    message: string;
};

export type IApiIpbeEditErrorResponse = {
    origin: string;
    errors: Array<IApiTxrEditErrorField>;
};

export type IApiTxrListItemDestinations = {
    id: number;
    outputIp: string;
    ttl: number;
    outputPort: number;
};

export type IApiTxrDestinations = {
    output_port: number;
    output_ip: string;
};

export type IApiTxrListItemAudioEncoder = {
    id: number;
    codec: string;
    bitrate: number;
};

export interface IApiTxrListItem {
    id: number;
    name: string;
    appType: string;
    startedAtMs: null | number;
    txNode: number | null;
    rxNode: number | null;
    company: null | number;
    status: EApiAppGeneralStatus;
    statusChange: EApiAppGeneralStatusChange;
    sourceIp: string;
    sourcePort: string;
    destinationIp: string;
    destinationPort: string;
    rxRunMonitor: string;
}

export enum EApiTxrTimeCodeType {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export type IApiTxrEditAudioEncoder = {
    id?: number;
    pid?: number;
    codec: EApiTxrAudioCodec;
    bitrate: number; // select
    sdiPair: number; // select
    ac3DialogueLevel: number; // default 0 select
    channels?: EApiTxrAudioEncoderChannels;
    language?: string;
};

export enum EApiTxrVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
}

export enum EApiTxrPreset {
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

export enum EApiTxrProfile {
    baseline = "baseline",
    main = "main",
    high = "high",
}

export enum EApiTxrLevel {
    "3,0" = "3.0",
    "3,1" = "3.1",
    "3,2" = "3.2",
    "4,0" = "4.0",
    "4,1" = "4.1",
    "4,2" = "4.2",
    "5,0" = "5.0",
    "5,1" = "5.1",
}

export enum EApiTxrAspectRatio {
    "not set" = "not set",
    "4:3" = "4:3",
    "16:9" = "16:9",
}

export enum EApiTxrVideoConnection {
    sdi = "sdi",
    hdmi = "hdmi",
}

export enum EApiTxrApplicationType {
    TXR = "TXR",
    Sdi2Web = "Sdi2Web",
    AVDS2 = "AVDS2",
}

export enum EApiTxrInterlaced {
    auto = -1,
    no = 0,
    yes = 1,
}

export enum EApiTxrLatency {
    normal = "Normal",
    low = "Low latency",
}

export enum EApiTxrMuxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EApiTxrOutputType {
    udp = "udp",
    rtp = "rtp",
}

export enum EApiTxrEncoderVersion {
    v1 = "original txr, r1.0",
    v2 = "ffmpeg for SDI",
    v3 = "custom txr, r1.0.9 nxt primary",
    v4 = "custom txr, r1.0.2 lowest latency only",
    v5 = "custom txr, r1.0.2 real-time bitrate change",
    v3_106 = "static txr, r1.0.6",
    v3_120 = "static txr, r1.2.0",
    v3_130 = "static txr, r1.3.1 (new)",
    avds2 = "avds2",
}

export enum EApiTxrEncoderVideoFormat {
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

export type IApiTxr = {
    //general metadata
    id: number;
    name: string;
    node: number;
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
    inputFormat: Optional<EApiTxrEncoderVideoFormat>;
    videoConnection: Optional<EApiTxrVideoConnection>;
    //processing
    applicationType: EApiTxrApplicationType;
    latency: Optional<EApiTxrLatency>;
    encoderVersion: Optional<EApiTxrEncoderVersion>;
    videoEncoder: Optional<EApiTxrVideoEncoder>; // if type app = SDI2WEB
    txrAudioEncoders: Array<IApiTxrEditAudioEncoder>;
    preset: EApiTxrPreset; // default superfast
    profile: EApiTxrProfile; // default main
    level: number; // default 4.0
    videoBitrate: number; // default 2000
    vbvMaxrate: number; // defautl 2000
    vbvBufsize: number; // default 2000
    aspectRatio: EApiTxrAspectRatio; // not set
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
    muxer: Optional<EApiTxrMuxer>; // select
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
    txrDestinations: Array<IApiTxrDestinations>;
    outputType: Optional<EApiTxrOutputType>;
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
    [key in ETxrVideoConnection]: ETxrVideoConnection;
};

export interface IApiFetchMainSelectValues {
    encoderVersion: {
        avds2: IApiEncoderVersion | null;
        txr: IApiEncoderVersion | null;
        sdi2web: IApiEncoderVersion | null;
    };
    videoConnection: IApiVideoConnections;
}
