import instance from './axios';

class API {
    public getCards = async () => {
        const response = await instance.get('people/1/');
        console.log('response', response);
        return response;
    };
}

export const NxtAPI = new API();
