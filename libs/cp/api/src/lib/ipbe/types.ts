import {IIpbeEditAudioEncoder} from "@nxt-ui/cp/types";
import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "../common";

export enum EApiIpbeBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,
}

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
    company: null | number;
    startedAtMs: null | number;
    videoBitrate: null | number;
    ipbeDestinations: Array<IApiIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<IApiIpbeListItemAudioEncoder>;
    cardIdx: null | number;
    inputFormat: null | string;
    runMonitor: boolean;
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

export type IApiIpbeEditAudioEncoder = IIpbeEditAudioEncoder;

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
    ipbeAudioEncoders: Array<IApiIpbeEditAudioEncoder>;
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
    pmtPid: number; // default 256
    pcrPid: number; // default 512
    pcrPeriod: number; // default 38
    pmtPeriod?: number;
    tsId: number; // default 1
    addScte?: string;
    videoPid?: string;
    audioPid: string;
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
