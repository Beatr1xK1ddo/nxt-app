import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditRTPMuxer} from "./types";

export const ipbeEditRTPMuxerMapper = (ipbe: IApiIpbe): IIpbeEditRTPMuxer => ({
    audioPt: ipbe.audioPt,
    videoPt: ipbe.videoPt,
});
