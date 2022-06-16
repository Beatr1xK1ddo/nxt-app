import {IIpbeListState, IIpbeListStateFilter, IIpbeStateAction} from "./types";
import {EDataProcessingStatus, EIpbeListViewMode, IIpbeListItem, IPagination} from "@nxt-ui/cp/types";

export const selectIpbeListViewMode = (state: IIpbeListState): EIpbeListViewMode => state.mode;
export const selectIpbeListPagination = (state: IIpbeListState): IPagination => state.filter.pagination;
export const selectIpbeListStatus = (state: IIpbeListState): EDataProcessingStatus => state.status;
export const selectIpbeListItems = (state: IIpbeListState): Array<IIpbeListItem> => state.data;
export const selectIpbeListFilter = (state: IIpbeListState): IIpbeListStateFilter => state.filter;
export const selectIpbeListAction = (state: IIpbeListState): IIpbeStateAction => state.action;
export const selectIpbeListSelected = (state: IIpbeListState): Array<number> => state.selected;
