import {IApiTxr} from "@nxt-ui/cp/api";
import {ITxrEditRTPMuxer} from "./types";

export const txrApiToRTPMuxerMapper = (txr: IApiTxr): ITxrEditRTPMuxer => ({
    audioPt: txr.audioPt,
    videoPt: txr.videoPt,
});

export const txrRTPMuxerToApiMapper = (txr: ITxrEditRTPMuxer) => ({
    audioPt: txr.audioPt,
    videoPt: txr.videoPt,
});
