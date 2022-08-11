import {IApiTxrListItem} from "@nxt-ui/cp/api";
import {EApiAppType, EAppGeneralStatus, EAppGeneralStatusChange, ITxrListItem} from "@nxt-ui/cp/types";

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
    outputIp: apiTxrListItem.destinationIp,
    outputPort: apiTxrListItem.destinationPort,
    rxRunMonitor: apiTxrListItem.rxRunMonitor,
    appType: apiTxrListItem.appType,
    proxyServersIds: apiTxrListItem.proxyServers,
    endpoint: apiTxrListItem.endpoint,
    type: EApiAppType.TXR,
});
