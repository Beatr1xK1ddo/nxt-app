import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, INodesListItem, INodeStatusDataRaw} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export type INodeOnlineStatusActionPayload = INodeStatusDataRaw;
