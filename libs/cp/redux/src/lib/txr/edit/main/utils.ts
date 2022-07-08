import {IApiTxr, IApiTxrEditErrorField} from "@nxt-ui/cp/api";
import {ETxrApplicationType} from "@nxt-ui/cp/types";
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
    doubleTransmission: apiTxrListItem.doubleRetransmission,
    openPortAt: apiTxrListItem.openPortAt,
    txRunMonitor: apiTxrListItem.txRunMonitor,
    ttl: apiTxrListItem.ttl,
    buffer: apiTxrListItem.buffer,
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
    doubleRetransmission: txrListItem.doubleTransmission,
    openPortAt: txrListItem.openPortAt,
    txRunMonitor: txrListItem.txRunMonitor,
});

export const applicationTypeErrorChecker = (errors: ITxrEditMainErrors, value: ETxrApplicationType) => {
    if (errors.applicationType.error && value) {
        errors.applicationType.error = false;
        delete errors.applicationType.helperText;
    }
};

export const apiResponseErrorMapper = (errors: Array<IApiTxrEditErrorField>): Array<ITxrEditErrorField> => {
    const result = [] as Array<ITxrEditErrorField>;

    errors.forEach((error) => {
        const key = error.key as EApiTxrMainError;
        if (key === "node") {
            result.push({key: ETxrMainError.nodeId, text: error.message});
        } else if (key in ETxrMainError) {
            result.push({key: ETxrMainError[key], text: error.message});
        }
    });

    return result;
};
