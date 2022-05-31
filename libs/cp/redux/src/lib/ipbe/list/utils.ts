import {IApiIpbeListItem} from "@nxt-ui/cp/api";
import {EAppGeneralStatus, EAppGeneralStatusChange, IIpbeListItem} from "@nxt-ui/cp/types";

export const ipbeListItemMapper = (apiIpbeListItem: IApiIpbeListItem): IIpbeListItem => ({
    id: apiIpbeListItem.id,
    name: apiIpbeListItem.name,
    status: apiIpbeListItem.status as unknown as EAppGeneralStatus,
    statusChange: apiIpbeListItem.statusChange as unknown as EAppGeneralStatusChange,
    node: apiIpbeListItem.node,
    nodeText: apiIpbeListItem.nodeText,
    company: apiIpbeListItem.company,
    startedAtMs: apiIpbeListItem.startedAtMs,
    videoBitrate: apiIpbeListItem.videoBitrate,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations,
    ipbeAudioEncoders: apiIpbeListItem.ipbeAudioEncoders,
    sdiDevice: apiIpbeListItem.sdiDevice,
    inputFormat: apiIpbeListItem.inputFormat,
    monitoring: apiIpbeListItem.runMonitor,
});
