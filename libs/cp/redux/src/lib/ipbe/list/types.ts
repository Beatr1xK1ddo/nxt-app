import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    EChooseActions,
    EListViewMode,
    EIpbeTimeCode,
    IDataProcessingError,
    IIpbeListItem,
    IPagination,
    Optional,
} from "@nxt-ui/cp/types";

export interface IIpbeListStateFilterByKeyActionPayload {
    key: keyof IIpbeListStateFilter | string;
    value: null | string | number | EAppGeneralStatus | EIpbeTimeCode;
}

export interface IIpbeListStateFilter {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    timeCode: null | EIpbeTimeCode;
    pagination: IPagination;
    urlSearchParams: string;
}

export type IIpbeStateAction = Optional<keyof typeof EChooseActions>;

export interface IIpbeListState {
    status: EDataProcessingStatus;
    error: IDataProcessingError;
    mode: EListViewMode;
    filter: IIpbeListStateFilter;
    data: Array<IIpbeListItem>;
    action: IIpbeStateAction;
    selected: Array<number>;
}
