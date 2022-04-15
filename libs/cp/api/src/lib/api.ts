import axios from 'axios';
import instance from './axios';
import { ICardResponse } from './types';

class API {
    public getCards = async (
        params?: string
    ): Promise<ICardResponse | undefined> => {
        try {
            const response = await instance.get(`v2/ipbe/${params}`);

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
