import {BasicApplication, EListViewMode, NumericId, Optional} from "./common";

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

export interface TxrBasicApplication extends BasicApplication {
    txNodeId: NumericId;
    rxNodeId: NumericId;
    txNodeText: string;
    rxNodeText: string;
}

export interface ITxrListItem extends TxrBasicApplication {
    id: NumericId;
    name: string;
    appType: ETXRAppType;
    txRunMonitor: boolean;
    rxRunMonitor: boolean;
    sourceIp: string;
    sourcePort: number;
    outputIp: string;
    outputPort: number;
    proxyServersIds: Array<number>;
    endpoint: Optional<boolean>;
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
    manual = "manual",
    autortt = "autortt",
    autoretx = "autoretx",
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

export interface ITxrNodeData {
    source: boolean;
    output: boolean;
    connection: boolean;
    connectedTo: string;
    // connectionType: string; ??
    rtt: number;
    latency: number;
    quality: number;
    packetsSent: number;
    packetsRetx: number;
    packetsLost: number;
    packetsLate: number;
    txrRecovered: number;
    fexRecovered: number;
    p1SyncLoss: number;
    p1CCErrors: number;
}

export type ITxrNodeSubscribedData = ITxrNodeData;
