import {IApiTxr} from "@nxt-ui/cp/api";
import {ETxrMuxer} from "@nxt-ui/cp/types";
import {EMpegTsMuxerFormError, ITxrEditMpegTsMuxer, ITxrEditMpegTsMuxerErrors} from "./types";

export const mpegTsMuxerErrorState: ITxrEditMpegTsMuxerErrors = Object.values(EMpegTsMuxerFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);

export const txrApiToMpegTsMuxerMapper = (apiTxrListItem: IApiTxr): ITxrEditMpegTsMuxer => ({
    muxer: apiTxrListItem.muxer as unknown as ETxrMuxer,
    muxrate: typeof apiTxrListItem.muxrate === "number" ? apiTxrListItem.muxrate.toString() : null,
    serviceName: apiTxrListItem.serviceName,
    serviceProvider: apiTxrListItem.serviceProvider,
    programNumber: apiTxrListItem.programNumber,
    videoPid: apiTxrListItem.videoPid,
    audioPid: apiTxrListItem.audioPid,
    pmtPid: apiTxrListItem.pmtPid,
    pmtPeriod: apiTxrListItem.pmtPeriod,
    pcrPid: apiTxrListItem.pcrPid,
    pcrPeriod: apiTxrListItem.pcrPeriod,
    tsId: apiTxrListItem.tsId,
    addScte: apiTxrListItem.addScte,
});

export const txrMpegTsMuxerToApiMapper = (txrListItem: ITxrEditMpegTsMuxer) => ({
    muxer: txrListItem.muxer as unknown as ETxrMuxer,
    muxrate: txrListItem.muxrate ? parseInt(txrListItem.muxrate) : null,
    serviceName: txrListItem.serviceName,
    serviceProvider: txrListItem.serviceProvider,
    programNumber: txrListItem.programNumber,
    videoPid: txrListItem.videoPid,
    audioPid: txrListItem.audioPid,
    pmtPid: txrListItem.pmtPid,
    pmtPeriod: txrListItem.pmtPeriod,
    pcrPid: txrListItem.pcrPid,
    pcrPeriod: txrListItem.pcrPeriod,
    tsId: txrListItem.tsId,
    addScte: txrListItem.addScte,
});
