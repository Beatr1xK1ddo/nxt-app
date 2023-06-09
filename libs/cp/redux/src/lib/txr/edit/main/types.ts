import {BasicApplication, ETXRAppType, IFormError, Optional} from "@nxt-ui/cp/types";

// TODO Kate: refactor
export enum ETxrMainError {
    name = "name",
    company = "company",
    appType = "appType",
    sourceIp = "sourceIp",
    sourcePort = "sourcePort",
    txUseInterface = "txUseInterface",
    transmissionIp = "transmissionIp",
    destinationIp = "destinationIp",
    destinationPort = "destinationPort",
    transmissionPort = "transmissionPort",
    ttl = "ttl",
    buffer = "buffer",
    rxUseInterface = "rxUseInterface",
    doubleRetransmission = "doubleRetransmission",
    openPortAt = "openPortAt",
    txNodeId = "txNodeId",
    rxNodeId = "rxNodeId",
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
    doubleRetransmission: Optional<number>;
    openPortAt: Optional<string>;
    txRunMonitor: Optional<boolean>;
    ttl: Optional<number>;
    buffer: Optional<number>;
    endpoint: Optional<boolean>;
    arq: Optional<boolean>;
    fec: Optional<boolean>;
    fecHorizontalSize: Optional<number>;
    fecSize: Optional<number>;
    latencyMode: Optional<string>;
    latencyMultiplier: Optional<number>;
    latencyTime: Optional<number>;
    recvBuffer: Optional<number>;
    proxyServersIds: Optional<Array<number>>;
    isLockTransmission: boolean;
    updatedAt: Optional<number>;
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
