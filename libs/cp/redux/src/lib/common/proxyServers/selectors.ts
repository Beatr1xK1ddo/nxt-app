import {proxyServersAdapter} from "./slice";
import {IProxyServersState} from "./types";

const nodesSelectors = proxyServersAdapter.getSelectors((state: IProxyServersState) => state.data);

export const selectById = nodesSelectors.selectById;
export const selectAll = nodesSelectors.selectAll;
export const selectIds = nodesSelectors.selectIds;
export const selectEntities = nodesSelectors.selectEntities;
