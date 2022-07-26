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
    ENodeType,
    EServerOnline,
} from "@nxt-ui/cp/types";

export interface ITxrListStateFilterByKeyActionPayload {
    key: keyof ITxrListStateFilter | string;
    value: null | string | number | EAppGeneralStatus;
}
export interface ITxrListStateFilter {
    name: string;
    nodeId: null | number;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    pagination: IPagination;
    urlSearchParams: string;
    appType: ETXRAppType | null;
    nodeType: ENodeType | null;
    serverOnline: EServerOnline | null;
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
