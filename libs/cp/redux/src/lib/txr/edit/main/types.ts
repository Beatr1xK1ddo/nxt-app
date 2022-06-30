import {
    BasicApplication,
    ETxrApplicationType,
    ETxrEncoderVideoFormat,
    ETxrLatency,
    ETxrOutputType,
    ETxrVideoConnection,
    IFormError,
    ITxrListItemDestination,
    NumericId,
    Optional,
} from "@nxt-ui/cp/types";

export enum ETxrMainError {
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

export type ITxrDestinationError = {
    outputIp: IFormError;
    ttl: IFormError;
    outputPort: IFormError;
};

export type EApiTxrMainError = Exclude<keyof typeof ETxrMainError, "nodeId"> | "node";

export type ITxrEditMainErrors = {
    [key in ETxrMainError]: IFormError;
} & {
    txrDestinations?: ITxrDestinationError[];
};

export interface ITxrEditMain extends BasicApplication {
    name: string;
    nodeId: Optional<NumericId>;
    videoConnection: Optional<ETxrVideoConnection>;
    applicationType: ETxrApplicationType;
    txrDestinations: Array<ITxrListItemDestination>;
    videoOutputIp: Optional<string>;
    videoOutputPort: Optional<number>;
    audioOutputIp: Optional<string>;
    audioOutputPort: Optional<number>;
    encoderVersion: Optional<string>;
    inputFormat: Optional<ETxrEncoderVideoFormat>;
    latency: Optional<keyof typeof ETxrLatency>;
    outputType: Optional<ETxrOutputType>;
    sdiDevice: Optional<number>;
}

export type ITxrEditMainState = {
    values: ITxrEditMain;
    errors: ITxrEditMainErrors;
};

export type ITxrMainRequiredKeys = Array<
    keyof Pick<
        ITxrEditMain,
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

export type ITxrSdi2WebExtraFields = Array<
    keyof Pick<ITxrEditMain, "audioOutputIp" | "audioOutputPort" | "videoOutputIp" | "videoOutputPort">
>;

export type ITxrEditErrorField = {
    key: ETxrMainError | "txrDestinations";
    text: string;
    index?: number;
    field?: keyof ITxrDestinationError;
};
