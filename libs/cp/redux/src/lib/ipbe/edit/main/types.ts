import {
    BasicApplication,
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IFormError,
    IIpbeListItemDestination,
    NumericId,
    Optional,
} from "@nxt-ui/cp/types";

export enum EIpbeMainError {
    name = "name",
    nodeId = "nodeId",
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
    sdiDevice = "sdiDevice",
}

export type IIpbeDestinationError = {
    outputIp: IFormError;
    ttl: IFormError;
    outputPort: IFormError;
};

export type EApiIpbeMainError = Exclude<keyof typeof EIpbeMainError, "nodeId"> | "node";

export type IIpbeEditMainErrors = {
    [key in EIpbeMainError]: IFormError;
} & {
    ipbeDestinations?: IIpbeDestinationError[];
};

export interface IIpbeEditMain extends BasicApplication {
    name: string;
    nodeId: Optional<NumericId>;
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
    sdiDevice?: number;
}

export type IIpbeEditMainState = {
    values: IIpbeEditMain;
    errors: IIpbeEditMainErrors;
};

export type IIpbeMainRequiredKeys = Array<
    keyof Pick<
        IIpbeEditMain,
        | "nodeId"
        | "name"
        | "applicationType"
        | "encoderVersion"
        | "sdiDevice"
        | "inputFormat"
        | "videoConnection"
        | "outputType"
    >
>;

export type IIpbeSdi2WebExtraFields = Array<
    keyof Pick<IIpbeEditMain, "audioOutputIp" | "audioOutputPort" | "videoOutputIp" | "videoOutputPort">
>;
