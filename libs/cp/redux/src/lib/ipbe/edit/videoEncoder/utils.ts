import {IApiIpbe} from "@nxt-ui/cp/api";
import {
    EIpbeAspectRatio,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
} from "@nxt-ui/cp/types";
import {EVideoEncoderErrors, IIpbeEditVideoEncoder, IIpbeEditVideoEncoderErrors} from "./types";

export const videoEncoderErrorState: IIpbeEditVideoEncoderErrors = Object.values(EVideoEncoderErrors).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const ipbeEditVideoEncoderMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditVideoEncoder => ({
    videoEncoder: apiIpbeListItem.videoEncoder as unknown as EIpbeVideoEncoder,
    preset: apiIpbeListItem.preset as unknown as EIpbePreset,
    profile: apiIpbeListItem.profile as unknown as EIpbeProfile,
    level: apiIpbeListItem.level.toString() as EIpbeLevel,
    videoBitrate: apiIpbeListItem.videoBitrate.toString(),
    vbvMaxrate: apiIpbeListItem.vbvMaxrate.toString(),
    vbvBufsize: apiIpbeListItem.vbvBufsize.toString(),
    aspectRatio: apiIpbeListItem.aspectRatio as unknown as EIpbeAspectRatio,
    keyint: apiIpbeListItem.keyint,
    bframes: apiIpbeListItem.bframes,
    maxRefs: apiIpbeListItem.maxRefs,
    lookahead: apiIpbeListItem.lookahead,
    openGop: apiIpbeListItem.openGop,
    bFrameAdaptive: apiIpbeListItem.bFrameAdaptive,
    scenecutThreshold: apiIpbeListItem.scenecutThreshold,
    interlaced: apiIpbeListItem.interlaced.toString() as EIpbeInterlaced,
    cbr: apiIpbeListItem.cbr,
    intraRefresh: apiIpbeListItem.intraRefresh,
    threads: apiIpbeListItem.threads,
});
