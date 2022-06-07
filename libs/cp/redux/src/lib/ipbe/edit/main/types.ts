import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IFormError,
    IIpbeListItemDestination,
} from "@nxt-ui/cp/types";

export enum EIpbeMainError {
    name = "name",
    node = "node",
    company = "company",
    applicationType = "applicationType",
    videoConnection = "videoConnection",
    videoOutputIp = "videoOutputIp",
    videoOutputPort = "videoOutputPort",
    audioOutputIp = "audioOutputIp",
    audioOutputPort = "audioOutputPort",
    encoderVersion = "encoderVersion",
    inputFormat = "inputFormat",
    latency = "latency",
    outputType = "outputType",
    cardIdx = "cardIdx",
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
    id?: number;
    name: string;
    company?: number;
    node?: number;
    videoConnection?: EIpbeVideoConnection;
    applicationType: EIpbeApplicationType;
    ipbeDestinations: Array<IIpbeListItemDestination>;
    videoOutputIp?: string;
    videoOutputPort?: number;
    audioOutputIp?: string;
    audioOutputPort?: number;
    encoderVersion?: string;
    inputFormat?: EIpbeEncoderVideoFormat;
    latency?: keyof typeof EIpbeLatency;
    outputType?: EIpbeOutputType;
    cardIdx?: number;
};

export type IIpbeEditMainState = {
    values: IIpbeEditMain;
    errors: IIpbeEditMainErrors;
};

export type IIpbeMainRequiredKeys = Array<
    keyof Pick<
        IIpbeEditMain,
        | "node"
        | "name"
        | "applicationType"
        | "encoderVersion"
        | "cardIdx"
        | "inputFormat"
        | "videoConnection"
        | "outputType"
    >
>;

export type IIpbeSdi2WebExtraFields = Array<
    keyof Pick<IIpbeEditMain, "audioOutputIp" | "audioOutputPort" | "videoOutputIp" | "videoOutputPort">
>;
