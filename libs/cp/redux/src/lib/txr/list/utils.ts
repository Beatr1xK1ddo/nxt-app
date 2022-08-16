import {IApiTxrListItem} from "@nxt-ui/cp/api";
import {ITxrListItem} from "@nxt-ui/cp/types";

export const txrListItemMapper = (apiTxrListItem: IApiTxrListItem): ITxrListItem => ({
    id: apiTxrListItem.id,
    name: apiTxrListItem.name,
    status: apiTxrListItem.status,
    statusChange: apiTxrListItem.statusChange,
    startedAtMs: apiTxrListItem.startedAtMs,
    type: apiTxrListItem._appType,
    company: apiTxrListItem.company,
    txNodeId: apiTxrListItem.txNode,
    txNodeText: apiTxrListItem.txNodeText,
    txRunMonitor: apiTxrListItem.txRunMonitor,
    rxNodeId: apiTxrListItem.rxNode,
    rxNodeText: apiTxrListItem.rxNodeText,
    rxRunMonitor: apiTxrListItem.rxRunMonitor,
    appType: apiTxrListItem.appType,
    endpoint: apiTxrListItem.endpoint,
    sourceIp: apiTxrListItem.sourceIp,
    sourcePort: apiTxrListItem.sourcePort,
    outputIp: apiTxrListItem.destinationIp,
    outputPort: apiTxrListItem.destinationPort,
    proxyServersIds: apiTxrListItem.proxyServers,
});
