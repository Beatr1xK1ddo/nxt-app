import {CpRootState} from "./types";
import {COMMON_SLICE_NAME, commonSelectors as localCommonSelectors} from "./common";
import {PROCESSING_SLICE_NAME, processingSelectors as localProcessingSelectors} from "./processing";
import {IPBE_SLICE_NAME, ipbeListSelectors as localIpbeListSelectors} from "./ipbe";
import {NumericId} from "@nxt-ui/cp/types";

export const commonSelectors = {
    //nodes list selectors
    nodes: {
        selectById: (state: CpRootState, id?: NumericId) => id ? localCommonSelectors.selectNodeById(state[COMMON_SLICE_NAME], id) : null,
        selectAll: (state: CpRootState) => localCommonSelectors.selectNodesAll(state[COMMON_SLICE_NAME]),
        selectIds: (state: CpRootState) => localCommonSelectors.selectNodesIds(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) => localCommonSelectors.selectNodesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
    //companies list selectors
    companies: {
        selectById: (state: CpRootState, id?: NumericId) => id ? localCommonSelectors.selectCompanyById(state[COMMON_SLICE_NAME], id) : null,
        selectAll: (state: CpRootState) => localCommonSelectors.selectCompaniesAll(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) => localCommonSelectors.selectCompaniesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
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
