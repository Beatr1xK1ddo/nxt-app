import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, INodesListItem, NumericId} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export interface INodeOnlineStatusActionPayload {
    id: NumericId;
    online: boolean;
}
