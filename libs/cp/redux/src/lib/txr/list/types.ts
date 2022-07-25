import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    ETxrChooseActions,
    EListViewMode,
    IDataProcessingError,
    ITxrListItem,
    IPagination,
    Optional,
    ETXRAppType,
} from "@nxt-ui/cp/types";

export interface ITxrListStateFilterByKeyActionPayload {
    key: keyof ITxrListStateFilter | string;
    value: null | string | number | EAppGeneralStatus;
}
//TODO Kate: refactor
export interface ITxrListStateFilter {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    pagination: IPagination;
    urlSearchParams: string;
    appType: ETXRAppType | null;
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
