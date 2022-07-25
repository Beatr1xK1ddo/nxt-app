import type {ReactNode, ReactChild} from "react";
import {EErrorType} from "./errors";
import {ISdiMapperTypes} from "./ipbe";

export type NumericId = number;

export type StringId = string;

export type Optional<T> = null | T;

export type DateInMs = number;

export interface BasicApplication {
    id: Optional<NumericId>;
    status: EAppGeneralStatus;
    statusChange: Optional<EAppGeneralStatusChange>;
    startedAtMs: Optional<number>;
    company: Optional<NumericId>;
    type?: Optional<string>;
}

export enum EAppType {
    IPBE = "ipbe2",
    TXR = "txr2",
}

export enum EAppName {
    "ipbe2" = "ipbe",
    "txr2" = "txr",
}

export type IRemoveApp = {
    id: NumericId;
    name: string;
};

export interface IListData<T> {
    data: T[];
    total: number;
}

export enum ENotificationType {
    info = "info",
    warning = "warning",
    error = "error",
}

export interface INotification {
    id: StringId;
    type: ENotificationType;
    created: DateInMs;
    message: string;
}

export type INotifications = Array<INotification>;

export enum EListViewMode {
    list = "list",
    card = "card",
}
export interface ListItemProps {
    mode: EListViewMode;
    item: any;
}

export interface INodesListItem {
    id: NumericId;
    serialNumber: StringId;
    name: string;
    hostname: string;
    online: boolean;
    cpuCoresCount: number;
    cpuGovernorMode: string;
    cpuLoad: number;
    cpuTemperature: number;
    cpuLoadAverage: number;
    ramUsed: number;
    digitCode: string;
    ramTotal: number;
    decklinkPortsNum: number;
    sdiPortMapping: ISdiMapperTypes;
}
export interface IProxyServerItem {
    startedAtMs: number;
    node: number;
    type: string;
    company: number;
    id: number;
    name: string;
    ip: string;
    port: number;
    status: string;
    statusChange: string;
}

export interface ICompaniesListItem {
    id: NumericId;
    name: string;
}

export enum EAppGeneralStatus {
    active = "active",
    error = "error",
    stopped = "stopped",
    cloned = "cloned",
    new = "new",
}

export enum EAppGeneralStatusChange {
    start = "start",
    stop = "stop",
}

export enum EStateTypes {
    failed = "Failed",
    success = "Success",
    processing = "Processing",
    empty = "",
}

export type IDirty = {dirty: boolean};

//todo: remove
export enum EDataProcessingStatus {
    idle = "idle",
    fetchRequired = "fetchRequired",
    updateRequired = "updateRequired",
    saveAndUpdateRequired = "saveAndUpdateRequired",
    loading = "loading",
    succeeded = "succeeded",
    failed = "failed",
}

export type IDataProcessingError = null | string;

export interface IPagination {
    page: number;
    itemsPerPage: EItemsPerPage;
    itemsCount: number;
    pagesCount: number;
}

export enum EItemsPerPage {
    all = "all",
    twelve = "12",
    twentyFour = "24",
    fortyEight = "48",
    ninetySix = "96",
    hundredNinetyTwo = "192",
    threeHundredAightyFour = "384",
}

export interface IRealtimeThumbnailEvent {
    channel: string;
    imageSrcBase64: string;
}

export interface IAppDataSubscribedEvent {
    status: IAppStatusData;
    runtime: IAppTimingData;
}

export type IAppData = IAppStatusData | IAppTimingData;

export interface IAppStatusData {
    status: EAppGeneralStatus;
    statusChange: string;
}

export interface IAppTimingData {
    startedAt: number;
}

export type INodeData = INodePingData | INodeSystemStateDataRaw | INodeStatusData;

export type INodeSystemStateData = Omit<INodeSystemStateDataRaw, "id" | "type">;

export type INodeEventType = "ping" | "system" | "status";

export interface INodePingData {
    type: INodeEventType;
    lastPing: number;
}

export interface INodeSystemStateDataRaw {
    type: INodeEventType;
    cpu: number;
    memoryUsed: number;
    memoryTotal: number;
    loadAverage: number;
}

export interface INodeStatusData {
    id: number;
    type: INodeEventType;
    online: boolean;
}

export interface IPost {
    id: number;
    content: ReactChild | ReactNode;
    heading?: string;
}

export type IFormError = {
    error: boolean;
    helperText?: EErrorType | string;
};

//todo kan: update to proper state
export interface ISystemNotification {
    id: NumericId;
    type: string;
    data: string;
    text: string;
    tags: ReactChild | ReactNode;
}

export type IThumbnailEvent = {
    channel: string;
    imageSrcBase64: string;
};

export enum EChooseActions {
    start = "Start",
    restart = "Restart",
    stop = "Stop",
    migrate = "Migrate",
    clone = "Clone",
    batchEdit = "Batch Edit",
    delete = "Delete",
}

export type IApllyAction = {
    action: Optional<keyof typeof EChooseActions>;
    selected: Array<number>;
};
