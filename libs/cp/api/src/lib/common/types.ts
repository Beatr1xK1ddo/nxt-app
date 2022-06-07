import {ISdiMapperTypes} from "@nxt-ui/cp/types";

export interface IApiListResponse<T> {
    data: T[];
    total: number;
}

export enum EApiAppGeneralStatusChange {
    start = "start",
    stop = "stop",
}

export enum EApiAppGeneralStatus {
    active = "active",
    error = "error",
    stopped = "stopped",
    cloned = "cloned",
    new = "new",
}

export type IApiSdiMapperTypes = ISdiMapperTypes;

export interface IApiNodesListItem {
    is_online: boolean;
    id: number;
    temperature: number;
    name: string;
    loadAverage: number;
    cpu: number;
    memoryUsed: number;
    memory_total: number;
    hostname: string;
    digitCode: string;
    cpuGovernor: string;
    decklinkPortsNum: number;
    cpuCore: number;
    offlineTime: number;
    sdiPorts: number;
    sdiPortMapping: IApiSdiMapperTypes;
}

export interface IApiCompanyListItem {
    id: number;
    name: string;
}
