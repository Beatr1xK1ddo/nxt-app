import type {ReactNode, ReactChild} from "react";
import {EErrorType} from "./errors";
import {ISdiMapperTypes} from "./ipbe";

export type NumericId = number;

export type StringId = string;

export interface IListData<T> {
    data: T[];
    total: number;
}

export interface INodesListItem {
    id: NumericId;
    serialNumber: StringId;
    name: string;
    hostname: string;
    online: boolean;
    cpuCoresNumber: number;
    cpuGovernorMode: string;
    cpuLoad: number;
    cpuTemperature: number;
    cpuLoadAverage: number;
    ramUsed: number;
    ramTotal: number;
    decklinkPortsNum: number;
    sdiPortMapping: ISdiMapperTypes;
}

export enum EPortStatus {
    available = "available",
    free = "free",
    neutral = "neutral",
    unavailable = "unavailable",
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

//todo: remove
export enum EDataProcessingStatus {
    idle = "idle",
    fetchRequired = "fetchRequired",
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

export interface IRealtimeNodeSystemStateEvent {
    id: number;
    type: IRealtimeNodeEventType;
    cpu: number;
    memoryUsed: number;
    memoryTotal: number;
    loadAverage: number;
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
    helperText?: EErrorType;
};

export interface INotification {
    id: number;
    type: string;
    data: string;
    text: string;
    tags: ReactChild | ReactNode;
}
