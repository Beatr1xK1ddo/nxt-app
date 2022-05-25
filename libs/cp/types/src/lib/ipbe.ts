import {EAppGeneralStatus, EAppGeneralStatusChange} from "./common";

export type ValueOf<T> = T[keyof T];

export enum EIpbeListViewMode {
    list = "list",
    card = "card",
}

export interface IIpbeListItemAudioEncoder {
    id: number;
    codec: string;
    bitrate: number;
}

export interface IIpbeListItemDestinations {
    id: number;
    outputIp: string;
    ttl: number;
    outputPort: number;
}

export type IApiIpbeListItemDestinations = IIpbeListItemDestinations;

export type IApiIpbeDestinations = IApiIpbeListItemDestinations;

export type IApiIpbeListItemAudioEncoder = IIpbeListItemAudioEncoder;

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

export enum ETimecode {
    "no timecode" = "",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EAvds2Muxer {
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
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

export enum EApiIpbeLatency {
    normal = "Normal",
    low = "Low latency",
}

export enum EApiIpbeOutputType {
    udp = "udp",
    rtp = "rtp",
}

export type IOutputIpPayload = {id: number; value: string};
export type IOutputPortPayload = {id: number; value: number};
