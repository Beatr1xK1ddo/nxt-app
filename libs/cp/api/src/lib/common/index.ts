import {IChangeStatuses, EAppType} from "@nxt-ui/cp/types";
import instance from "../axios";
import {IApiListResponse, IApiNodesListItem, IApiCompanyListItem, IApiProxyServerItem, IUserResponseApi} from "./types";
import axios from "axios";

const commonApi = {
    fetchNodes,
    fetchCompanies,
    fetchProxyServers,
    changeStatuses,
    cloneApplications,
    fetchUser,
};

export default commonApi;
export * from "./types";

async function fetchNodes(appType?: EAppType, all?: boolean): Promise<IApiListResponse<IApiNodesListItem>> {
    try {
        const request = all ? "v2/node" : `v2/node?filter[itemsPerPage]=all&filter[usedBy]=${appType}`;
        const response = await instance.get(request);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

async function fetchCompanies(appType?: EAppType): Promise<IApiListResponse<IApiCompanyListItem>> {
    try {
        const response = await instance.get(`v2/company?group=form${appType ? `&usedBy=${appType}` : ""}`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

async function fetchProxyServers(): Promise<IApiListResponse<IApiProxyServerItem>> {
    try {
        const response = await instance.get(`v2/proxy_server?proxy_server_filter[status]=active`);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

export async function changeStatuses(data: IChangeStatuses, appType: EAppType): Promise<[]> {
    try {
        const result = await instance.put(`v2/${appType}/changeStatus`, data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error: ", error);
        } else {
            console.log("Unknown error: ", error);
        }
        return Promise.reject();
    }
}

async function cloneApplications(ids: Array<number>, appType: EAppType): Promise<Array<[string, number]>> {
    try {
        const response = await instance.post(`v2/${appType}/clone`, ids);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}

async function fetchUser(): Promise<IUserResponseApi> {
    try {
        const response = await instance.post("v2/user");
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject();
    }
}
