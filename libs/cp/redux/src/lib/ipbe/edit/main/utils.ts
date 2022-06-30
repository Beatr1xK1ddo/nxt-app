import {EApiIpbeEncoderVersion, IApiIpbe, IApiIpbeEditErrorField} from "@nxt-ui/cp/api";
import {ipbeSdi2WebExtraFields} from "@nxt-ui/cp/constants";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IIpbeListItemDestination,
} from "@nxt-ui/cp/types";
import {
    EIpbeMainError,
    IIpbeEditMainErrors,
    IIpbeEditMain,
    IIpbeDestinationError,
    IIpbeSdi2WebExtraFields,
    EApiIpbeMainError,
    IIpbeEditErrorField,
} from "./types";

export const mainErrorState: IIpbeEditMainErrors = Object.values(EIpbeMainError).reduce((obj: any, key, index) => {
    if (index === 0) {
        obj.ipbeDestinations = [
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

export const ipbeApiToMainMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditMain => ({
    id: apiIpbeListItem.id,
    name: apiIpbeListItem.name,
    company: apiIpbeListItem.company,
    status: apiIpbeListItem.status,
    statusChange: apiIpbeListItem.statusChange,
    startedAtMs: apiIpbeListItem.startedAtMs,
    nodeId: apiIpbeListItem.node,
    videoConnection: apiIpbeListItem.videoConnection as unknown as EIpbeVideoConnection,
    applicationType: apiIpbeListItem.applicationType as unknown as EIpbeApplicationType,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations as unknown as Array<IIpbeListItemDestination>,
    videoOutputIp: apiIpbeListItem.videoOutputIp,
    videoOutputPort: apiIpbeListItem.videoOutputPort,
    audioOutputIp: apiIpbeListItem.audioOutputIp,
    audioOutputPort: apiIpbeListItem.audioOutputPort,
    encoderVersion: apiIpbeListItem.encoderVersion as unknown as keyof typeof EApiIpbeEncoderVersion,
    inputFormat: apiIpbeListItem.inputFormat as unknown as EIpbeEncoderVideoFormat,
    latency: apiIpbeListItem.latency as unknown as keyof typeof EIpbeLatency,
    outputType: apiIpbeListItem.outputType as unknown as EIpbeOutputType,
    sdiDevice: apiIpbeListItem.sdiDevice,
});

export const ipbeMainToApiMapper = (ipbeListItem: IIpbeEditMain) => ({
    id: ipbeListItem.id,
    name: ipbeListItem.name,
    company: ipbeListItem.company,
    status: ipbeListItem.status,
    statusChange: ipbeListItem.statusChange,
    startedAtMs: ipbeListItem.startedAtMs,
    node: ipbeListItem.nodeId,
    videoConnection: ipbeListItem.videoConnection,
    applicationType: ipbeListItem.applicationType,
    ipbeDestinations: ipbeListItem.ipbeDestinations,
    videoOutputIp: ipbeListItem.videoOutputIp,
    videoOutputPort: ipbeListItem.videoOutputPort,
    audioOutputIp: ipbeListItem.audioOutputIp,
    audioOutputPort: ipbeListItem.audioOutputPort,
    encoderVersion: ipbeListItem.encoderVersion,
    inputFormat: ipbeListItem.inputFormat,
    latency: ipbeListItem.latency,
    outputType: ipbeListItem.outputType,
    sdiDevice: ipbeListItem.sdiDevice,
});

export const applicationTypeErrorChecker = (errors: IIpbeEditMainErrors, value: EIpbeApplicationType) => {
    if (errors.applicationType.error && value) {
        errors.applicationType.error = false;
        delete errors.applicationType.helperText;
    }
    if (value === EIpbeApplicationType.Sdi2Web && errors.ipbeDestinations?.length) {
        errors.ipbeDestinations.forEach((destination) => {
            const keys = Object.keys(destination) as Array<keyof IIpbeDestinationError>;
            keys.forEach((key) => {
                if (destination[key].error) {
                    destination[key].error = false;
                    delete destination[key].helperText;
                }
            });
        });
    } else {
        const keys = ipbeSdi2WebExtraFields as IIpbeSdi2WebExtraFields;
        keys.forEach((key) => {
            if (errors[key].error) {
                errors[key].error = false;
                delete errors[key].helperText;
            }
        });
    }
};

export const apiResponseErrorMapper = (errors: Array<IApiIpbeEditErrorField>): Array<IIpbeEditErrorField> => {
    const result = [] as Array<IIpbeEditErrorField>;

    errors.forEach((error) => {
        const key = error.key as EApiIpbeMainError;
        if (key === "node") {
            result.push({key: EIpbeMainError.nodeId, text: error.message});
        } else if (key.includes("ipbeDestinations")) {
            const resultsArr = key.split(".");
            const field = resultsArr.pop() as keyof IIpbeDestinationError | undefined;
            const id = parseInt(resultsArr[0].slice(resultsArr[0].length - 2));
            if (field && !isNaN(id)) {
                result.push({key: "ipbeDestinations", text: error.message, index: id, field});
            }
        } else if (key in EIpbeMainError) {
            result.push({key: EIpbeMainError[key], text: error.message});
        }
    });

    return result;
};
