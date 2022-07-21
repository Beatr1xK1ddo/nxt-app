import {IAppData, INodeData, INodeEventType, StringId} from "./common";
import {
    BasicApplication,
    EAppGeneralStatus,
    EAppGeneralStatusChange,
    NumericId,
    Optional,
    EListViewMode,
} from "./common";

export type ValueOf<T> = T[keyof T];

export enum EIpbeBFrameAdaptive {
    Disabled = 0,
    Fast = 1,
    Slow = 2,
}

export enum EIpbeAudioCodec {
    mp2 = "mp2",
    aac = "aac",
    ac3 = "ac3",
    opus = "opus",
}

export enum EIpbeActions {
    probeSdi = "Probe SDI",
    viewLogs = "View Logs",
    changeView = "Channel View",
    viewHistory = "View History",
    start = "Start",
    restart = "Restart",
    stop = "Stop",
    edit = "Edit",
    monitoring = "Monitoring",
    favorite = "Add to Favourites",
    migrate = "Migrate",
    clone = "Clone",
    delete = "Delete",
}

export enum EIpbeChooseActions {
    start = "Start",
    restart = "Restart",
    stop = "Stop",
    migrate = "Migrate",
    clone = "Clone",
    batchEdit = "Batch Edit",
    delete = "Delete",
}

export type IIpbeAudioEncoder = {
    id?: number;
    codec: EIpbeAudioCodec;
    bitrate?: number; // select
    sdiPair?: number; // select
    pid?: number;
    ac3DialogueLevel: number; // default 0 select
    channels?: EIpbeAudioEncoderChannels;
    language?: string;
};

export interface IIpbeListItemAudioEncoder {
    id: number;
    codec: string;
    bitrate: number;
}

export enum EIpbeAudioEncoderChannels {
    Default = "",
    mono = "mono",
    stereo = "stereo",
    "5.0" = "5.0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "5.1" = "5.1",
}

export interface IIpbeListItemDestination {
    id?: number;
    outputIp: Optional<string>;
    ttl: Optional<number>;
    outputPort: Optional<number>;
}

export interface IpbeListItemProps {
    mode: EListViewMode;
    item: IIpbeListItem;
}

export interface IIpbeListItem extends BasicApplication {
    id: number;
    name: string;
    status: EAppGeneralStatus;
    statusChange: EAppGeneralStatusChange;
    node: number;
    nodeText: string;
    company: Optional<number>;
    startedAtMs: Optional<number>;
    videoBitrate: Optional<number>;
    ipbeDestinations: Array<IIpbeListItemDestination>;
    ipbeAudioEncoders: Array<IIpbeListItemAudioEncoder>;
    sdiDevice: Optional<number>;
    inputFormat: Optional<string>;
    monitoring: boolean;
    isEndpoint: boolean;
}

export enum EIpbeTimeCode {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EIpbeLevel {
    "3.0" = "3",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "3.1" = "3.1",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "3.2" = "3.2",
    "4.0" = "4",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "4.1" = "4.1",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "4.2" = "4.2",
    "5.0" = "5",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "5.1" = "5.1",
}

export enum EIpbeVideoEncoder {
    AVC1 = "AVC1",
    QuickSync = "QuickSync",
    x264 = "x264",
    NVenc = "NVenc",
    VP8 = "VP8",
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

export type ISdiMapperTypes = "R0213" | "0" | "R1234" | null;

export type ISdiValues = {
    values: Array<number>;
    keys: Array<number>;
};

export interface IVideoEncoderListItem {
    key: string;
    value: string;
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
    "AutoDetect" = "Auto Detect",
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

//todo kan: move this to redux
export type IOutputIpPayload = {id: number; value: string};
export type IOutputPortPayload = {id: number; value: number};

//todo kan: move this to redux, do we actually need this?
export type IValidateIpbePayload = {
    sdiValues: ISdiValues | undefined;
    applicationType: EIpbeApplicationType;
};

export enum EChangeStatus {
    start = "start",
    stop = "stop",
}
export type IChangeStatus = {id: NumericId; statusChange: EChangeStatus};
export type IChangeStatuses = Array<IChangeStatus>;

export type IChangeStatusData = {
    statuses: IChangeStatus | IChangeStatuses;
    withMessage?: boolean;
};

export enum ESubscriptionType {
    monitoring = "monitoring",
    qos = "qos",
    app = "app",
    node = "node",
}

export type IMonitoringErrorState = {
    moment: number;
    cc: number;
    syncLosses: number;
};

export type IDeckLinkDeviceStatus = "Init" | "Available" | "Busy" | "No Signal" | "Selected";

export interface IDeckLinkDevice {
    id: number;
    status: IDeckLinkDeviceStatus;
    detectedMode: string;
    pixelFormat: string;
}

export interface IDeckLinkDevices {
    [id: number]: IDeckLinkDevice;
}

export type IDeckLinkDeviceEvent = {
    nodeId: number;
    devices: IDeckLinkDevices;
};

export interface IQosItem {
    cc: number;
    syncLos: number;
}

export interface IQosDataEvent {
    subscriptionType: ESubscriptionType;
    nodeId: number;
    appId: number;
    appType: string;
}

export type IQosDataState = {
    items: Array<number>;
    quality: number;
};

export interface IQosDataPayload extends IQosDataEvent {
    payload: IQosDataState;
}

export type IIpbeTypeLog = {
    appId: number;
    appName: string;
    appType: string;
    created: number;
    message: string;
    nodeId: number;
    subType: string;
    _id: StringId;
};

//newe types

export interface IIpPortOrigin {
    nodeId: number;
    ip: string;
    port: number;
}

export interface IAppIdAppTypeOrigin {
    nodeId: number;
    appId: number;
    appType: string;
}

export interface INodeSubscribeOrigin {
    nodeId: number | number[];
    type: INodeEventType;
}

export interface IMonitoringData {
    moment: number;
    monitoring: {
        bitrate: number;
        muxrate: number;
    };
    errors: {
        syncLosses: number;
        cc: number;
    };
}

export interface IMonitoringState {
    moment: number;
    bitrate: number;
    muxrate: number;
}

export enum EQosItem {
    good,
    warning,
    bad,
}

export interface IQosData {
    items: Array<EQosItem>;
    quality: number;
}

export interface ISubscribeEvent {
    subscriptionType: ESubscriptionType;
    origin: IIpPortOrigin | IAppIdAppTypeOrigin | INodeSubscribeOrigin;
}

export interface IDataEvent extends ISubscribeEvent {
    payload: IMonitoringData | Array<IMonitoringData> | IQosData | INodeData | IAppData;
}
