import axios from "axios";
import instance from "./axios";
import {IArrResponse, ICompany, IIbpeCard, IIpbe, INode} from "./types";

class API {
    public getCards = async (params?: string): Promise<IArrResponse<IIbpeCard> | undefined> => {
        try {
            const response = await instance.get(`v2/ipbe/?${params}`);

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

    public putCard = async (id: number) => {
        try {
            const response = await instance.put(`v2/ipbe/${id}`);
            return response.data;
        } catch (e) {
            console.log("putCard error", e);
        }
    };

    public getNodes = async (): Promise<IArrResponse<INode> | undefined> => {
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

    public getCompanies = async (): Promise<IArrResponse<ICompany> | undefined> => {
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

    public getIpbe = async (id: number): Promise<IIpbe | undefined> => {
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

    public putIpbe = async (data: IIpbe): Promise<IIpbe | undefined> => {
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
