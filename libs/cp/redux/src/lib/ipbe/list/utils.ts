import {IApiIpbeListItem} from "@nxt-ui/cp/api";
import {IIpbeListItem} from "@nxt-ui/cp/types";

export const ipbeListItemMapper = (apiIpbeListItem: IApiIpbeListItem): IIpbeListItem => ({
    id: apiIpbeListItem.id,
    name: apiIpbeListItem.name,
    status: apiIpbeListItem.status,
    statusChange: apiIpbeListItem.statusChange,
    node: apiIpbeListItem.node,
    nodeText: apiIpbeListItem.nodeText,
    company: apiIpbeListItem.company,
    startedAtMs: apiIpbeListItem.startedAtMs,
    videoBitrate: apiIpbeListItem.videoBitrate,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations,
    ipbeAudioEncoders: apiIpbeListItem.ipbeAudioEncoders,
    cardIdx: apiIpbeListItem.cardIdx,
    inputFormat: apiIpbeListItem.inputFormat,
});
