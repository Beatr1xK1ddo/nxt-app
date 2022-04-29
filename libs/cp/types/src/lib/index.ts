export enum ECardView {
    card = 'card',
    table = 'table',
}

export type IThumbnailResponse = {
    channel: string;
    imageSrcBase64: string;
};

export enum EStatusTypes {
    active = 'active',
    error = 'error',
    stopped = 'stopped',
    cloned = 'cloned',
    new = 'new',
}

export type IRealtimeAppEvent =
    | IRealtimeAppStatusEvent
    | IRealtimeAppTimingEvent;

export type IRealtimeAppStatusEvent = {
    id: string;
    type: string;
    status: EStatusTypes;
    statusChange: string;
};

export type IRealtimeAppTimingEvent = {
    id: string;
    type: string;
    startedAt: number;
};

export enum EVideoFormat {
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

export enum EVideoConnection {
    sdi = "sdi",
    hdmi = "hdmi",
}

export enum ESystemType {
    generic = "generic",
    lowestlatency = "lowestlatency",
    lowlatency = "lowlatency",
}

export enum EAspectRatio {
    "not set" = "not set",
    "4:3" = "4:3",
    "16:9" = "16:9",
}

export enum EOutputType {
    udp = "udp",
    rtp = "rtp",
}

export enum EProfile {
    baseline = "baseline",
    main = "main",
    high = "high",
}

export enum EYesOrNo {
    yes = "yes",
    no = "no",
}

export enum ELevel {
    "3,0" = "3.0",
    "3,1" = "3.1",
    "3,2" = "3.2",
    "4,0" = "4.0",
    "4,1" = "4.1",
    "4,2" = "4.2",
    "5,0" = "5.0",
    "5,1" = "5.1",
}

export enum EInterlaced {
    auto = -1,
    no = 0,
    yes = 1,
}

export enum EBFrameAdaptive {
    disabled = 0,
    fast = 1,
    slow = 2,

}

export enum ETimecode {
    "no timecode" = "",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
}

export enum EAvds2Muxer{
    libmpegts = "libmpegts",
    mainconcept = "mainconcept",
}

export enum EPreset {
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

export enum EEncoderVersion {
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

export enum ELetency {
    normal = "Normal",
    low = "Low latency",
}