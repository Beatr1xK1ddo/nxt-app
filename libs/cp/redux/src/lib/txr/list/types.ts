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
    ENodeType,
    ETXRAppType,
    EServerOnline,
} from "@nxt-ui/cp/types";

export interface ITxrListStateFilterByKeyActionPayload {
    key: keyof ITxrListStateFilter | string;
    value: null | string | number | EAppGeneralStatus | ETxrTimeCode;
}

export interface ITxrListStateFilter {
    name: string;
    nodeId: null | number;
    nodeType: ENodeType | null;
    companyId: null | number;
    status: null | EAppGeneralStatus;
    timeCode: null | ETxrTimeCode;
    pagination: IPagination;
    urlSearchParams: string;
    appType: ETXRAppType | null;
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

export type IApllyAction = {
    action: Optional<keyof typeof ETxrChooseActions>;
    selected: Array<number>;
};
