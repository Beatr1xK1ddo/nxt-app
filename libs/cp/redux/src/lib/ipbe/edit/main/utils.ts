import {EApiIpbeEncoderVersion, IApiIpbe} from "@nxt-ui/cp/api";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IIpbeListItemDestinations,
} from "@nxt-ui/cp/types";
import {EMainFormError, IIpbeEditMainErrorsState, IIpbeEditMain} from "./types";

export const mainErrorState: IIpbeEditMainErrorsState = Object.values(EMainFormError).reduce((obj: any, key) => {
    obj[key] = {
        error: false,
    };
    return obj;
}, {});

export const ipbeEditFormMainMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditMain => ({
    name: apiIpbeListItem.name,
    company: apiIpbeListItem.company,
    node: apiIpbeListItem.node,
    videoConnection: apiIpbeListItem.videoConnection as unknown as EIpbeVideoConnection,
    applicationType: apiIpbeListItem.applicationType as unknown as EIpbeApplicationType,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations as unknown as Array<IIpbeListItemDestinations>,
    videoOutputIp: apiIpbeListItem.videoOutputIp,
    videoOutputPort: apiIpbeListItem.videoOutputPort,
    audioOutputIp: apiIpbeListItem.audioOutputIp,
    audioOutputPort: apiIpbeListItem.audioOutputPort,
    encoderVersion: apiIpbeListItem.encoderVersion as unknown as keyof typeof EApiIpbeEncoderVersion,
    inputFormat: apiIpbeListItem.inputFormat as unknown as EIpbeEncoderVideoFormat,
    latency: apiIpbeListItem.latency as unknown as EIpbeLatency,
    outputType: apiIpbeListItem.outputType as unknown as EIpbeOutputType,
    cardIdx: apiIpbeListItem.cardIdx,
});