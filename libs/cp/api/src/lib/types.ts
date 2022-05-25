import {
    EAspectRatio,
    EBFrameAdaptive,
    EInterlaced,
    ELevel,
    EPreset,
    EProfile,
    EAppGeneralStatus,
    EVideoEncoder,
    EChannels,
    EAppGeneralStatusChange,
    IApiIpbeListItemDestinations,
    EApiIpbeApplicationType,
    EApiIpbeEncoderVersion,
    EApiIpbeEncoderVideoFormat,
    EApiIpbeVideoConnection,
    EApiIpbeLatency,
    EApiIpbeOutputType,
} from "@nxt-ui/cp/types";

export interface IIpbeCardApiItem {
    id: string;
    name: string;
    cardIdx: number;
    status: EAppGeneralStatus;
    statusChange: null | EAppGeneralStatusChange;
    nodeId: number;
    nodeText: string;
    company: null | string;
    startedAtMs: null | number;
    ipbeDestinations: Array<IApiIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<IAudioChannels>;
    applicationType: EApiIpbeApplicationType;
    encoderVersion?: keyof typeof EApiIpbeEncoderVersion;
    inputFormat?: EApiIpbeEncoderVideoFormat;
    videoConnection?: EApiIpbeVideoConnection;
    latency?: EApiIpbeLatency;
    outputType?: EApiIpbeOutputType;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    videoEncoder?: EVideoEncoder;
    preset: EPreset;
    profile: EProfile;
    level: typeof ELevel;
    vbitrate: number;
    vbvMaxrate: number;
    vbvBufsize: number;
    aspectRatio?: EAspectRatio;
    keyint: number;
    bframes: number;
    maxRefs?: number;
    lookahead: number;
    openGop: boolean;
    bFrameAdaptive: typeof EBFrameAdaptive;
    scenecutThreshold: number;
    intraRefresh: boolean;
    interlaced: typeof EInterlaced;
    cbr: boolean;
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
    id: string;
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

export type IArrResponse<T> = {
    total: number;
    data: T[];
};

export type IDestinations = {
    id: number;
    outputIp: string;
    ttl: number; // 64 default
    outputPort: number;
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
