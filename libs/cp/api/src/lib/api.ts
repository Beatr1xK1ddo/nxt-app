import axios from 'axios';
import instance from './axios';
import { IArrResponse, ICompany, IIbpeCard, INode } from './types';

class API {
    public getCards = async (
        params?: string
    ): Promise<IArrResponse<IIbpeCard> | undefined> => {
        try {
            const response = await instance.get(`v2/ipbe/?${params}`);

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log('Axios error: ', e);
            } else {
                console.log('Unknown error: ', e);
            }

            return;
        }
    };

    public getNodes = async (): Promise<IArrResponse<INode> | undefined> => {
        try {
            const response = await instance.get(
                `v2/node/?group=form&usedBy=ipbe`
            );

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log('Axios error: ', e);
            } else {
                console.log('Unknown error: ', e);
            }

            return;
        }
    };

    public getCompanies = async (): Promise<
        IArrResponse<ICompany> | undefined
    > => {
        try {
            const response = await instance.get(
                `v2/company/?group=form&usedBy=ipbe`
            );

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log('Axios error: ', e);
            } else {
                console.log('Unknown error: ', e);
            }

            return;
        }
    };
}

export const NxtAPI = new API();
