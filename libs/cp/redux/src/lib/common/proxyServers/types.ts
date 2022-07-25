import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, IProxyServerItem, IRealtimeNodeStatusEvent} from "@nxt-ui/cp/types";

export interface IProxyServersState {
    data: EntityState<IProxyServerItem>;
    status: EDataProcessingStatus;
}

export type INodeOnlineStatusActionPayload = IRealtimeNodeStatusEvent;
