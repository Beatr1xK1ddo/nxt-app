import {CpRootState} from "./types";
import {IPBE_SLICE_NAME, ipbeListSelectors as localIpbeListSelectors} from "./ipbe";
import {PROCESSING_SLICE_NAME, processingSelectors as localProcessingSelectors} from "./processing";
import {selectIpbeListStatus} from "./ipbe/list/selectors";

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: CpRootState) => localIpbeListSelectors.selectIpbeListFilter(state[IPBE_SLICE_NAME]),
    selectIpbeListPagination: (state: CpRootState) => localIpbeListSelectors.selectIpbeListPagination(state[IPBE_SLICE_NAME]),
    selectIpbeListViewMode: (state: CpRootState) => localIpbeListSelectors.selectIpbeListViewMode(state[IPBE_SLICE_NAME]),
    selectIpbeListItems: (state: CpRootState) => localIpbeListSelectors.selectIpbeListItems(state[IPBE_SLICE_NAME]),
    selectIpbeListStatus: (state: CpRootState) => localIpbeListSelectors.selectIpbeListStatus(state[IPBE_SLICE_NAME]),
};

export const processingSelectors = {
    selectGeneralProcessingState: (state: CpRootState) => localProcessingSelectors.selectGeneralProcessingState(state[PROCESSING_SLICE_NAME]),
};
