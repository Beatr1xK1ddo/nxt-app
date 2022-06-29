import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    ETxrChooseActions,
    EListViewMode,
    ETxrTimeCode,
    IDataProcessingError,
    ITxrListItem,
    IPagination,
    Optional,
} from "@nxt-ui/cp/types";

export interface ITxrListStateFilterByKeyActionPayload {
    key: keyof ITxrListStateFilter | string;
    value: null | string | number | EAppGeneralStatus | ETxrTimeCode;
}

export interface ITxrListStateFilter {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    timeCode: null | ETxrTimeCode;
    pagination: IPagination;
    urlSearchParams: string;
}

export type ITxrStateAction = Optional<keyof typeof ETxrChooseActions>;

export interface ITxrListState {
    status: EDataProcessingStatus;
    error: IDataProcessingError;
    mode: EListViewMode;
    filter: ITxrListStateFilter;
    data: Array<ITxrListItem>;
    action: ITxrStateAction;
    selected: Array<number>;
}

export type IApllyAction = {
    action: Optional<keyof typeof ETxrChooseActions>;
    selected: Array<number>;
};
