import { EStatusTypes } from "@nxt-ui/cp/api";

export enum ECardView {
    card = 'card',
    table = 'table',
}

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