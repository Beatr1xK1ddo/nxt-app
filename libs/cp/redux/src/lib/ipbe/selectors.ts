import {IPBE_LIST_SLICE_NAME, listSelectors} from "./list";
import {IIpbeState} from "./types";
import {selectIpbeListStatus} from "./list/selectors";

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: IIpbeState) => listSelectors.selectIpbeListFilter(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListPagination: (state: IIpbeState) => listSelectors.selectIpbeListPagination(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListViewMode: (state: IIpbeState) => listSelectors.selectIpbeListViewMode(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListItems: (state: IIpbeState) => listSelectors.selectIpbeListItems(state[IPBE_LIST_SLICE_NAME]),
    selectIpbeListStatus: (state: IIpbeState) => listSelectors.selectIpbeListStatus(state[IPBE_LIST_SLICE_NAME]),
};
