import {
    IArrResponse,
    ICompany,
    IIbpeCard,
    INode,
    NxtAPI,
} from '@nxt-ui/cp/api';
import {
    EItemsPerPage,
    IFilters,
    setFilter,
    setLoader,
} from '@nxt-ui/cp/ducks';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Manager, Socket } from 'socket.io-client';
import { IRealtimeAppEvent } from './types';

export type IStatus = 'pending' | 'ok' | 'error';

export function useGetIpbe() {
    const initEffect = useCallback(async (search: URLSearchParams) => {
        try {
            dispatch(setLoader(true));
            if (!search.has(IFilters.itemsPerPage)) {
                search.set(IFilters.itemsPerPage, EItemsPerPage.fifty);
            }
            if (!search.has(IFilters.page)) {
                search.set('page', '1');
            }
            const response = await NxtAPI.getCards(search.toString());
            set(response);
        } catch (e) {
            console.log('Error occured');
        } finally {
            dispatch(setLoader(false));
        }
    }, []);

    const [data, set] = useState<IArrResponse<IIbpeCard>>();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilter(searchParams));
    }, []);

    useEffect(() => {
        initEffect(searchParams);
    }, [location.search, initEffect]);

    return { data };
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
    }, [initEffect]);

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
    }, [initEffect]);

    return { data, status };
}

// testing logic
const socketCreator = (url: string) => {
    const manager = new Manager(url);
    const socket = manager.socket('/reddis');
    return () => socket;
};

const getSocket = socketCreator('http://localhost:3000/');

export function useIpbeSocket() {
    const [data, set] = useState<IRealtimeAppEvent>();

    const socket = useMemo(() => {
        return getSocket();
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Client connected to Reddis');
        });

        socket.on('response', (data: string) => {
            const cleanData = JSON.parse(data) as IRealtimeAppEvent;
            console.log(`Reddis data ${cleanData}`);
            set(cleanData);
        });

        socket.on('error', (error) => {
            console.log(`Reddis error ${JSON.stringify(error)}`);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return { data, socket };
}
