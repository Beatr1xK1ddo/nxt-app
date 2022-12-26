import {IApiIpbeListItem} from "@nxt-ui/cp/api";
import {
    EAppGeneralStatus,
    EAppGeneralStatusChange,
    EIpbeTimeCode,
    EItemsPerPage,
    IIpbeListItem,
} from "@nxt-ui/cp/types";
import {
    IPBE_FILTER_COMPANY_ID_KEY,
    IPBE_FILTER_ITEMS_PER_PAGE_KEY,
    IPBE_FILTER_NAME_KEY,
    IPBE_FILTER_NODE_ID_KEY,
    IPBE_FILTER_PAGE_KEY,
    IPBE_FILTER_STATUS_KEY,
    IPBE_FILTER_TIME_CODE_KEY,
} from "./slice";

export const ipbeListItemMapper = (apiIpbeListItem: IApiIpbeListItem): IIpbeListItem => ({
    id: apiIpbeListItem.id,
    name: apiIpbeListItem.name,
    status: apiIpbeListItem.status as unknown as EAppGeneralStatus,
    statusChange: apiIpbeListItem.statusChange as unknown as EAppGeneralStatusChange,
    nodeId: apiIpbeListItem.node,
    nodeName: apiIpbeListItem.nodeText,
    company: apiIpbeListItem.company,
    startedAtMs: apiIpbeListItem.startedAtMs,
    videoBitrate: apiIpbeListItem.videoBitrate,
    ipbeDestinations: apiIpbeListItem.ipbeDestinations,
    ipbeAudioEncoders: apiIpbeListItem.ipbeAudioEncoders,
    sdiDevice: apiIpbeListItem.sdiDevice,
    inputFormat: apiIpbeListItem.inputFormat,
    monitoring: apiIpbeListItem.runMonitor,
    isEndpoint: apiIpbeListItem.isEndpoint,
    type: apiIpbeListItem._appType,
});

export const getSearchParamsFields = (searchParams: URLSearchParams) => {
    const name = searchParams.get(IPBE_FILTER_NAME_KEY);
    const nodeId = searchParams.get(IPBE_FILTER_NODE_ID_KEY);
    const companyId = searchParams.get(IPBE_FILTER_COMPANY_ID_KEY);
    const status = searchParams.get(IPBE_FILTER_STATUS_KEY) as EAppGeneralStatus;
    const timeCode = searchParams.get(IPBE_FILTER_TIME_CODE_KEY) as EIpbeTimeCode;
    const page = searchParams.get(IPBE_FILTER_PAGE_KEY);
    const itemsPerPageFromState = searchParams.get(IPBE_FILTER_ITEMS_PER_PAGE_KEY);
    const itemsPerPage = (
        itemsPerPageFromState && (Object.values(EItemsPerPage) as Array<string>).includes(itemsPerPageFromState)
            ? itemsPerPageFromState
            : EItemsPerPage.twentyFour
    ) as EItemsPerPage;
    const result = {
        name,
        nodeId,
        companyId,
        status,
        timeCode,
        page,
        itemsPerPage,
    };
    return result;
};
