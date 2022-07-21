import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, INodesListItem, INodeStatusData} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export type INodeOnlineStatusActionPayload = INodeStatusData;
