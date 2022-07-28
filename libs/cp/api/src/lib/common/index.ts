import {IChangeStatuses, EAppType} from "@nxt-ui/cp/types";
import instance from "../axios";
import {IApiListResponse, IApiNodesListItem, IApiCompanyListItem, IApiProxyServerItem} from "./types";
import axios from "axios";

const commonApi = {
    fetchNodes,
    fetchCompanies,
    fetchProxyServers,
    changeStatuses,
};

export default commonApi;
export * from "./types";

async function fetchNodes(appType?: EAppType): Promise<IApiListResponse<IApiNodesListItem>> {
    try {
        const response = await instance.get(`v2/node/?group=form${appType ? `&usedBy=${appType}` : ""}`);
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
        const response = await instance.get(`v2/company/?group=form${appType ? `&usedBy=${appType}` : ""}`);
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
        const response = await instance.get(`v2/proxy_server/?proxy_server_filter[status]=active`);
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
