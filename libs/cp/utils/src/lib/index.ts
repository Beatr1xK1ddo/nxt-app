import {Manager, Socket} from "socket.io-client";

import {IRealtimeAppEvent, IRealtimeAppStatusEvent, IRealtimeAppTimingEvent} from "@nxt-ui/cp/types";

export * from "./validators";

export const isIRealtimeAppStatusEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppStatusEvent => {
    return typeof data === "object" && "status" in data;
};

export const isIRealtimeAppTimingEvent = (data?: IRealtimeAppEvent): data is IRealtimeAppTimingEvent => {
    return typeof data === "object" && "startedAt" in data;
};

export class RealtimeServicesSocketFactory {
    private static factoryInstances: Map<string, RealtimeServicesSocketFactory> = new Map();

    static server = (url: string): RealtimeServicesSocketFactory => {
        let instance = RealtimeServicesSocketFactory.factoryInstances.get(url);
        if (!instance) {
            instance = new RealtimeServicesSocketFactory(url);
            RealtimeServicesSocketFactory.factoryInstances.set(url, instance);
        }
        return instance;
    };

    private url: string;
    private pathToSocketMap: Map<string, Socket>;
    private pathToCountMap: Map<string, number>;

    private constructor(url: string) {
        this.url = url;
        this.pathToSocketMap = new Map<string, Socket>();
        this.pathToCountMap = new Map<string, number>();
    }

    namespace(path: string): Socket {
        let socket = this.pathToSocketMap.get(path);
        if (!socket) {
            const manager = new Manager(this.url);
            socket = manager.socket(path);
            this.pathToSocketMap.set(path, socket);
        }
        const count = this.pathToCountMap.get(path);
        this.pathToCountMap.set(path, count ? count + 1 : 1);
        return socket;
    }

    cleanup(path: string): void {
        const count = this.pathToCountMap.get(path);
        if (count) {
            if (count > 1) {
                this.pathToCountMap.set(path, count - 1);
            } else {
                this.pathToCountMap.delete(path);
                const socket = this.pathToSocketMap.get(path);
                if (socket) {
                    socket.disconnect();
                    this.pathToSocketMap.delete(path);
                }
            }
        }
    }
}
