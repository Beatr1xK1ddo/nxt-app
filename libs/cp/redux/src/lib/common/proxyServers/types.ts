import {EntityState} from "@reduxjs/toolkit";
import {EDataProcessingStatus, IProxyServerItem} from "@nxt-ui/cp/types";

export interface IProxyServersState {
    data: EntityState<IProxyServerItem>;
    status: EDataProcessingStatus;
}
