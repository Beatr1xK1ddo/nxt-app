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
import { EStatusTypes, IRealtimeAppEvent, IThumbnailResponse } from '@nxt-ui/cp/types';

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

export function useIpbeSocket(id: string, nodeId: number, status: EStatusTypes) {
    const [data, set] = useState<EStatusTypes>(status);

    useEffect(() => {
        reddisSocket.emit("subscribe", {id, nodeId});

        reddisSocket.on('connect', () => {
            console.log('Client connected to Reddis');
        });

        reddisSocket.on('response', (data: string) => {
            const cleanData = JSON.parse(data) as IRealtimeAppEvent;

            if (id.toString() !== cleanData.id) {
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

export function useThumbnailsSocket(ipbeId: string) {
    const [data, set] = useState<string>('');
    const channel = `ibpe-${ipbeId}`;

    useEffect(() => {
        thumbSocket.emit("subscribe", {channel});

        thumbSocket.on('connect', () => {
            console.log('Client connected to Thumbnails');
        });

        thumbSocket.on('response', (data: IThumbnailResponse) => {
            if (channel === data.channel) {
                const result = `data:image/png;base64,${data.imageSrcBase64}`;
                set(result);
            }
        });

        thumbSocket.on('error', (error) => {
            console.log(`Reddis error ${JSON.stringify(error)}`);
        });

        return () => {
            thumbSocket.disconnect()
        }
    }, [channel])

    return {data}
}

export function useFormData<T>(id: number, cb: (id: number) => Promise<T | undefined>) {
    const [data, set] = useState<T>();

    useEffect(() => {
        cb(id).then(data => set(data));
    }, [id, cb]);

    return { data };
}