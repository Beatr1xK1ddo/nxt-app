import { EAspectRatio, EBFrameAdaptive, EEncoderVersion, EInterlaced, ELetency, 
    ELevel, EOutputType, EPreset, EProfile, EStatusTypes, EVideoConnection, EVideoEncoder, EVideoFormat, EYesOrNo } from '@nxt-ui/cp/types';

export enum ETimecodeType {
    empty = 'empty',
    notempty = 'notempty',
    rp188 = 'rp188',
    vitc = 'vitc',
}

export enum EApplicationType {
    IPBE = "IPBE",
    Sdi2Web = "Sdi2Web",
    AVDS2 = "AVDS2"
}

export type IAudioChannels = {
    id: number,
    codec: string,
    bitrate: number,
    sdiPair: number,
    pid?: string,
    ac3DialogueLevel: number,
    channels?: string,
    language?: string,
}

export type IIpbeAudioChannels = Pick<IAudioChannels, 'bitrate' | 'codec'>;

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
    id: number,
    outputIp: string,
    ttl: number,
    outputPort: number,
}

export type IIpbe = {
    company?: string,
    startedAtMs?: number,
    nodeText: string,
    nodeId: number,
    id: string,
    ipbeDestinations: IDestinations[],
    ipbeAudioEncoders: IAudioChannels[],
    name: string,
    status: EStatusTypes,
    statusChange?: string,
    applicationType: EApplicationType,
    encoderVersion?: keyof typeof EEncoderVersion,
    inputFormat?: EVideoFormat,
    videoConnection?: EVideoConnection,
    latency?: ELetency,
    outputType?: EOutputType,
    videoOutputIp?: string,
    videoOutputPort?: number,
    audioOutputIp?: string,
    audioOutputPort?: number,
    videoEncoder?: EVideoEncoder,
    preset: EPreset,
    profile: EProfile,
    level: ELevel,
    vbitrate: number,
    vbvMaxrate: number,
    vbvBufsize: number,
    aspectRatio?: EAspectRatio,
    keyint: number,
    bframes: number,
    maxRefs?: number,
    lookahead: number,
    openGop: boolean,
    bFrameAdaptive: EBFrameAdaptive,
    scenecutThreshold: number,
    intraRefresh: boolean,
    interlaced: EInterlaced,
    cbr: EYesOrNo,
    threads?: number,
    muxer?: string,
    muxrate?: string,
    serviceName?: string,
    serviceProvider?: string,
    programNumber: number,
    videoPid?: string,
    pmtPid: number,
    pcrPid: number,
    pcrPeriod: number,
    pmtPeriod?: number,
    tsId: number,
    addScte?: string,
    videoPt?: string,
    audioPt?: string,
    addTimecode: boolean,
    enablePsfEncoding: boolean,
    runMonitor: boolean,
    restartOnError: boolean,
    enableLoopback: boolean,
    enablePreviewImages: boolean,
    enableSlateIfNoSignal: boolean,
    slateImage?: string;
}

export type IIbpeCard = Pick<IIpbe, 
    'startedAtMs' | 'nodeText' | 'nodeId' | 'id' | 'ipbeDestinations' |
    'ipbeAudioEncoders' | 'name' | 'status' | 'statusChange' | 'inputFormat' | 'vbitrate'>;

