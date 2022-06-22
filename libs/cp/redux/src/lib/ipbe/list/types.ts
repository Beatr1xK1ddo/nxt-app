import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    EIpbeChooseActions,
    EIpbeListViewMode,
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

export type IIpbeStateAction = Optional<keyof typeof EIpbeChooseActions>;

export interface IIpbeListState {
    status: EDataProcessingStatus;
    error: IDataProcessingError;
    mode: EIpbeListViewMode;
    filter: IIpbeListStateFilter;
    data: Array<IIpbeListItem>;
    action: IIpbeStateAction;
    selected: Array<number>;
}

export type IApllyAction = {
    action: Optional<keyof typeof EIpbeChooseActions>;
    selected: Array<number>;
};
