import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    EIpbeListViewMode,
    IDataProcessingError,
    IPagination,
} from "@nxt-ui/cp/types";
import {ETimeCodeType, IIpbeListApiItem} from "@nxt-ui/cp/api";

export interface IIpbeListStateFilterbyKeyActionPayload {
    key: keyof IIpbeListStateFilter | string;
    value: null | string | number | EAppGeneralStatus | ETimeCodeType;
}

export interface IIpbeListStateFilter {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    timeCode: null | ETimeCodeType;
    pagination: IPagination;
    urlSearchParams: string;
}

export interface IIpbeListState {
    status: EDataProcessingStatus;
    error: IDataProcessingError;
    mode: EIpbeListViewMode;
    filter: IIpbeListStateFilter;
    data: Array<IIpbeListApiItem>;
}
