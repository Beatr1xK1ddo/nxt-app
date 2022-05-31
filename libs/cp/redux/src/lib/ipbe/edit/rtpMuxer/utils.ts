import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditRTPMuxer} from "./types";

export const ipbeEditFormRTPMuxerMapper = (apiIpbeListItem: IApiIpbe): IIpbeEditRTPMuxer => ({
    audioPid: apiIpbeListItem.audioPid,
    videoPid: apiIpbeListItem.videoPid,
});
