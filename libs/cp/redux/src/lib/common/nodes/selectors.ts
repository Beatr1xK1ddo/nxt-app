//selectors
import {nodesAdapter} from "./slice";
import {INodesState} from "./types";

const nodesSelectors = nodesAdapter.getSelectors((state: INodesState) => state.data);

export const selectNode = nodesSelectors.selectById;
export const selectNodes = nodesSelectors.selectAll;
export const selectNodesIds = nodesSelectors.selectIds;
