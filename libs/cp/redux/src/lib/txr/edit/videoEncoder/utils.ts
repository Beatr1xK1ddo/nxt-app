import {IApiTxr} from "@nxt-ui/cp/api";
import {
    ETxrAspectRatio,
    ETxrInterlaced,
    ETxrLevel,
    ETxrPreset,
    ETxrProfile,
    ETxrVideoEncoder,
} from "@nxt-ui/cp/types";
import {EVideoEncoderErrors, ITxrEditVideoEncoder, ITxrEditVideoEncoderErrors} from "./types";
import {convertToMbps} from "@nxt-ui/cp/utils";

export const videoEncoderErrorState: ITxrEditVideoEncoderErrors = Object.values(EVideoEncoderErrors).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const txrApiToVideoEncoderMapper = (apiTxrListItem: IApiTxr): ITxrEditVideoEncoder => ({
    videoEncoder: apiTxrListItem.videoEncoder as unknown as ETxrVideoEncoder,
    preset: apiTxrListItem.preset as unknown as ETxrPreset,
    profile: apiTxrListItem.profile as unknown as ETxrProfile,
    level: apiTxrListItem.level?.toString() as ETxrLevel,
    videoBitrate: apiTxrListItem.videoBitrate?.toString(),
    vbvMaxrate: apiTxrListItem.vbvMaxrate?.toString(),
    vbvBufsize: apiTxrListItem.vbvBufsize?.toString(),
    aspectRatio: apiTxrListItem.aspectRatio as unknown as ETxrAspectRatio,
    keyint: apiTxrListItem.keyint,
    bframes: apiTxrListItem.bframes,
    maxRefs: apiTxrListItem.maxRefs,
    lookahead: apiTxrListItem.lookahead,
    openGop: apiTxrListItem.openGop,
    bFrameAdaptive: apiTxrListItem.bFrameAdaptive,
    scenecutThreshold: apiTxrListItem.scenecutThreshold,
    interlaced: apiTxrListItem.interlaced?.toString() as ETxrInterlaced,
    cbr: apiTxrListItem.cbr,
    intraRefresh: apiTxrListItem.intraRefresh,
    threads: apiTxrListItem.threads,
});

export const txrVideoEncoderToApiMapper = (editTxrListItem: ITxrEditVideoEncoder) => ({
    videoEncoder: editTxrListItem.videoEncoder,
    preset: editTxrListItem.preset,
    profile: editTxrListItem.profile,
    level: editTxrListItem.level,
    aspectRatio: editTxrListItem.aspectRatio,
    keyint: editTxrListItem.keyint,
    bframes: editTxrListItem.bframes,
    maxRefs: editTxrListItem.maxRefs,
    lookahead: editTxrListItem.lookahead,
    openGop: editTxrListItem.openGop,
    bFrameAdaptive: editTxrListItem.bFrameAdaptive,
    scenecutThreshold: editTxrListItem.scenecutThreshold,
    interlaced: editTxrListItem.interlaced,
    cbr: editTxrListItem.cbr,
    intraRefresh: editTxrListItem.intraRefresh,
    threads: editTxrListItem.threads,
    videoBitrate: convertToMbps(editTxrListItem.videoBitrate),
    vbvBufsize: convertToMbps(editTxrListItem.vbvBufsize),
    vbvMaxrate: convertToMbps(editTxrListItem.vbvMaxrate),
});
