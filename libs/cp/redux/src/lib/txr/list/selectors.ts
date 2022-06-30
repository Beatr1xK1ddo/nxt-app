import {ITxrListState, ITxrListStateFilter, ITxrStateAction} from "./types";
import {EDataProcessingStatus, EListViewMode, ITxrListItem, IPagination} from "@nxt-ui/cp/types";

export const selectTxrListViewMode = (state: ITxrListState): EListViewMode => state.mode;
export const selectTxrListPagination = (state: ITxrListState): IPagination => state.filter.pagination;
export const selectTxrListStatus = (state: ITxrListState): EDataProcessingStatus => state.status;
export const selectTxrListItems = (state: ITxrListState): Array<ITxrListItem> => state.data;
export const selectTxrListFilter = (state: ITxrListState): ITxrListStateFilter => state.filter;
export const selectTxrListAction = (state: ITxrListState): ITxrStateAction => state.action;
export const selectTxrListSelected = (state: ITxrListState): Array<number> => state.selected;
