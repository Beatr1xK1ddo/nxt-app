//selectors
import {NumericId} from "@nxt-ui/cp/types";
import {ICommonState} from "./types";
import {nodesSelectors} from "./nodes";
import {companiesSelector} from "./companies";
// node
export const selectNodeById = (state: ICommonState, id: NumericId) => nodesSelectors.selectById(state.nodes, id);
export const selectNodesAll = (state: ICommonState) => nodesSelectors.selectAll(state.nodes);
export const selectNodesIds = (state: ICommonState) => nodesSelectors.selectIds(state.nodes);
export const selectNodesWithFilter = (state: ICommonState, filter?: string) =>
    nodesSelectors.selectWithFilter(state.nodes, filter);
// company
export const selectCompanyById = (state: ICommonState, id: NumericId) =>
    companiesSelector.selectById(state.companies, id);
export const selectCompaniesAll = (state: ICommonState) => companiesSelector.selectAll(state.companies);
export const selectCompaniesWithFilter = (state: ICommonState, filter?: string) =>
    companiesSelector.selectWithFilter(state.companies, filter);
