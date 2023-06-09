import {EAppType} from "@nxt-ui/cp/types";
import axios from "axios";
import instance from "../axios";
import {IApiListResponse} from "../common";
import {IApiTxr, IApiTxrEditErrorResponse, IApiTxrListItem} from "./types";

const txrApi = {
    getItems,
    getItem,
    updateItem,
    createItem,
    removeItems,
    getTemplateSelectedValues,
    getTemplateFromNodes,
};

export default txrApi;
export * from "./types";

const txrBaseUrl = "/v2/txr2";

async function getItems(params?: string): Promise<IApiListResponse<IApiTxrListItem>> {
    try {
        const requestUrl = params ? `${txrBaseUrl}?${params}` : txrBaseUrl;
        const response = await instance.get(requestUrl);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error: ", error);
        } else {
            console.log("Unknown error: ", error);
        }
        return Promise.reject();
    }
}

async function getItem(id: number): Promise<IApiTxr> {
    try {
        const response = await instance.get(`${txrBaseUrl}/${id}`);
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

async function updateItem(data: Partial<IApiTxr>, restart?: boolean): Promise<IApiTxr | IApiTxrEditErrorResponse> {
    try {
        const response = await instance.put(`${txrBaseUrl}/${data.id}${restart ? "?restart=1" : ""}`, data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
            return Promise.reject(e.response?.data);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject(e);
    }
}

async function createItem(data: Partial<IApiTxr>): Promise<IApiTxr | IApiTxrEditErrorResponse> {
    try {
        const response = await instance.post(txrBaseUrl, data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
            return Promise.reject(e.response?.data);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject(e);
    }
}

async function removeItems(ids: Array<number>) {
    try {
        const response = await instance.delete(txrBaseUrl, {
            data: ids,
        });
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error: ", e);
            return Promise.reject(e.response?.data);
        } else {
            console.log("Unknown error: ", e);
        }
        return Promise.reject(e);
    }
}

async function getTemplateSelectedValues(): Promise<
    IApiListResponse<{
        id: string;
        name: string;
        app: string;
        data: string;
    }>
> {
    try {
        const response = await instance.get(`v2/app_template?appType=${EAppType.TXR}&group=list`);
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

async function getTemplateFromNodes(
    txNodeId: number,
    rxNodeId: number
): Promise<
    IApiListResponse<{
        id: string;
        name: string;
        app: string;
        data: string;
    }>
> {
    try {
        const response = await instance.get(`${txrBaseUrl}/settings/${txNodeId}/${rxNodeId}`);
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
