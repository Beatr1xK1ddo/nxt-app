//selectors
import {NumericId, StringId} from "@nxt-ui/cp/types";
import {ICommonState} from "./types";
import {nodesSelectors} from "./nodes";
import {applicationSelectors} from "./applications";
import {companiesSelector} from "./companies";
import {proxyServersSelector} from "./proxyServers";
import {NOTIFICATIONS_SLICE_NAME, notificationsSelectors} from "./notifications";
import {
    selectIpbeKeyName,
    selectIpbeNavActive,
    selectIpbeNavTabs,
    selectTxrKeyName,
    selectTxrNavActive,
    selectTxrNavTabs,
} from "./navigation/selectors";
import {baseAppSelectors} from "./baseApp";

//base
export const selectTabVisible = (state: ICommonState) => baseAppSelectors.selectTabVisible(state.baseApp);
//applications
export const selectSelectedApps = (state: ICommonState) => applicationSelectors.selectSelectedApps(state.applications);
// node
export const selectNodeById = (state: ICommonState, id: NumericId) => nodesSelectors.selectById(state.nodes, id);
export const selectNodesAll = (state: ICommonState) => nodesSelectors.selectAll(state.nodes);
export const selectNodeStatus = (state: ICommonState) => nodesSelectors.selectStatus(state.nodes);
export const selectNodesIds = (state: ICommonState) => nodesSelectors.selectIds(state.nodes);
export const selectNodesWithFilter = (state: ICommonState, filter?: string) =>
    nodesSelectors.selectWithFilter(state.nodes, filter);
// company
export const selectCompanyById = (state: ICommonState, id: NumericId) =>
    companiesSelector.selectById(state.companies, id);
export const selectCompanyStatus = (state: ICommonState) => companiesSelector.selectStatus(state.companies);
export const selectCompaniesAll = (state: ICommonState) => companiesSelector.selectAll(state.companies);
export const selectCompaniesWithFilter = (state: ICommonState, filter?: string) =>
    companiesSelector.selectWithFilter(state.companies, filter);
//notifications
export const notifications = {
    all: (state: ICommonState) => notificationsSelectors.all(state[NOTIFICATIONS_SLICE_NAME]),
    visible: (state: ICommonState) => notificationsSelectors.visible(state[NOTIFICATIONS_SLICE_NAME]),
    byId: (state: ICommonState, id: StringId) => notificationsSelectors.byId(state[NOTIFICATIONS_SLICE_NAME], id),
};
// proxyServer
export const selectProxyServerItemById = (state: ICommonState, id: NumericId) =>
    proxyServersSelector.selectById(state.proxyServers, id);
export const selectProxyServers = (state: ICommonState) => proxyServersSelector.selectAll(state.proxyServers);
export const selectProxyServersEntities = (state: ICommonState) =>
    proxyServersSelector.selectEntities(state.proxyServers);
export const selectProxyServersStatus = (state: ICommonState) => nodesSelectors.selectStatus(state.nodes);
// navigation
export const ipbeNavTabs = (state: ICommonState) => selectIpbeNavTabs(state.navigation);
export const txrNavTabs = (state: ICommonState) => selectTxrNavTabs(state.navigation);
export const ipbeName = (state: ICommonState) => selectIpbeKeyName(state.navigation);
export const txrName = (state: ICommonState) => selectTxrKeyName(state.navigation);
export const ipbeActive = (state: ICommonState) => selectIpbeNavActive(state.navigation);
export const txrActive = (state: ICommonState) => selectTxrNavActive(state.navigation);
