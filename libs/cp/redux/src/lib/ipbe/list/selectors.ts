import {IIpbeListState, IIpbeListStateFilter, IIpbeStateAction} from "./types";
import {EDataProcessingStatus, EListViewMode, IIpbeListItem, IPagination} from "@nxt-ui/cp/types";

export const selectIpbeListViewMode = (state: IIpbeListState): EListViewMode => state.mode;
export const selectIpbeListPagination = (state: IIpbeListState): IPagination => state.filter.pagination;
export const selectIpbeListStatus = (state: IIpbeListState): EDataProcessingStatus => state.status;
export const selectIpbeListItems = (state: IIpbeListState): Array<IIpbeListItem> => state.data;
export const selectIpbeListFilter = (state: IIpbeListState): IIpbeListStateFilter => state.filter;
export const selectIpbeListAction = (state: IIpbeListState): IIpbeStateAction => state.action;
