import { NxtAPI } from '@nxt-ui/cp/api';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useGetIpbe() {
    const [cards, set] = useState<AxiosResponse<any, any>>();

    const ipbeList = useCallback(async () => {
        const response = await NxtAPI.getCards();
        console.log('response', response);
        set(response);
        return response;
    }, []);

    useEffect(() => {
        ipbeList();
    }, [ipbeList]);

    return cards;
}
