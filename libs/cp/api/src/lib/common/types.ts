import {EAppGeneralStatus, EAppGeneralStatusChange, ISdiMapperTypes, EAppType} from "@nxt-ui/cp/types";

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
    rsshPort: number;
    isLocalInterface: boolean;
    sshPublicPort?: number;
    adminUser: string;
    remoteAddr: string;
    type: string;
}
export interface IApiProxyServerItem {
    startedAtMs: number;
    node: number;
    _appType: EAppType;
    company: number;
    id: number;
    name: string;
    ip: string;
    port: number;
    status: string;
    statusChange: string;
}

export interface IApiCompanyListItem {
    id: number;
    name: string;
}

export type ISubmenuItem = {
    url: string;
    title: string;
    key: string;
};

export type IMenuItemShort = {
    title: string;
    key: string;
    submenu: Array<ISubmenuItem>;
};

export type IMenuItem = {
    title: string;
    key: string;
    submenu: Array<IMenuItemShort>;
};

export type IUserStateApi = {
    username: string;
    centralServerIp: string;
    centralServerUser: string;
    rsshUser?: string;
    sshServerPort: number;
    email: string;
};

export type IUserResponseApi = {
    menu: Array<IMenuItem | IMenuItemShort>;
    user: IUserStateApi;
};
