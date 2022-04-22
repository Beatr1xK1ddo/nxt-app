import { IRealtimeAppEvent, IRealtimeAppStatusEvent } from '@nxt-ui/cp/hooks';

export const isIRealtimeAppStatusEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppStatusEvent => {
    return typeof data === 'object' && 'status' in data;
}