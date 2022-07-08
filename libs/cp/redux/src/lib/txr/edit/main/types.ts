import {BasicApplication, ETXRAppType, IFormError, Optional} from "@nxt-ui/cp/types";

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

export type EApiTxrMainError = Exclude<keyof typeof ETxrMainError, "nodeId"> | "node";

export type ITxrEditMainErrors = {
    [key in ETxrMainError]: IFormError;
};

export interface ITxrEditMain extends BasicApplication {
    name: string;
    txNodeId: Optional<number>;
    rxNodeId: Optional<number>;
    appType: Optional<ETXRAppType>;
    sourceIp: Optional<string>;
    sourcePort: Optional<number>;
    txUseInterface: Optional<string>;
    transmissionIp: Optional<string>;
    transmissionPort: Optional<number>;
    destinationIp: Optional<string>;
    destinationPort: Optional<number>;
    rxUseInterface: Optional<string>;
    rxRunMonitor: Optional<boolean>;
    doubleTransmission: Optional<string>;
    openPortAt: Optional<string>;
    txRunMonitor: Optional<boolean>;
    ttl: Optional<number>;
    buffer: Optional<number>;
}

export type ITxrEditMainState = {
    values: ITxrEditMain;
    errors: ITxrEditMainErrors;
};

export type ITxrEditErrorField = {
    key: ETxrMainError;
    text: string;
    index?: number;
};
