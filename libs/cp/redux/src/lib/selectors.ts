import {CpRootState} from "./types";
import {COMMON_SLICE_NAME, commonSelectors as localCommonSelectors} from "./common";
import {PROCESSING_SLICE_NAME, processingSelectors as localProcessingSelectors} from "./processing";
import {
    IPBE_SLICE_NAME,
    ipbeListSelectors as localIpbeListSelectors,
    ipbeEditSelectors as localIpbeEditSelectors,
} from "./ipbe";
import {NumericId} from "@nxt-ui/cp/types";

export const commonSelectors = {
    //nodes list selectors
    nodes: {
        selectById: (state: CpRootState, id?: NumericId) =>
            id ? localCommonSelectors.selectNodeById(state[COMMON_SLICE_NAME], id) : undefined,
        selectAll: (state: CpRootState) => localCommonSelectors.selectNodesAll(state[COMMON_SLICE_NAME]),
        selectStatus: (state: CpRootState) => localCommonSelectors.selectNodeStatus(state[COMMON_SLICE_NAME]),
        selectIds: (state: CpRootState) => localCommonSelectors.selectNodesIds(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) =>
            localCommonSelectors.selectNodesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
    //companies list selectors
    companies: {
        selectById: (state: CpRootState, id?: NumericId) =>
            id ? localCommonSelectors.selectCompanyById(state[COMMON_SLICE_NAME], id) : undefined,
        selectAll: (state: CpRootState) => localCommonSelectors.selectCompaniesAll(state[COMMON_SLICE_NAME]),
        selectStatus: (state: CpRootState) => localCommonSelectors.selectCompanyStatus(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) =>
            localCommonSelectors.selectCompaniesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
};

export const processingSelectors = {
    selectGeneralProcessingState: (state: CpRootState) =>
        localProcessingSelectors.selectGeneralProcessingState(state[PROCESSING_SLICE_NAME]),
};

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: CpRootState) => localIpbeListSelectors.selectIpbeListFilter(state[IPBE_SLICE_NAME]),
    selectIpbeListPagination: (state: CpRootState) =>
        localIpbeListSelectors.selectIpbeListPagination(state[IPBE_SLICE_NAME]),
    selectIpbeListViewMode: (state: CpRootState) =>
        localIpbeListSelectors.selectIpbeListViewMode(state[IPBE_SLICE_NAME]),
    selectIpbeListItems: (state: CpRootState) => localIpbeListSelectors.selectIpbeListItems(state[IPBE_SLICE_NAME]),
    selectIpbeListStatus: (state: CpRootState) => localIpbeListSelectors.selectIpbeListStatus(state[IPBE_SLICE_NAME]),
};

export const ipbeEditSelectors = {
    selectStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditStatus(state[IPBE_SLICE_NAME]),
    selectVideoConnections: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoConnections(state[IPBE_SLICE_NAME]),
    selectMainId: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainId(state[IPBE_SLICE_NAME]),
    selectValidStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditValidStatus(state[IPBE_SLICE_NAME]),
    selectAdvancedValues: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAdvancedValues(state[IPBE_SLICE_NAME]),
    selectNode: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditNode(state[IPBE_SLICE_NAME]),
    selectAdvancedApplicationType: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditMainApplication(state[IPBE_SLICE_NAME]),
    selectMainOutputType: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditMainOutputType(state[IPBE_SLICE_NAME]),
    selectAdvancedErrors: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAdvancedErrors(state[IPBE_SLICE_NAME]),
    selectAudioEncodersValues: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAudioEncodersValues(state[IPBE_SLICE_NAME]),
    selectAudioEncodersErrors: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAudioEncodersErrors(state[IPBE_SLICE_NAME]),
    selectMainValues: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainValues(state[IPBE_SLICE_NAME]),
    selectMainErrors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainErrors(state[IPBE_SLICE_NAME]),
    selectMpegTsMuxerValues: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_SLICE_NAME]),
    selectMpegTsMuxerErrors: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditMpegTsMuxerErrors(state[IPBE_SLICE_NAME]),
    selectRtpMuxerValues: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_SLICE_NAME]),
    selectRtpMuxerErrors: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditRtpMuxerErrors(state[IPBE_SLICE_NAME]),
    selectVideoEncoderValues: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_SLICE_NAME]),
    selectVideoEncoderErrors: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoEncoderErrors(state[IPBE_SLICE_NAME]),
    selectEncoderVersions: (state: CpRootState) => localIpbeEditSelectors.selectEncoderVersions(state[IPBE_SLICE_NAME]),
    selectName: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainName(state[IPBE_SLICE_NAME]),
    selectMainError: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainError(state[IPBE_SLICE_NAME]),
    selectVideoEncoderError: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoEncoderError(state[IPBE_SLICE_NAME]),
    selectAudioEncoderError: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAudioEncoderError(state[IPBE_SLICE_NAME]),
    selectMpegTsMuxerError: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditMpegTsMuxerError(state[IPBE_SLICE_NAME]),
    selectRtpMuxerError: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditRtpMuxerError(state[IPBE_SLICE_NAME]),
    selectAdvancedError: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditAdvancedError(state[IPBE_SLICE_NAME]),
};
