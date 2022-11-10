import {createSelector} from "@reduxjs/toolkit";
import {INavigationState} from "../types";
import {activeNavTab} from "../utils";

export const selectNavNode = (state: INavigationState) => state.node;
export const selectActiveNodeTab = createSelector(selectNavNode, (node) => activeNavTab(node));
