import axios from "axios";
import instance from "./axios";
import {ICompany, IIpbeCardApiItem, INode, IIpbe} from "./types";
import {IApiListResponse} from "./common";

//todo: there is a sense in splitting API into some screen based parts
class API {
    public putCard = async (id: number) => {
        try {
            const response = await instance.put(`v2/ipbe/${id}`);
            return response.data;
        } catch (e) {
            console.log("putCard error", e);
        }
    };

    public getNodes = async (): Promise<IApiListResponse<INode> | undefined> => {
        try {
            const response = await instance.get(`v2/node/?group=form&usedBy=ipbe`);

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("Axios error: ", e);
            } else {
                console.log("Unknown error: ", e);
            }

            return;
        }
    };

    public getCompanies = async (): Promise<IApiListResponse<ICompany> | undefined> => {
        try {
            const response = await instance.get(`v2/company/?group=form&usedBy=ipbe`);

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("Axios error: ", e);
            } else {
                console.log("Unknown error: ", e);
            }

            return;
        }
    };

    public getIpbe = async (id: number): Promise<IIpbeCardApiItem | undefined> => {
        try {
            const response = await instance.get(`v2/ipbe/${id}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("Axios error: ", e);
            } else {
                console.log("Unknown error: ", e);
            }

            return;
        }
    };

    public putIpbe = async (data: Partial<IIpbe>): Promise<IIpbe | undefined> => {
        try {
            const response = await instance.put(`v2/ipbe/${data.id}`, data);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log("Axios error: ", e);
            } else {
                console.log("Unknown error: ", e);
            }

            return;
        }
    };
}

export const NxtAPI = new API();
