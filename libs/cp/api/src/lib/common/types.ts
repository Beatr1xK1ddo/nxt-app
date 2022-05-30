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
    sdiPortMapping: string;
}

export interface IApiCompanyListItem {
    id: number;
    name: string;
}

export interface IApiApplicationTypeListItem {
    [key: string]: string;
}
