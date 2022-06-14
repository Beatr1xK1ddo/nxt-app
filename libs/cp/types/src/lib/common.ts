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
}

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

export enum EPortStatus {
    available = "available",
    free = "free",
    neutral = "neutral",
    unavailable = "unavailable",
    default = "default",
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

export interface IBitrateMonitoringDataItem {
    timestamp: number;
    bitrate: number;
    muxrate: number;
}

export interface IBitrateMonitoring {
    data: Array<IBitrateMonitoringDataItem>;
    errors: any;
    lastClearTime: any;
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
    ten = "10",
    fifty = "50",
    hundred = "100",
    threeHundred = "300",
}

export interface IRealtimeThumbnailEvent {
    channel: string;
    imageSrcBase64: string;
}

export type IRealtimeAppEvent = IRealtimeAppStatusEvent | IRealtimeAppTimingEvent;

export interface IRealtimeAppStatusEvent {
    id: number;
    type: string;
    status: EAppGeneralStatus;
    statusChange: string;
}

export interface IRealtimeAppTimingEvent {
    id: number;
    type: string;
    startedAt: number;
}

export type IRealtimeNodeEvent = IRealtimeNodePingEvent | IRealtimeNodeSystemStateEvent | IRealtimeNodeStatusEvent;

export type IRealtimeNodeEventType = "ping" | "system" | "status";

export interface IRealtimeNodePingEvent {
    id: number;
    type: IRealtimeNodeEventType;
    lastPing: number;
}

export interface NodeSystemState {
    cpu: number;
    memoryUsed: number;
    memoryTotal: number;
    loadAverage: number;
}

export interface IRealtimeNodeSystemStateEvent extends NodeSystemState {
    id: number;
    type: IRealtimeNodeEventType;
}

export interface IRealtimeNodeStatusEvent {
    id: number;
    type: IRealtimeNodeEventType;
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

export interface INotification {
    id: number;
    type: string;
    data: string;
    text: string;
    tags: ReactChild | ReactNode;
}

export type IThumbnailEvent = {
    channel: string;
    imageSrcBase64: string;
};
