import {IApiIpbe} from "@nxt-ui/cp/api";
import {EIpbeMuxer} from "@nxt-ui/cp/types";
import {EMpegTsMuxerFormError, IIpbeEditMpegTsMuxer, IIpbeEditMpegTsMuxerErrorsState} from "./types";

export const mpegTsMuxerErrorState: IIpbeEditMpegTsMuxerErrorsState = Object.values(EMpegTsMuxerFormError).reduce(
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
    muxrate: apiIpbeListItem.muxrate,
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
    ipbeAudioEncoders: apiIpbeListItem.ipbeAudioEncoders,
});
