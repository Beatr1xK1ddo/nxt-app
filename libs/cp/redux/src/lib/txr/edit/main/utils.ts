import {IApiTxr, IApiTxrEditErrorField} from "@nxt-ui/cp/api";
import {ETxrMainError, ITxrEditMainErrors, ITxrEditMain, EApiTxrMainError, ITxrEditErrorField} from "./types";

export const mainErrorState: ITxrEditMainErrors = Object.values(ETxrMainError).reduce((obj: any, key, index) => {
    if (index === 0) {
        obj.txrDestinations = [
            {
                outputIp: {error: false},
                ttl: {error: false},
                outputPort: {error: false},
            },
        ];
    }
    obj[key] = {
        error: false,
    };
    return obj;
}, {});

export const txrApiToMainMapper = (apiTxrListItem: IApiTxr): ITxrEditMain => ({
    id: apiTxrListItem.id,
    name: apiTxrListItem.name,
    company: apiTxrListItem.company,
    status: apiTxrListItem.status,
    statusChange: apiTxrListItem.statusChange,
    startedAtMs: apiTxrListItem.startedAtMs,
    txNodeId: apiTxrListItem.txNode,
    rxNodeId: apiTxrListItem.rxNode,
    appType: apiTxrListItem.appType,
    sourceIp: apiTxrListItem.sourceIp,
    sourcePort: apiTxrListItem.sourcePort,
    txUseInterface: apiTxrListItem.txUseInterface,
    transmissionIp: apiTxrListItem.transmissionIp,
    transmissionPort: apiTxrListItem.transmissionPort,
    destinationIp: apiTxrListItem.destinationIp,
    destinationPort: apiTxrListItem.destinationPort,
    rxUseInterface: apiTxrListItem.rxUseInterface,
    rxRunMonitor: apiTxrListItem.rxRunMonitor,
    doubleRetransmission: apiTxrListItem.doubleRetransmission,
    openPortAt: apiTxrListItem.openPortAt,
    txRunMonitor: apiTxrListItem.txRunMonitor,
    ttl: apiTxrListItem.ttl,
    buffer: apiTxrListItem.buffer,
    type: apiTxrListItem._appType,
    endpoint: apiTxrListItem.endpoint,
    arq: apiTxrListItem.arq,
    fec: apiTxrListItem.fec,
    fecHorizontalSize: apiTxrListItem.fecHorizontalSize,
    fecSize: apiTxrListItem.fecSize,
    latencyMode: apiTxrListItem.latencyMode,
    latencyMultiplier: apiTxrListItem.latencyMultiplier,
    latencyTime: apiTxrListItem.latencyTime,
    recvBuffer: apiTxrListItem.recvBuffer,
});

export const txrMainToApiMapper = (txrListItem: ITxrEditMain) => ({
    id: txrListItem.id,
    name: txrListItem.name,
    company: txrListItem.company,
    status: txrListItem.status,
    statusChange: txrListItem.statusChange,
    startedAtMs: txrListItem.startedAtMs,
    txNode: txrListItem.txNodeId,
    rxNode: txrListItem.rxNodeId,
    appType: txrListItem.appType,
    sourceIp: txrListItem.sourceIp,
    sourcePort: txrListItem.sourcePort,
    txUseInterface: txrListItem.txUseInterface,
    transmissionIp: txrListItem.transmissionIp,
    transmissionPort: txrListItem.transmissionPort,
    destinationIp: txrListItem.destinationIp,
    destinationPort: txrListItem.destinationPort,
    rxUseInterface: txrListItem.rxUseInterface,
    rxRunMonitor: txrListItem.rxRunMonitor,
    doubleRetransmission: txrListItem.doubleRetransmission,
    openPortAt: txrListItem.openPortAt,
    txRunMonitor: txrListItem.txRunMonitor,
    ttl: txrListItem.ttl,
    buffer: txrListItem.buffer,
    endpoint: txrListItem.endpoint,
    arq: txrListItem.arq,
    fec: txrListItem.fec,
    fecHorizontalSize: txrListItem.fecHorizontalSize,
    fecSize: txrListItem.fecSize,
    latencyMode: txrListItem.latencyMode,
    latencyMultiplier: txrListItem.latencyMultiplier,
    latencyTime: txrListItem.latencyTime,
    recvBuffer: txrListItem.recvBuffer,
});

// TODO Kate copyPaste code
export const apiResponseErrorMapper = (errors: Array<IApiTxrEditErrorField>): Array<ITxrEditErrorField> => {
    const result = [] as Array<ITxrEditErrorField>;

    errors.forEach((error) => {
        const key = error.key as EApiTxrMainError;
        if (key in ETxrMainError) {
            //@ts-ignore TODO Kate: remove
            result.push({key: ETxrMainError[key], text: error.message});
        }
    });

    return result;
};
