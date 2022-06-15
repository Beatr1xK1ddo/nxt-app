import instance from "../axios";
import {IApiListResponse, IApiNodesListItem, IApiCompanyListItem} from "./types";
import axios from "axios";

const commonApi = {
    fetchNodes,
    fetchCompanies,
};

export default commonApi;
export * from "./types";

//todo: I suppose we could replace appType: string with proper enum
async function fetchNodes(appType?: string): Promise<IApiListResponse<IApiNodesListItem>> {
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

//todo: I suppose we could replace appType: string with proper enum
async function fetchCompanies(appType?: string): Promise<IApiListResponse<IApiCompanyListItem>> {
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
