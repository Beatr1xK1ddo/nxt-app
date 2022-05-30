import {
    EIpbeApplicationType,
    EIpbeEncoderVersion,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IFormError,
    IIpbeListItemDestinations,
} from "@nxt-ui/cp/types";

export enum EIpbeMainError {
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

export type IIpbeDestinationError = {
    outputIp: IFormError;
    ttl: IFormError;
    outputPort: IFormError;
};

export type IIpbeEditMainErrors = {
    [key in EIpbeMainError]: IFormError;
} & {
    ipbeDestinations?: IIpbeDestinationError[];
};

export type IIpbeEditMain = {
    name: string;
    company?: number;
    node?: number;
    videoConnection?: EIpbeVideoConnection;
    applicationType: EIpbeApplicationType;
    ipbeDestinations: Array<IIpbeListItemDestinations>;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    encoderVersion?: string;
    inputFormat?: EIpbeEncoderVideoFormat;
    latency?: EIpbeLatency;
    outputType?: EIpbeOutputType;
    cardIdx?: number;
};

export type IIpbeEditMainState = {
    values: IIpbeEditMain;
    errors: IIpbeEditMainErrors;
};
