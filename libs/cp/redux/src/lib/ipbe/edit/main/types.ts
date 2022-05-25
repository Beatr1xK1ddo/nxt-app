import {
    EApiIpbeApplicationType,
    EApiIpbeEncoderVersion,
    EApiIpbeEncoderVideoFormat,
    EApiIpbeLatency,
    EApiIpbeOutputType,
    EApiIpbeVideoConnection,
    IApiIpbeDestinations,
    IFormError,
} from "@nxt-ui/cp/types";

export enum EMainFormError {
    name = "nameError",
    node = "nodeError",
    company = "companyError",
    applicationType = "applicationTypeError",
    videoConnection = "videoConnectionError",
    videoOutputIp = "videoOutputIpError",
    videoOutputPort = "videoOutputPortError",
    audioOutputIp = "audioOutputIpError",
    audioOutputPort = "audioOutputPortError",
    encoderVersion = "encoderVersionError",
    inputFormat = "inputFormatError",
    latency = "latencyError",
    outputType = "outputTypeError",
    cardIdx = "cardIdxError",
}

export type IDestinationError = {
    outputIp: IFormError;
    ttl: IFormError;
    outputPort: IFormError;
};

export type IIpbeEditMainErrorsState = {
    [key in EMainFormError]: IFormError;
} & {
    ipbeDestinations?: IDestinationError[];
};

export type IIpbeEditMain = {
    name: string;
    company?: number;
    node: number;
    videoConnection?: EApiIpbeVideoConnection;
    applicationType: EApiIpbeApplicationType;
    ipbeDestinations: Array<IApiIpbeDestinations>;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    encoderVersion?: EApiIpbeEncoderVersion;
    inputFormat?: EApiIpbeEncoderVideoFormat;
    latency?: EApiIpbeLatency;
    outputType?: EApiIpbeOutputType;
    cardIdx: number;
};

export type IIpbeEditMainTabState = {
    errors: IIpbeEditMainErrorsState;
    values?: Partial<IIpbeEditMain>;
};
