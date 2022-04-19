import {
    IArrResponse,
    ICompany,
    IIbpeCard,
    INode,
    NxtAPI,
} from '@nxt-ui/cp/api';
import { EItemsPerPage, IFilters, setFilter } from '@nxt-ui/cp/ducks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

type IStatus = 'pending' | 'ok' | 'error';

export function useGetIpbe() {
    const initEffect = useCallback(async (search: URLSearchParams) => {
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

    const [data, set] = useState<IArrResponse<IIbpeCard>>();

    const [status, setStatus] = useState<IStatus>();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilter(searchParams));
    }, []);

    useEffect(() => {
        initEffect(searchParams);
    }, [location.search]);

    return { data, status };
}

export function useGetNodes() {
    const initEffect = useCallback(async () => {
        try {
            setStatus('pending');
            const response = await NxtAPI.getNodes();
            setStatus('ok');
            set(response?.data);
        } catch (e) {
            setStatus('error');
            console.log('Error occured');
        }
    }, []);

    const [data, set] = useState<INode[]>();

    const [status, setStatus] = useState<IStatus>();

    useEffect(() => {
        initEffect();
    }, []);

    return { data, status };
}

export function useGetCompanies() {
    const initEffect = useCallback(async () => {
        try {
            setStatus('pending');

            const response = await NxtAPI.getCompanies();

            setStatus('ok');

            set(response?.data);
        } catch (e) {
            setStatus('error');
            console.log('Error occured');
        }
    }, []);

    const [data, set] = useState<ICompany[]>();

    const [status, setStatus] = useState<IStatus>();

    useEffect(() => {
        initEffect();
    }, []);

    return { data, status };
}

// export function useEditAppForm() {

// }
