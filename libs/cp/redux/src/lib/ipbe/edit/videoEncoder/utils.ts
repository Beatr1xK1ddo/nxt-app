import {IApiIpbe} from "@nxt-ui/cp/api";
import {
    EIpbeAspectRatio,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
} from "@nxt-ui/cp/types";
import {EVideoEncoderFields, IIpbeEditVideoEncoder, IIpbeEditVideoEncoderErrors} from "./types";
import {convertToMbps} from "@nxt-ui/cp/utils";

export const videoEncoderErrorState: IIpbeEditVideoEncoderErrors = Object.values(EVideoEncoderFields).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const ipbeApiToVideoEncoderMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditVideoEncoder => ({
    videoEncoder: apiIpbeListItem.videoEncoder as unknown as EIpbeVideoEncoder,
    preset: apiIpbeListItem.preset as unknown as EIpbePreset,
    profile: apiIpbeListItem.profile as unknown as EIpbeProfile,
    level: apiIpbeListItem.level?.toString() as EIpbeLevel,
    videoBitrate: apiIpbeListItem.videoBitrate?.toString(),
    vbvMaxrate: apiIpbeListItem.vbvMaxrate?.toString(),
    vbvBufsize: apiIpbeListItem.vbvBufsize?.toString(),
    aspectRatio: apiIpbeListItem.aspectRatio as unknown as EIpbeAspectRatio,
    keyint: apiIpbeListItem.keyint,
    bframes: apiIpbeListItem.bframes,
    maxRefs: apiIpbeListItem.maxRefs,
    lookahead: apiIpbeListItem.lookahead,
    openGop: apiIpbeListItem.openGop,
    bFrameAdaptive: apiIpbeListItem.bFrameAdaptive,
    scenecutThreshold: apiIpbeListItem.scenecutThreshold,
    interlaced: apiIpbeListItem.interlaced?.toString() as EIpbeInterlaced,
    cbr: apiIpbeListItem.cbr,
    intraRefresh: apiIpbeListItem.intraRefresh,
    threads: apiIpbeListItem.threads,
});

export const ipbeVideoEncoderToApiMapper = (editIpbeListItem: IIpbeEditVideoEncoder) => ({
    videoEncoder: editIpbeListItem.videoEncoder,
    preset: editIpbeListItem.preset,
    profile: editIpbeListItem.profile,
    level: editIpbeListItem.level,
    aspectRatio: editIpbeListItem.aspectRatio,
    keyint: editIpbeListItem.keyint,
    bframes: editIpbeListItem.bframes,
    maxRefs: editIpbeListItem.maxRefs,
    lookahead: editIpbeListItem.lookahead,
    openGop: editIpbeListItem.openGop,
    bFrameAdaptive: editIpbeListItem.bFrameAdaptive,
    scenecutThreshold: editIpbeListItem.scenecutThreshold,
    interlaced: editIpbeListItem.interlaced,
    cbr: editIpbeListItem.cbr,
    intraRefresh: editIpbeListItem.intraRefresh,
    threads: editIpbeListItem.threads,
    videoBitrate: convertToMbps(editIpbeListItem.videoBitrate),
    vbvBufsize: convertToMbps(editIpbeListItem.vbvBufsize),
    vbvMaxrate: convertToMbps(editIpbeListItem.vbvMaxrate),
});
