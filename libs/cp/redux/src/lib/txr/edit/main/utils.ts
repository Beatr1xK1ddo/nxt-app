import {EApiTxrEncoderVersion, IApiTxr, IApiTxrEditErrorField} from "@nxt-ui/cp/api";
//@ts-ignore
import {txrSdi2WebExtraFields} from "@nxt-ui/cp/constants";
import {
    ETxrApplicationType,
    ETxrEncoderVideoFormat,
    ETxrLatency,
    ETxrOutputType,
    ETxrVideoConnection,
    ITxrListItemDestination,
} from "@nxt-ui/cp/types";
import {
    ETxrMainError,
    ITxrEditMainErrors,
    ITxrEditMain,
    ITxrDestinationError,
    ITxrSdi2WebExtraFields,
    EApiTxrMainError,
    ITxrEditErrorField,
} from "./types";

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
    nodeId: apiTxrListItem.node,
    videoConnection: apiTxrListItem.videoConnection as unknown as ETxrVideoConnection,
    applicationType: apiTxrListItem.applicationType as unknown as ETxrApplicationType,
    txrDestinations: apiTxrListItem.txrDestinations as unknown as Array<ITxrListItemDestination>,
    videoOutputIp: apiTxrListItem.videoOutputIp,
    videoOutputPort: apiTxrListItem.videoOutputPort,
    audioOutputIp: apiTxrListItem.audioOutputIp,
    audioOutputPort: apiTxrListItem.audioOutputPort,
    encoderVersion: apiTxrListItem.encoderVersion as unknown as keyof typeof EApiTxrEncoderVersion,
    inputFormat: apiTxrListItem.inputFormat as unknown as ETxrEncoderVideoFormat,
    latency: apiTxrListItem.latency as unknown as keyof typeof ETxrLatency,
    outputType: apiTxrListItem.outputType as unknown as ETxrOutputType,
    sdiDevice: apiTxrListItem.sdiDevice,
});

export const txrMainToApiMapper = (txrListItem: ITxrEditMain) => ({
    id: txrListItem.id,
    name: txrListItem.name,
    company: txrListItem.company,
    status: txrListItem.status,
    statusChange: txrListItem.statusChange,
    startedAtMs: txrListItem.startedAtMs,
    node: txrListItem.nodeId,
    videoConnection: txrListItem.videoConnection,
    applicationType: txrListItem.applicationType,
    txrDestinations: txrListItem.txrDestinations,
    videoOutputIp: txrListItem.videoOutputIp,
    videoOutputPort: txrListItem.videoOutputPort,
    audioOutputIp: txrListItem.audioOutputIp,
    audioOutputPort: txrListItem.audioOutputPort,
    encoderVersion: txrListItem.encoderVersion,
    inputFormat: txrListItem.inputFormat,
    latency: txrListItem.latency,
    outputType: txrListItem.outputType,
    sdiDevice: txrListItem.sdiDevice,
});

export const applicationTypeErrorChecker = (errors: ITxrEditMainErrors, value: ETxrApplicationType) => {
    if (errors.applicationType.error && value) {
        errors.applicationType.error = false;
        delete errors.applicationType.helperText;
    }
    if (value === ETxrApplicationType.Sdi2Web && errors.txrDestinations?.length) {
        errors.txrDestinations.forEach((destination) => {
            const keys = Object.keys(destination) as Array<keyof ITxrDestinationError>;
            keys.forEach((key) => {
                if (destination[key].error) {
                    destination[key].error = false;
                    delete destination[key].helperText;
                }
            });
        });
    } else {
        const keys = txrSdi2WebExtraFields as ITxrSdi2WebExtraFields;
        keys.forEach((key) => {
            if (errors[key].error) {
                errors[key].error = false;
                delete errors[key].helperText;
            }
        });
    }
};

export const apiResponseErrorMapper = (errors: Array<IApiTxrEditErrorField>): Array<ITxrEditErrorField> => {
    const result = [] as Array<ITxrEditErrorField>;

    errors.forEach((error) => {
        const key = error.key as EApiTxrMainError;
        if (key === "node") {
            result.push({key: ETxrMainError.nodeId, text: error.message});
        } else if (key.includes("txrDestinations")) {
            const resultsArr = key.split(".");
            const field = resultsArr.pop() as keyof ITxrDestinationError | undefined;
            const id = parseInt(resultsArr[0].slice(resultsArr[0].length - 2));
            if (field && !isNaN(id)) {
                result.push({key: "txrDestinations", text: error.message, index: id, field});
            }
        } else if (key in ETxrMainError) {
            result.push({key: ETxrMainError[key], text: error.message});
        }
    });

    return result;
};
