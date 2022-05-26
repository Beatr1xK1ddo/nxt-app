import {IApiIpbe} from "@nxt-ui/cp/api";
import {
    EIpbeAspectRatio,
    EIpbeBFrameAdaptive,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
} from "@nxt-ui/cp/types";
import {EVideoEncoderFormError, IIpbeEditVideoEncoder, IIpbeEditVideoEncoderErrorsState} from "./types";

export const videoEncoderErrorState: IIpbeEditVideoEncoderErrorsState = Object.values(EVideoEncoderFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const ipbeEditFormVideoEncoderMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditVideoEncoder => ({
    videoEncoder: apiIpbeListItem.videoEncoder as unknown as EIpbeVideoEncoder,
    preset: apiIpbeListItem.preset as unknown as EIpbePreset,
    profile: apiIpbeListItem.profile as unknown as EIpbeProfile,
    level: apiIpbeListItem.level as unknown as EIpbeLevel,
    vbitrate: apiIpbeListItem.vbitrate,
    vbvMaxrate: apiIpbeListItem.vbvMaxrate,
    vbvBufsize: apiIpbeListItem.vbvBufsize,
    aspectRatio: apiIpbeListItem.aspectRatio as unknown as EIpbeAspectRatio,
    keyint: apiIpbeListItem.keyint,
    bframes: apiIpbeListItem.bframes,
    maxRefs: apiIpbeListItem.maxRefs,
    lookahead: apiIpbeListItem.lookahead,
    openGop: apiIpbeListItem.openGop,
    bFrameAdaptive: apiIpbeListItem.bFrameAdaptive as unknown as EIpbeBFrameAdaptive,
    scenecutThreshold: apiIpbeListItem.scenecutThreshold,
    interlaced: apiIpbeListItem.interlaced as unknown as EIpbeInterlaced,
    cbr: apiIpbeListItem.cbr,
    intraRefresh: apiIpbeListItem.intraRefresh,
    threads: apiIpbeListItem.threads,
});
