import {IRealtimeAppEvent, IRealtimeAppStatusEvent, IRealtimeAppTimingEvent} from "@nxt-ui/cp/types";

export * from "./validators";

export const isIRealtimeAppStatusEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppStatusEvent => {
    return typeof data === "object" && "status" in data;
};

export const isIRealtimeAppTimingEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppTimingEvent => {
    return typeof data === "object" && "startedAt" in data;
};
