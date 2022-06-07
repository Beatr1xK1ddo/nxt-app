import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, INodesListItem, IRealtimeNodeStatusEvent} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export type INodeOnlineStatusActionPayload = IRealtimeNodeStatusEvent;
