import {EApiIpbeEncoderVersion, IApiIpbe} from "@nxt-ui/cp/api";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    IIpbeListItemDestination,
} from "@nxt-ui/cp/types";
import {EIpbeMainError, IIpbeEditMainErrors, IIpbeEditMain} from "./types";

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

export const ipbeEditFormMainMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditMain => ({
    name: apiIpbeListItem.name,
    company: apiIpbeListItem.company,
    node: apiIpbeListItem.node,
    videoConnection: apiIpbeListItem.videoConnection as unknown as EIpbeVideoConnection,
    applicationType: apiIpbeListItem.applicationType as unknown as EIpbeApplicationType,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations as unknown as Array<IIpbeListItemDestination>,
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
