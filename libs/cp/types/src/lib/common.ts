import type {ReactNode, ReactChild} from "react";
import {EErrorType} from "./errors";
import {ISdiMapperTypes} from "./ipbe";

export type NumericId = number;

export type StringId = string;

export type Optional<T> = null | T;

export type DateInMs = number;

export type ValueOf<T> = T[keyof T];

export interface BasicApplication {
    id: Optional<NumericId>;
    status: Optional<EAppGeneralStatus>;
    statusChange: Optional<EAppGeneralStatusChange>;
    startedAtMs: Optional<number>;
    company: Optional<NumericId>;
    type: Optional<EApiAppType>;
}

export interface BasicNodeApplication extends BasicApplication {
    nodeId: NumericId;
    nodeName: string;
}

export enum EApiAppType {
    IPBE = "ipbe2",
    TXR = "txr2",
}

export enum EAppType {
    IPBE = "ipbe",
    TXR = "txr",
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
    duration: Optional<number>;
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
    navigateRequired = "navigateRequired",
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

export type INodeData = INodePingDataRaw | INodeSystemStateDataRaw | INodeStatusDataRaw;

export type IRealtimeNodeData = IRealtimeNodePingData | IRealtimeNodeSystemData | IRealtimeNodeStatusData;

export interface INodePingDataRaw {
    id: number;
    type: INodeEventType;
    lastPing: number;
}

export interface INodeSystemStateDataRaw {
    type: INodeEventType;
}
export type INodeOnlineStatusPayload = IDataEvent<INodeOrigin, IRealtimeNodeStatusData>;

export interface IRealtimeNodePingData {
    lastPing: number;
}

export interface INodeSubscribeOrigin {
    nodeId: number | number[];
    type: INodeEventType;
}

export interface INodeOrigin {
    nodeId: number;
    type: INodeEventType;
}

export interface IRealtimeNodeSystemData {
    cpu: number;
    memoryUsed: number;
    memoryTotal: number;
    loadAverage: number;
}

export interface INodeStatusDataRaw {
    id: number;
    type: INodeEventType;
    online: boolean;
}

export interface IRealtimeNodeStatusData {
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
// ts-monitoring

export interface IIpPortOrigin {
    nodeId: number;
    ip: string;
    port: number;
}

export type INodeEventType = "ping" | "system" | "status";

export enum ESubscriptionType {
    monitoring = "monitoring",
    qos = "qos",
    node = "node",
    app = "app",
    txr = "txr",
    tsMonitoring = "tsMonitoring",
}

export interface ISubscribeEvent<T = any> {
    subscriptionType: ESubscriptionType;
    origin: T;
}

export interface IDataEvent<T, P> extends ISubscribeEvent<T> {
    // payload: IMonitoringData | Array<IMonitoringData> | IQosData | INodeData | IAppData;
    payload: P;
}

export type ISubscribedEvent<T, P> = IDataEvent<T, P>;

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

export interface IListItemDestination {
    id?: number;
    outputIp: Optional<string>;
    ttl: Optional<number>;
    outputPort: Optional<number>;
}

export interface IDestination {
    outputIp: Optional<string>;
    outputPort: Optional<number>;
}
// navigation
export enum EIpbeNavAppList {
    manageIpbe = "Manage SDI to IP Encoders",
    createIpbe = "Create new SDI to IP Encoder",
}
export enum ETxrNavAppList {
    manageTxr = "Manage transfers",
    createTxr = "Create new transfer",
}

export type ENavApplicationsItems = keyof typeof ETxrNavAppList | keyof typeof EIpbeNavAppList;

export enum EDropdownEmptyType {
    ANY = "any",
    NONE = "none",
    ALL = "all",
}
