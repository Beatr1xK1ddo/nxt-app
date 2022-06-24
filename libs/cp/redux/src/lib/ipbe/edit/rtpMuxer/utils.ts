import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditRTPMuxer} from "./types";

export const ipbeApiToRTPMuxerMapper = (ipbe: IApiIpbe): IIpbeEditRTPMuxer => ({
    audioPt: ipbe.audioPt,
    videoPt: ipbe.videoPt,
});

export const ipbeRTPMuxerToApiMapper = (ipbe: IIpbeEditRTPMuxer) => ({
    audioPt: ipbe.audioPt,
    videoPt: ipbe.videoPt,
});
