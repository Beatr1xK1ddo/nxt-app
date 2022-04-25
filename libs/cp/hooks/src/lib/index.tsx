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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Manager } from 'socket.io-client';
import { isIRealtimeAppStatusEvent } from '@nxt-ui/cp/utils';
import { IRealtimeAppEvent } from '@nxt-ui/cp/types';
import { EStatusTypes } from '@nxt-ui/cp/api';

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
const socketCreator = (url: string, path: string) => {
    const manager = new Manager(url);
    const socket = manager.socket(path);    
    return () => socket;
};

const reddisSocket = socketCreator('http://localhost:3000/', '/reddis')();

export function useIpbeSocket(ipbeId: number, status: EStatusTypes) {
    const [data, set] = useState<EStatusTypes>(status);

    useEffect(() => {
        reddisSocket.on('connect', () => {
            console.log('Client connected to Reddis');
        });

        reddisSocket.on('response', (data: string) => {
            const cleanData = JSON.parse(data) as IRealtimeAppEvent;

            if (ipbeId.toString() !== cleanData.id) {
                return;
            }

            if (isIRealtimeAppStatusEvent(cleanData)) {
                set(cleanData.status);
            }
        });

        reddisSocket.on('error', (error) => {
            console.log(`Reddis error ${JSON.stringify(error)}`);
        });

        return () => {
            reddisSocket.disconnect()
        }
    }, [])

    return {data}
}

const thumbSocket = socketCreator('http://localhost:3000/', '/thumb')();


export function useThumbnailsSocket(ipbeId: number) {
    const [data, set] = useState<string>('');

    useEffect(() => {
        thumbSocket.emit("subscribe", {id: ipbeId});

        thumbSocket.on('connect', () => {
            console.log('Client connected to Thumbnails');
        });

        thumbSocket.on('response', (data: {id: number, thumbnail: string}) => {
            if (ipbeId === data.id) {
                const result = `data:image/png;base64,${data}`;
                set(result);
            }
        });

        thumbSocket.on('error', (error) => {
            console.log(`Reddis error ${JSON.stringify(error)}`);
        });

        return () => {
            thumbSocket.disconnect()
        }
    }, [])

    return {data}
}
