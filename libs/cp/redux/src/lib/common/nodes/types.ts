import {EntityState} from "@reduxjs/toolkit";
import {EAppType, EDataProcessingStatus, INodesListItem, INodeStatusDataRaw} from "@nxt-ui/cp/types";

export interface INodesState {
    data: EntityState<INodesListItem>;
    status: EDataProcessingStatus;
}

export type INodeOnlineStatusActionPayload = INodeStatusDataRaw;

export type IFetchNodes = {
    appType?: EAppType;
    all?: boolean;
};
