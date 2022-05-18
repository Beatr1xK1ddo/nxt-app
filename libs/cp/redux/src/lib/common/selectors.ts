//selectors
import {NumericId} from "@nxt-ui/cp/types";

import {ICommonState} from "./types";
import {nodesSelectors} from "./nodes";
import {companiesSelector} from "./companies";

export const selectNode = (state: ICommonState, id: NumericId) => nodesSelectors.selectNode(state.nodes, id);
export const selectNodes = (state: ICommonState) => nodesSelectors.selectNodes(state.nodes);
export const selectNodesIds = (state: ICommonState) => nodesSelectors.selectNodesIds(state.nodes);

export const selectCompany = (state: ICommonState, id: NumericId) => companiesSelector.selectCompany(state.companies, id);
export const selectCompanies = (state: ICommonState) => companiesSelector.selectCompanies(state.companies);
