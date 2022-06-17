import {CpRootState} from "./types";
import {COMMON_SLICE_NAME, commonSelectors as common} from "./common";
import {PROCESSING_SLICE_NAME, processingSelectors as processing} from "./processing";
import {
    IPBE_SLICE_NAME,
    ipbeListSelectors as localIpbeListSelectors,
    ipbeEditSelectors as localIpbeEditSelectors,
} from "./ipbe";
import {NumericId, StringId, Optional} from "@nxt-ui/cp/types";

export const commonSelectors = {
    //nodes list selectors
    nodes: {
        selectById: (state: CpRootState, id: Optional<NumericId>) =>
            id ? common.selectNodeById(state[COMMON_SLICE_NAME], id) : undefined,
        selectAll: (state: CpRootState) => common.selectNodesAll(state[COMMON_SLICE_NAME]),
        selectStatus: (state: CpRootState) => common.selectNodeStatus(state[COMMON_SLICE_NAME]),
        selectIds: (state: CpRootState) => common.selectNodesIds(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) =>
            common.selectNodesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
    //companies list selectors
    companies: {
        selectById: (state: CpRootState, id: Optional<NumericId>) =>
            id ? common.selectCompanyById(state[COMMON_SLICE_NAME], id) : undefined,
        selectAll: (state: CpRootState) => common.selectCompaniesAll(state[COMMON_SLICE_NAME]),
        selectStatus: (state: CpRootState) => common.selectCompanyStatus(state[COMMON_SLICE_NAME]),
        selectWithFilter: (state: CpRootState, filter?: string) =>
            common.selectCompaniesWithFilter(state[COMMON_SLICE_NAME], filter),
    },
    //notifications selectors
    notifications: {
        all: (state: CpRootState) => common.notifications.all(state[COMMON_SLICE_NAME]),
        byId: (state: CpRootState, id: StringId) => common.notifications.byId(state[COMMON_SLICE_NAME], id),
        visible: (state: CpRootState) => common.notifications.visible(state[COMMON_SLICE_NAME]),
    },
};

export const processingSelectors = {
    selectGeneralProcessingState: (state: CpRootState) =>
        processing.selectGeneralProcessingState(state[PROCESSING_SLICE_NAME]),
};

export const ipbeListSelectors = {
    selectIpbeListFilter: (state: CpRootState) => localIpbeListSelectors.selectIpbeListFilter(state[IPBE_SLICE_NAME]),
    selectIpbeListPagination: (state: CpRootState) =>
        localIpbeListSelectors.selectIpbeListPagination(state[IPBE_SLICE_NAME]),
    selectIpbeListViewMode: (state: CpRootState) =>
        localIpbeListSelectors.selectIpbeListViewMode(state[IPBE_SLICE_NAME]),
    selectIpbeListItems: (state: CpRootState) => localIpbeListSelectors.selectIpbeListItems(state[IPBE_SLICE_NAME]),
    selectIpbeListStatus: (state: CpRootState) => localIpbeListSelectors.selectIpbeListStatus(state[IPBE_SLICE_NAME]),
    selectIpbeListAction: (state: CpRootState) => localIpbeListSelectors.selectIpbeListAction(state[IPBE_SLICE_NAME]),
    selectIpbeListSelected: (state: CpRootState) =>
        localIpbeListSelectors.selectIpbeListSelected(state[IPBE_SLICE_NAME]),
};

export const ipbeEditSelectors = {
    selectStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditStatus(state[IPBE_SLICE_NAME]),
    selectVideoConnections: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoConnections(state[IPBE_SLICE_NAME]),
    selectValidStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditValidStatus(state[IPBE_SLICE_NAME]),
    selectBasicApplication: (state: CpRootState) =>
        localIpbeEditSelectors.selectBasicApplication(state[IPBE_SLICE_NAME]),
    selectEncoderVersions: (state: CpRootState) => localIpbeEditSelectors.selectEncoderVersions(state[IPBE_SLICE_NAME]),

    main: {
        id: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainId(state[IPBE_SLICE_NAME]),
        startedAtMs: (state: CpRootState) =>
            localIpbeEditSelectors.selectIpbeEditMainStartedAtMs(state[IPBE_SLICE_NAME]),
        applicationType: (state: CpRootState) =>
            localIpbeEditSelectors.selectIpbeEditMainApplication(state[IPBE_SLICE_NAME]),
        outputType: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainOutputType(state[IPBE_SLICE_NAME]),
        values: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainErrors(state[IPBE_SLICE_NAME]),
        name: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainName(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainError(state[IPBE_SLICE_NAME]),
        node: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditNode(state[IPBE_SLICE_NAME]),
        status: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainStatus(state[IPBE_SLICE_NAME]),
    },
    audioEncoder: {
        dirty: (state: CpRootState, index: number) =>
            localIpbeEditSelectors.selectIpbeEditAudioEncoderDirty(state[IPBE_SLICE_NAME], index),
        values: (state: CpRootState) =>
            localIpbeEditSelectors.selectIpbeEditAudioEncodersValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) =>
            localIpbeEditSelectors.selectIpbeEditAudioEncodersErrors(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditAudioEncoderError(state[IPBE_SLICE_NAME]),
    },
    mpegTsMuxer: {
        values: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMpegTsMuxerValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMpegTsMuxerErrors(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMpegTsMuxerError(state[IPBE_SLICE_NAME]),
    },
    videoEncoder: {
        values: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditVideoEncoderValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditVideoEncoderErrors(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditVideoEncoderError(state[IPBE_SLICE_NAME]),
    },
    rtpMuxer: {
        values: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditRtpMuxerValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditRtpMuxerErrors(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditRtpMuxerError(state[IPBE_SLICE_NAME]),
    },
    advanced: {
        values: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditAdvancedValues(state[IPBE_SLICE_NAME]),
        errors: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditAdvancedErrors(state[IPBE_SLICE_NAME]),
        error: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditAdvancedError(state[IPBE_SLICE_NAME]),
    },
};
