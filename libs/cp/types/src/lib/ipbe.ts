import {EAppGeneralStatus, EAppGeneralStatusChange} from "./common";

export type ValueOf<T> = T[keyof T];

export enum EIpbeBFrameAdaptive {
    disabled = "0",
    fast = "1",
    slow = "2",
}

export enum EIpbeListViewMode {
    list = "list",
    card = "card",
}

export enum EIpbeAudioCodec {
    mp2 = "mp2",
    aac = "aac",
    ac3 = "ac3",
}

export type IIpbeAudioChannels = {
    id?: number;
    codec: EIpbeAudioCodec;
    bitrate?: number; // select
    sdiPair?: number; // select
    pid?: string;
    ac3DialogueLevel: number; // default 0 select
    channels?: EIpbeAudioEncoderChannels;
    language?: string;
};

export interface IIpbeListItemAudioEncoder {
    id: number;
    codec: string;
    bitrate: number;
}

export interface IIpbeEditAudioEncoder {
    id?: number;
    pid?: string;
    codec: EIpbeAudioCodec;
    bitrate: number; // select
    sdiPair: number; // select
    ac3DialogueLevel: number; // default 0 select
    channels?: EIpbeAudioEncoderChannels;
    language?: string;
}

export enum EIpbeAudioEncoderChannels {
    Default = "",
    Mono = "mono",
    Stereo = "stereo",
    "5.0" = "5.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "5.1" = "5.1",
}

export interface IIpbeListItemDestinations {
    id?: number;
    outputIp: string;
    ttl: number | null;
    outputPort: number | null;
}

export interface IIpbeListItem {
    id: number;
    name: string;
    status: EAppGeneralStatus;
    statusChange: EAppGeneralStatusChange;
    node: number;
    nodeText: string;
    company: null | number;
    startedAtMs: null | number;
    videoBitrate: null | number;
    ipbeDestinations: Array<IIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<IIpbeListItemAudioEncoder>;
    cardIdx: null | number;
    inputFormat: null | string;
}

export enum EIpbeTimeCode {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EIpbeLevel {
    "3.0" = "3.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "3.1" = "3.1",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "3.2" = "3.2",
    "4.0" = "4.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "4.1" = "4.1",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "4.2" = "4.2",
    "5.0" = "5.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "5.1" = "5.1",
}

export const sdiAudioPair = [...Array(9).keys()];

export const maxRefsValues = [...Array(11).keys()];

export const ac3DialogueLevelValues = Array(32)
    .fill(0)
    .map((_, i) => {
        if (i !== 0) {
            return -i;
        } else {
            return i;
        }
    });

export const threadsValues = [...Array(33).keys()];

export enum EIpbeVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
}

export enum ETimecode {
    "no timecode" = "",
    rp188 = "rp188",
    vitc = "vitc",
}

export type IIpbeDestinations = {
    output_port: number;
    output_ip: string;
};

export enum EIpbeMuxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EAvds2Muxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EIpbeProfile {
    baseline = "baseline",
    main = "main",
    high = "high",
}

export enum EIpbeVideoConnection {
    sdi = "sdi",
    hdmi = "hdmi",
}

export enum EIpbeAspectRatio {
    "not set" = "not set",
    "4:3" = "4:3",
    "16:9" = "16:9",
}
// maybe delete this
export enum EIpbeApplicationType {
    IPBE = "IPBE",
    Sdi2Web = "Sdi2Web",
    AVDS2 = "AVDS2",
}

export enum EIpbePreset {
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

export enum EIpbeEncoderVersion {
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

export enum EIpbeEncoderVideoFormat {
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

export enum EIpbeLatency {
    normal = "Normal",
    low = "Low latency",
}

export enum EIpbeInterlaced {
    auto = "-1",
    no = "0",
    yes = "1",
}

export enum EIpbeOutputType {
    udp = "udp",
    rtp = "rtp",
}

export type IOutputIpPayload = {id: number; value: string};
export type IOutputPortPayload = {id: number; value: number};
