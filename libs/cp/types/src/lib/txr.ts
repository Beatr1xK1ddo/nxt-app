import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange, EListViewMode} from "./common";

export type ValueOf<T> = T[keyof T];

export enum ETxrChooseActions {
    start = "Start",
    restart = "Restart",
    stop = "Stop",
    migrate = "Migrate",
    clone = "Clone",
    batchEdit = "Batch Edit",
    delete = "Delete",
}

export interface TxrListItemProps {
    mode: EListViewMode;
    item: ITxrListItem;
}

export interface ITxrListItem extends BasicApplication {
    id: number;
    name: string;
    appType: ETXRAppType;
    startedAtMs: null | number;
    txNodeId: number | null;
    rxNodeId: number | null;
    company: null | number;
    status: EAppGeneralStatus;
    statusChange: EAppGeneralStatusChange;
    sourceIp: string;
    sourcePort: string;
    destinationIp: string;
    destinationPort: string;
    rxRunMonitor: string;
}

export enum ENodeType {
    any = "any",
    ts = "tx",
    rx = "rx",
}

export enum EServerOnline {
    yes = "yes",
    no = "no",
}

export enum ETXRAppType {
    txr3 = "txr3",
    txr4 = "txr4",
    txr5 = "txr5",
    txr6 = "txr6",
    txr7 = "txr7",
    srt = "srt",
}

export enum ELatencyMode {
    "manual" = "manual",
    "autortt" = "automatic (based on rtt)",
    "autoretx" = "automatic (based on retransmission)",
}

export enum EDoubleRetransmission {
    "always on" = -1,
    "off" = 0,
    "after 1 retransmission" = 1,
    "after 2 retransmission" = 2,
    "after 3 retransmission" = 3,
    "after 4 retransmission" = 4,
    "after 5 retransmission" = 5,
}

export enum EFecSize {
    "10%" = 10,
    "25%" = 25,
    "33%" = 33,
    "50%" = 50,
    "66%" = 66,
    "75%" = 75,
    "88%" = 88,
    "100%" = 100,
    "125%" = 125,
    "150%" = 150,
    "175%" = 175,
    "200%" = 200,
}

export enum ETXRServer {
    tx = "tx",
    rx = "rx",
    proxy = "proxy",
}
