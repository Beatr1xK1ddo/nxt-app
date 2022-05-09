import {IRealtimeAppEvent, IRealtimeAppStatusEvent} from "@nxt-ui/cp/types";
export * from "./validators";
export const isIRealtimeAppStatusEvent = (
    data?: IRealtimeAppEvent
): data is IRealtimeAppStatusEvent => {
    return typeof data === "object" && "status" in data;
};
