import {IApiIpbe} from "@nxt-ui/cp/api";
import {EMainFormError, IIpbeEditMainErrorsState, IIpbeEditMain} from "./types";

export const mainErrorState: IIpbeEditMainErrorsState = Object.values(EMainFormError).reduce((obj: any, key) => {
    obj[key] = {
        error: false,
    };
    return obj;
}, {});

export const ipbeEditFormMainMapper =
    () =>
    (apiIpbeListItem: IApiIpbe): IIpbeEditMain => ({
        name: apiIpbeListItem.name,
        company: apiIpbeListItem.company,
        node: apiIpbeListItem.node,
        videoConnection: apiIpbeListItem.videoConnection,
        applicationType: apiIpbeListItem.applicationType,
        ipbeDestinations: apiIpbeListItem.ipbeDestinations,
        videoOutputIp: apiIpbeListItem.videoOutputIp,
        videoOutputPort: apiIpbeListItem.videoOutputPort,
        audioOutputIp: apiIpbeListItem.audioOutputIp,
        audioOutputPort: apiIpbeListItem.audioOutputPort,
        encoderVersion: apiIpbeListItem.encoderVersion,
        inputFormat: apiIpbeListItem.inputFormat,
        latency: apiIpbeListItem.latency,
        outputType: apiIpbeListItem.outputType,
        cardIdx: apiIpbeListItem.cardIdx,
    });
