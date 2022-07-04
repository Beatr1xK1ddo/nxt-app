import axios from "axios";
import instance from "../axios";
import {IApiListResponse} from "../common";
import {IApiFetchMainSelectValues, IApiTxr, IApiIpbeEditErrorResponse, IApiTxrListItem} from "./types";

const txrApi = {
    fetchTxrs,
    fetchItem,
    updateItem,
    createItem,
    fetchMainSelectValues,
    removeItem,
};

export default txrApi;
export * from "./types";

async function fetchTxrs(params?: string): Promise<IApiListResponse<IApiTxrListItem>> {
    try {
        const requestUrl = params ? `v2/txr/?${params}` : `v2/txr/`;
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

async function fetchItem(id: number): Promise<IApiTxr> {
    try {
        const response = await instance.get(`v2/txr/${id}`);
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

async function updateItem(data: Partial<IApiTxr>, restart?: boolean): Promise<IApiTxr | IApiIpbeEditErrorResponse> {
    try {
        const response = await instance.put(`v2/txr/${data.id}${restart ? "?restart=1" : ""}`, data);
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

async function createItem(data: Partial<IApiTxr>): Promise<IApiTxr | IApiIpbeEditErrorResponse> {
    try {
        const response = await instance.post(`v2/txr/`, data);
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

async function removeItem(ids: Array<number>) {
    try {
        const response = await instance.delete(`v2/txr/`, {
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

async function fetchMainSelectValues(nodeId: number): Promise<IApiFetchMainSelectValues> {
    try {
        const response = await instance.get(`v2/txr/settings/${nodeId}`);
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
