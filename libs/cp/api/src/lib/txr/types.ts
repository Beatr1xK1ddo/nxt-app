import {EApiAppType, ETXRAppType, NumericId, Optional} from "@nxt-ui/cp/types";
import {EApiAppGeneralStatus, EApiAppGeneralStatusChange} from "../common";

export interface IApiTxrListItem {
    id: number;
    name: string;
    appType: ETXRAppType;
    startedAtMs: null | number;
    company: null | number;
    status: EApiAppGeneralStatus;
    statusChange: EApiAppGeneralStatusChange;
    txNode: number;
    rxNode: number;
    txNodeText: string;
    rxNodeText: string;
    txRunMonitor: boolean;
    rxRunMonitor: boolean;
    sourceIp: string;
    sourcePort: number;
    destinationIp: string;
    destinationPort: number;
    proxyServers: Array<number>;
    endpoint: boolean;
    _appType: EApiAppType;
}

export type IApiTxr = {
    //general metadata
    id: number;
    name: string;
    node: number;
    company: Optional<NumericId>;
    startedAtMs: Optional<number>; // not in form
    status: EApiAppGeneralStatus; // not in form
    statusChange: Optional<EApiAppGeneralStatusChange>;
    txNode: number;
    rxNode: number;
    appType: ETXRAppType;
    sourceIp: string;
    sourcePort: number;
    txUseInterface: string;
    transmissionIp: string;
    transmissionPort: number;
    destinationIp: string;
    destinationPort: number;
    rxUseInterface: string;
    rxRunMonitor: boolean;
    doubleRetransmission: number;
    openPortAt: string;
    txRunMonitor: boolean;
    ttl: Optional<number>;
    buffer: Optional<number>;
    _appType: EApiAppType;
    endpoint: Optional<boolean>;
    arq: Optional<boolean>;
    fec: Optional<boolean>;
    fecHorizontalSize: Optional<number>;
    fecSize: Optional<number>;
    latencyMode: Optional<string>;
    latencyMultiplier: Optional<number>;
    latencyTime: Optional<number>;
    recvBuffer: Optional<number>;
    proxyServers: Optional<Array<number>>;
    isLockTransmission: boolean;
};

// TODO Kate: rewrite to common?
export type IApiTxrEditErrorField = {
    error: string;
    key: keyof IApiTxr;
    message: string;
};

export type IApiTxrEditErrorResponse = {
    origin: string;
    errors: Array<IApiTxrEditErrorField>;
};
