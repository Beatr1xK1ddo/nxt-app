import {IApiIpbe} from "@nxt-ui/cp/api";
import {EIpbeMuxer} from "@nxt-ui/cp/types";
import {EMpegTsMuxerFormError, IIpbeEditMpegTsMuxer, IIpbeEditMpegTsMuxerErrors} from "./types";

export const mpegTsMuxerErrorState: IIpbeEditMpegTsMuxerErrors = Object.values(EMpegTsMuxerFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const ipbeEditFormMpegTsMuxerMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditMpegTsMuxer => ({
    muxer: apiIpbeListItem.muxer as unknown as EIpbeMuxer,
    muxrate: typeof apiIpbeListItem.muxrate === "number" ? apiIpbeListItem.muxrate.toString() : null,
    serviceName: apiIpbeListItem.serviceName,
    serviceProvider: apiIpbeListItem.serviceProvider,
    programNumber: apiIpbeListItem.programNumber,
    videoPid: apiIpbeListItem.videoPid,
    audioPid: apiIpbeListItem.audioPid,
    pmtPid: apiIpbeListItem.pmtPid,
    pmtPeriod: apiIpbeListItem.pmtPeriod,
    pcrPid: apiIpbeListItem.pcrPid,
    pcrPeriod: apiIpbeListItem.pcrPeriod,
    tsId: apiIpbeListItem.tsId,
    addScte: apiIpbeListItem.addScte,
});
