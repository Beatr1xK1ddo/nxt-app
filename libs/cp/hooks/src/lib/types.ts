import { EStatusTypes } from "@nxt-ui/cp/api";

export type IRealtimeAppEvent =
    | IRealtimeAppStatusEvent
    | IRealtimeAppTimingEvent;

export type IRealtimeAppStatusEvent = {
    id: string;
    type: string;
    status: EStatusTypes;
    statusChange: string;
};

export type IRealtimeAppTimingEvent = {
    id: string;
    type: string;
    startedAt: number;
};

export type IRedisClientEvent = {
    nodeId: number;
    // type: string;
    id: string;
};
