import {
    EIpbeApplicationType,
    EIpbeEncoderVersion,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IFormError,
    IIpbeListItemDestination,
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
    videoConnection?: EIpbeVideoConnection;
    applicationType: string;
    ipbeDestinations: Array<IIpbeListItemDestination>;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    encoderVersion?: keyof typeof EIpbeEncoderVersion;
    inputFormat?: EIpbeEncoderVideoFormat;
    latency?: EIpbeLatency;
    outputType?: EIpbeOutputType;
    cardIdx: number;
};

export type IIpbeEditMainTabState = {
    errors: IIpbeEditMainErrorsState;
    values: Partial<IIpbeEditMain>;
};
