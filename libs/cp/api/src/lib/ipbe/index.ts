import axios from "axios";
import instance from "../axios";
import {IApiListResponse} from "../common";
import {
    IApiFetchMainSelectValues,
    IApiIpbe,
    IApiIpbeEditErrorResponse,
    IApiIpbeListItem,
    ICloneIpbeResponse,
} from "./types";

const ipbeApi = {
    fetchIpbes,
    fetchIpbe,
    updateIpbe,
    createIpbe,
    fetchMainSelectValues,
    removeItems: removeIpbes,
    cloneIpbe: cloneIpbes,
};

export default ipbeApi;
export * from "./types";

// start || stop || restart (start === restart)

const ipbeBaseUrl = "/v2/ipbe2";
const ipbeBaseUrlWSlash = `${ipbeBaseUrl}/`;

async function fetchIpbes(params?: string): Promise<IApiListResponse<IApiIpbeListItem>> {
    try {
        const requestUrl = params ? `${ipbeBaseUrl}/?${params}` : ipbeBaseUrlWSlash;
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
        const response = await instance.get(`${ipbeBaseUrl}/${id}`);
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
        const response = await instance.put(`${ipbeBaseUrl}/${data.id}${restart ? "?restart=1" : ""}`, data);
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
        const response = await instance.post(ipbeBaseUrlWSlash, data);
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

async function removeIpbes(ipbeIds: Array<number>) {
    try {
        const response = await instance.delete(ipbeBaseUrlWSlash, {
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
        const response = await instance.get(`${ipbeBaseUrl}/settings/${nodeId}`);
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

async function cloneIpbes(ipbeIds: Array<number>): Promise<ICloneIpbeResponse> {
    try {
        const response = await instance.post(`${ipbeBaseUrl}/clone`, ipbeIds);
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
