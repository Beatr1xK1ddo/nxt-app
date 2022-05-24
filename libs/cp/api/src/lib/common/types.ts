import {EAppGeneralStatus, EAppGeneralStatusChange} from "@nxt-ui/cp/types";

export interface IApiListResponse<T> {
    data: T[];
    total: number;
}

export type EApiAppGeneralStatus = EAppGeneralStatus;

export type EApiAppGeneralStatusChange = EAppGeneralStatusChange;

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
    sdiPortMapping: number;
}

export interface IApiCompanyListItem {
    id: number;
    name: string;
}
