import {CpRootState} from "./types";
import {COMMON_SLICE_NAME, commonSelectors as localCommonSelectors} from "./common";
import {PROCESSING_SLICE_NAME, processingSelectors as localProcessingSelectors} from "./processing";
import {IPBE_SLICE_NAME, ipbeListSelectors as localIpbeListSelectors} from "./ipbe";
import {NumericId} from "@nxt-ui/cp/types";

export const commonSelectors = {
    //nodes list selectors
    selectNode: (state: CpRootState, id: NumericId) => localCommonSelectors.selectNode(state[COMMON_SLICE_NAME], id),
    selectNodes: (state: CpRootState) => localCommonSelectors.selectNodes(state[COMMON_SLICE_NAME]),
    selectNodesIds: (state: CpRootState) => localCommonSelectors.selectNodesIds(state[COMMON_SLICE_NAME]),
    //companies list selectors
    selectCompanies: (state: CpRootState) => localCommonSelectors.selectCompanies(state[COMMON_SLICE_NAME]),
    selectCompany: (state: CpRootState, id: NumericId) => localCommonSelectors.selectCompany(state[COMMON_SLICE_NAME], id),
};

export const processingSelectors = {
    selectGeneralProcessingState: (state: CpRootState) => localProcessingSelectors.selectGeneralProcessingState(state[PROCESSING_SLICE_NAME]),
};

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: CpRootState) => localIpbeListSelectors.selectIpbeListFilter(state[IPBE_SLICE_NAME]),
    selectIpbeListPagination: (state: CpRootState) => localIpbeListSelectors.selectIpbeListPagination(state[IPBE_SLICE_NAME]),
    selectIpbeListViewMode: (state: CpRootState) => localIpbeListSelectors.selectIpbeListViewMode(state[IPBE_SLICE_NAME]),
    selectIpbeListItems: (state: CpRootState) => localIpbeListSelectors.selectIpbeListItems(state[IPBE_SLICE_NAME]),
    selectIpbeListStatus: (state: CpRootState) => localIpbeListSelectors.selectIpbeListStatus(state[IPBE_SLICE_NAME]),
};
