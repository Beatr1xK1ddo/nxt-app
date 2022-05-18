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
    load_average: number;
    cpu: number;
    memory_used: number;
    memory_free: number;
    memory_total: number;
    hostname: string;
    digit_code: string;
    cpu_governor: string;
    cpu_core: number;
}

export interface IApiCompanyListItem {
    id: number;
    name: string;
}
