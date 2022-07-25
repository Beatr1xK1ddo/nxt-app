import axios from "axios";
import instance from "../axios";
import {IApiListResponse} from "../common";
import {IApiFetchMainSelectValues, IApiIpbe, IApiIpbeEditErrorResponse, IApiIpbeListItem} from "./types";

const ipbeApi = {
    fetchIpbes,
    fetchIpbe,
    updateIpbe,
    createIpbe,
    fetchMainSelectValues,
    removeItems,
    cloneIpbe,
};

export default ipbeApi;
export * from "./types";

// start || stop || restart (start === restart)

async function fetchIpbes(params?: string): Promise<IApiListResponse<IApiIpbeListItem>> {
    try {
        const requestUrl = params ? `v2/ipbe/?${params}` : `v2/ipbe/`;
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

async function fetchIpbe(id: number): Promise<IApiIpbe> {
    try {
        const response = await instance.get(`v2/ipbe/${id}`);
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

async function updateIpbe(data: Partial<IApiIpbe>, restart?: boolean): Promise<IApiIpbe | IApiIpbeEditErrorResponse> {
    try {
        const response = await instance.put(`v2/ipbe/${data.id}${restart ? "?restart=1" : ""}`, data);
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

async function createIpbe(data: Partial<IApiIpbe>): Promise<IApiIpbe | IApiIpbeEditErrorResponse> {
    try {
        const response = await instance.post(`v2/ipbe/`, data);
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

async function removeItems(ipbeIds: Array<number>) {
    try {
        const response = await instance.delete(`v2/ipbe/`, {
            data: ipbeIds,
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
        const response = await instance.get(`v2/ipbe/settings/${nodeId}`);
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

async function cloneIpbe(ipbeId: number): Promise<IApiIpbe> {
    try {
        const response = await instance.put(`/v2/ipbe/clone/${ipbeId}`);
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
