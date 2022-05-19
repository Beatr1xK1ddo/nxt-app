//selectors
import {createDraftSafeSelector} from "@reduxjs/toolkit";

import {INodesListItem} from "@nxt-ui/cp/types";

import {selectFilter} from "../../utils";
import {nodesAdapter} from "./slice";
import {INodesState} from "./types";

const nodesSelectors = nodesAdapter.getSelectors((state: INodesState) => state.data);

export const selectById = nodesSelectors.selectById;
export const selectAll = nodesSelectors.selectAll;
export const selectIds = nodesSelectors.selectIds;
export const selectEntities = nodesSelectors.selectEntities;

export const selectWithFilter = createDraftSafeSelector(
    selectAll,
    selectFilter,
    (nodes, filter): Array<INodesListItem> => {
        return filter
            ? nodes.filter((node) => {
                  const testValue = filter.toLowerCase();
                  const {name, hostname, serialNumber} = node;
                  return (
                      name?.toLowerCase().includes(testValue) ||
                      hostname?.toLowerCase().includes(testValue) ||
                      serialNumber?.toLowerCase().includes(testValue)
                  );
              })
            : nodes;
    }
);
