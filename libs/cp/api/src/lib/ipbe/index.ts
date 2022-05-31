import axios from "axios";
import instance from "../axios";
import {IApiListResponse} from "../common";
import {IApiIpbe, IApiIpbeListItem} from "./types";

const ipbeApi = {
    fetchIpbes,
    fetchIpbe,
    updateIpbe,
};

export default ipbeApi;
export * from "./types";

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

async function updateIpbe(data: Partial<IApiIpbe>): Promise<IApiIpbe> {
    try {
        console.log("data", data);
        const response = await instance.put(`v2/ipbe/${data.id || 391}`, data);
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
