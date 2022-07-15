import {IChangeStatuses} from "@nxt-ui/cp/types";
import instance from "../axios";
import {IApiListResponse, IApiNodesListItem, IApiCompanyListItem} from "./types";
import axios from "axios";
import {EAppType} from "@nxt-ui/cp/types";

const commonApi = {
    fetchNodes,
    fetchCompanies,
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

export async function changeStatuses(data: IChangeStatuses, appType: EAppType): Promise<[]> {
    try {
        // TODO KATE: fix types
        const result = await instance.put(`v2/${appType === EAppType.IPBE ? "ipbe" : "txr"}/changeStatus`, data);
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
