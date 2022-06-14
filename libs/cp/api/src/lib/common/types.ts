import {EAppGeneralStatus, EAppGeneralStatusChange, ISdiMapperTypes} from "@nxt-ui/cp/types";

export import EApiAppGeneralStatus = EAppGeneralStatus;

export import EApiAppGeneralStatusChange = EAppGeneralStatusChange;

export interface IApiListResponse<T> {
    data: T[];
    total: number;
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
