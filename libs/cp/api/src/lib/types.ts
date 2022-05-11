import {
    EAspectRatio,
    EBFrameAdaptive,
    EEncoderVersion,
    EInterlaced,
    ELatency,
    ELevel,
    EOutputType,
    EPreset,
    EProfile,
    EAppGeneralStatus,
    EIpbeVideoConnection,
    EVideoEncoder,
    EIpbeEncoderVideoFormat,
    EChannels,
    EMuxer,
    EAppGeneralStatusChange,
} from "@nxt-ui/cp/types";

export type IListApiResponse<T extends APIResponseTypes> = {
    data: T[];
    total: number;
};

export type IIpbeListApiResponse = IListApiResponse<IIpbeListApiItem>;

export interface IIpbeListApiItemAudioEncoder {
    id: number;
    codec: string;
    bitrate: number;
}

export interface IIpbeListApiItemDestinations {
    id: number;
    outputIp: string;
    ttl: number;
    outputPort: number;
}

export interface IIpbeListApiItem {
    id: number;
    name: string;
    status: EAppGeneralStatus;
    statusChange: EAppGeneralStatusChange;
    node: number;
    nodeText: string;
    company: null | number;
    startedAtMs: null | number;
    videoBitrate: null | number;
    ipbeDestinations: Array<IIpbeListApiItemDestinations>;
    ipbeAudioEncoders: Array<IIpbeListApiItemAudioEncoder>;
    cardIdx: null | number;
    inputFormat: null | string;
}

export interface IIpbeCardApiItem {
    id: string;
    name: string;
    status: EAppGeneralStatus;
    statusChange: null | EAppGeneralStatusChange;
    nodeId: number;
    nodeText: string;
    company: null | string;
    startedAtMs: null | number;
    ipbeDestinations: Array<IIpbeListApiItemDestinations>;
    ipbeAudioEncoders: Array<IAudioChannels>;
    applicationType: EApplicationType;
    encoderVersion?: keyof typeof EEncoderVersion;
    inputFormat?: EIpbeEncoderVideoFormat;
    videoConnection?: EIpbeVideoConnection;
    latency?: ELatency;
    outputType?: EOutputType;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    videoEncoder?: EVideoEncoder;
    preset: EPreset;
    profile: EProfile;
    level: ELevel;
    vbitrate: number;
    vbvMaxrate: number;
    vbvBufsize: number;
    aspectRatio?: EAspectRatio;
    keyint: number;
    bframes: number;
    maxRefs?: number;
    lookahead: number;
    openGop: boolean;
    bFrameAdaptive: EBFrameAdaptive;
    scenecutThreshold: number;
    intraRefresh: boolean;
    interlaced: EInterlaced;
    cbr: EYesOrNo;
    threads?: number;
    muxer?: string;
    muxrate?: string;
    serviceName?: string;
    serviceProvider?: string;
    programNumber: number;
    videoPid?: string;
    pmtPid: number;
    pcrPid: number;
    pcrPeriod: number;
    pmtPeriod?: number;
    tsId: number;
    addScte?: string;
    videoPt?: string;
    audioPt?: string;
    addTimecode: boolean;
    enablePsfEncoding: boolean;
    runMonitor: boolean;
    restartOnError: boolean;
    enableLoopback: boolean;
    enablePreviewImages: boolean;
    enableSlateIfNoSignal: boolean;
    slateImage?: string;
}

export enum ETimeCodeType {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

export enum EApplicationType {
    IPBE = "IPBE",
    Sdi2Web = "Sdi2Web",
    AVDS2 = "AVDS2",
}

export enum ECodec {
    mp2 = "mp2",
    aac = "aac",
    ac3 = "ac3",
}

export type IAudioChannels = {
    id?: number;
    codec: ECodec;
    bitrate: number; // select
    sdiPair: number; // select
    pid?: string;
    ac3DialogueLevel: number; // default 0 select
    channels?: keyof typeof EChannels;
    language?: string;
};

export type IIpbeAudioChannels = Pick<IAudioChannels, "bitrate" | "codec">;

export type IIpbeDestinations = {
    output_port: number;
    output_ip: string;
};

export type INode = {
    is_online: true;
    id: number;
    temperature: number;
    name: string;
    load_average: number;
    cpu: number;
    memory_used: number;
    memory_free: number;
    hostname: string;
    digit_code: string;
    cpu_governor: string;
    cpu_core: number;
};

export type ICompany = {
    id: number;
    name: string;
};

export type APIResponseTypes = IIbpeCard | INode | ICompany;

export type IArrResponse<T extends APIResponseTypes> = {
    total: number;
    data: T[];
};

export type IDestinations = {
    id: number;
    outputIp: string;
    ttl: number; // 64 default
    outputPort: number;
};

export type IIpbe = {
    company?: number;
    startedAtMs?: number; // not in form
    nodeText: string; // not in form
    node: number;
    id: number;
    ipbeDestinations: IIpbeListApiItemDestinations[];
    ipbeAudioEncoders: IAudioChannels[];
    name: string;
    // cardIndex:
    status: EAppGeneralStatus; // not in form
    statusChange?: string;
    applicationType: EApplicationType;
    encoderVersion?: keyof typeof EEncoderVersion;
    inputFormat?: EIpbeEncoderVideoFormat;
    videoConnection?: EIpbeVideoConnection;
    latency?: ELatency;
    outputType?: EOutputType;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    videoEncoder?: EVideoEncoder; // if type app = SDI2WEB
    preset: EPreset; // default superfast
    profile: EProfile; // default main
    level: ELevel; // default 4.0
    vbitrate: number; // default 2000
    vbvMaxrate: number; // defautl 2000
    vbvBufsize: number; // default 2000
    aspectRatio: EAspectRatio; // not set
    keyint: number; // default 30
    bframes: number; // default 2
    maxRefs?: number; // select 0 - 10
    lookahead: number; // default 5
    openGop: boolean; // default false
    bFrameAdaptive: EBFrameAdaptive; // default 0
    scenecutThreshold: number; // 0
    intraRefresh: boolean; // default false
    interlaced: EInterlaced; //default -1
    cbr: boolean; // default false
    threads?: number; // select 0 - 32
    muxer?: EMuxer; // select
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
    runMonitor: boolean; // default true
    restartOnError: boolean; // default true
    enableLoopback: boolean; // default false
    enablePreviewImages: boolean; // default default true
    enableSlateIfNoSignal: boolean; // default true
    slateImage?: string; // string single image
};

export type IIpbeCard = Pick<
    IIpbeCardApiItem,
    | "startedAtMs"
    | "nodeText"
    | "nodeId"
    | "id"
    | "ipbeDestinations"
    | "ipbeAudioEncoders"
    | "name"
    | "status"
    | "statusChange"
    | "inputFormat"
    | "vbitrate"
>;
