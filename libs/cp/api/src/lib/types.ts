import {
    EApiIpbeApplicationType,
    EApiIpbeAspectRatio,
    EApiIpbeAudioEncoderChannels,
    EApiIpbeBFrameAdaptive,
    EApiIpbeEncoderVersion,
    EApiIpbeEncoderVideoFormat,
    EApiIpbeInterlaced,
    EApiIpbeLatency,
    EApiIpbeLevel,
    EApiIpbeOutputType,
    EApiIpbePreset,
    EApiIpbeProfile,
    EApiIpbeVideoConnection,
    EApiIpbeVideoEncoder,
    IApiIpbeListItemDestinations,
} from "./ipbe";
import {IIpbeAudioEncoder} from "@nxt-ui/cp/types";
import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "./common";

export interface IIpbeCardApiItem {
    id: string;
    name: string;
    cardIdx: number;
    status: EApiAppGeneralStatus;
    statusChange: null | EApiAppGeneralStatusChange;
    nodeId: number;
    nodeText: string;
    company: null | number;
    startedAtMs: null | number;
    ipbeDestinations: Array<IApiIpbeListItemDestinations>;
    ipbeAudioEncoders: Array<EApiIpbeAudioEncoderChannels>;
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
    videoEncoder?: EApiIpbeVideoEncoder;
    preset: EApiIpbePreset;
    profile: EApiIpbeProfile;
    level: typeof EApiIpbeLevel;
    vbitrate: number;
    vbvMaxrate: number;
    vbvBufsize: number;
    aspectRatio?: EApiIpbeAspectRatio;
    keyint: number;
    bframes: number;
    maxRefs?: number;
    lookahead: number;
    openGop: boolean;
    bFrameAdaptive: typeof EApiIpbeBFrameAdaptive;
    scenecutThreshold: number;
    intraRefresh: boolean;
    interlaced: typeof EApiIpbeInterlaced;
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

export type IApiIpbeAudioChannels = Pick<IIpbeAudioEncoder, "bitrate" | "codec">;

export enum ETimeCodeType {
    empty = "empty",
    notempty = "notempty",
    rp188 = "rp188",
    vitc = "vitc",
}

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
