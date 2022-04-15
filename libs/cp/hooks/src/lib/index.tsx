import { ICardResponse, NxtAPI } from '@nxt-ui/cp/api';
import { EItemsPerPage, IFilters, setFilter } from '@nxt-ui/cp/ducks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

type IStatus = 'pending' | 'ok' | 'error';

export function useGetIpbe() {
    const ipbeList = useCallback(async (search: URLSearchParams) => {
        try {
            setStatus('pending');
            if (!search.has(IFilters.itemsPerPage)) {
                search.set(IFilters.itemsPerPage, EItemsPerPage.fifty);
            }
            if (!search.has(IFilters.page)) {
                search.set('page', '1');
            }
            const response = await NxtAPI.getCards(search.toString());
            setStatus('ok');
            set(response);
        } catch (e) {
            setStatus('error');
            console.log('Error occured');
        }
    }, []);

    const [data, set] = useState<ICardResponse>();

    const [status, setStatus] = useState<IStatus>();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilter(searchParams));
    }, []);

    useEffect(() => {
        for (const key of searchParams.keys()) {
            console.log(key, searchParams.get(key));
        }
        ipbeList(searchParams);
    }, [location.search]);

    return { data, status };
}
