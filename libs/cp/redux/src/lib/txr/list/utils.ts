import {IApiTxrListItem} from "@nxt-ui/cp/api";
import {EAppGeneralStatus, EAppGeneralStatusChange, EAppType, ITxrListItem} from "@nxt-ui/cp/types";

export const txrListItemMapper = (apiTxrListItem: IApiTxrListItem): ITxrListItem => ({
    id: apiTxrListItem.id,
    name: apiTxrListItem.name,
    status: apiTxrListItem.status as unknown as EAppGeneralStatus,
    statusChange: apiTxrListItem.statusChange as unknown as EAppGeneralStatusChange,
    company: apiTxrListItem.company,
    startedAtMs: apiTxrListItem.startedAtMs,
    txNodeId: apiTxrListItem.txNode,
    rxNodeId: apiTxrListItem.rxNode,
    sourceIp: apiTxrListItem.sourceIp,
    sourcePort: apiTxrListItem.sourcePort,
    destinationIp: apiTxrListItem.destinationIp,
    destinationPort: apiTxrListItem.destinationPort,
    rxRunMonitor: apiTxrListItem.rxRunMonitor,
    appType: apiTxrListItem.appType,
    proxyServersIds: apiTxrListItem.proxyServers,
    type: apiTxrListItem._appType === "txr" ? EAppType.TXR : null,
});
