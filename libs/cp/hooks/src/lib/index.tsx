import { ICardResponse, NxtAPI } from '@nxt-ui/cp/api';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type IStatus = 'pending' | 'ok' | 'error';

export function useGetIpbe() {
    const [data, set] = useState<ICardResponse>();

    const location = useLocation();

    const [status, setStatus] = useState<IStatus>();

    const ipbeList = useCallback(async (search: string) => {
        try {
            setStatus('pending');
            const response = await NxtAPI.getCards(search);
            setStatus('ok');
            set(response);
        } catch (e) {
            setStatus('error');
            console.log('Error occured');
        }
    }, []);

    useEffect(() => {
        ipbeList(location.search);
    }, [location.search, ipbeList]);

    return { data, status };
}
