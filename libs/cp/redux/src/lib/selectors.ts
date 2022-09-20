import {CpRootState} from "./types";
import {COMMON_SLICE_NAME, commonSelectors as common} from "./common";
import {PROCESSING_SLICE_NAME, processingSelectors as processing} from "./processing";
import {
    IPBE_SLICE_NAME,
    ipbeListSelectors as localIpbeListSelectors,
    ipbeEditSelectors as localIpbeEditSelectors,
} from "./ipbe";
import {
    TXR_SLICE_NAME,
    txrListSelectors as localTxrListSelectors,
    txrEditSelectors as localTxrEditSelectors,
} from "./txr";
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
    proxyServer: {
        list: (state: CpRootState) => common.selectProxyServers(state[COMMON_SLICE_NAME]),
        entities: (state: CpRootState) => common.selectProxyServersEntities(state[COMMON_SLICE_NAME]),
        selectStatus: (state: CpRootState) => common.selectProxyServersStatus(state[COMMON_SLICE_NAME]),
        selectById: (state: CpRootState, id: Optional<NumericId>) =>
            id ? common.selectProxyServerItemById(state[COMMON_SLICE_NAME], id) : undefined,
    },
    navigation: {
        ipbeNavTabs: (state: CpRootState) => common.ipbeNavTabs(state[COMMON_SLICE_NAME]),
        txrNavTabs: (state: CpRootState) => common.txrNavTabs(state[COMMON_SLICE_NAME]),
        ipbeName: (state: CpRootState) => common.ipbeName(state[COMMON_SLICE_NAME]),
        txrName: (state: CpRootState) => common.txrName(state[COMMON_SLICE_NAME]),
        ipbeActive: (state: CpRootState) => common.ipbeActive(state[COMMON_SLICE_NAME]),
        txrActive: (state: CpRootState) => common.txrActive(state[COMMON_SLICE_NAME]),
    },
    apps: {
        selectedApps: (state: CpRootState) => common.selectSelectedApps(state[COMMON_SLICE_NAME]),
    },
};

export const processingSelectors = {
    selectGeneralProcessingState: (state: CpRootState) =>
        processing.selectGeneralProcessingState(state[PROCESSING_SLICE_NAME]),
    selectBackgroundProcessingState: (state: CpRootState) =>
        processing.selectBackgroundProcessingState(state[PROCESSING_SLICE_NAME]),
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
};

export const ipbeEditSelectors = {
    selectState: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditState(state[IPBE_SLICE_NAME]),
    selectStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditStatus(state[IPBE_SLICE_NAME]),
    selectVideoConnections: (state: CpRootState) =>
        localIpbeEditSelectors.selectIpbeEditVideoConnections(state[IPBE_SLICE_NAME]),
    selectValidStatus: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditValidStatus(state[IPBE_SLICE_NAME]),
    selectBasicApplication: (state: CpRootState) =>
        localIpbeEditSelectors.selectBasicApplication(state[IPBE_SLICE_NAME]),
    selectEncoderVersions: (state: CpRootState) => localIpbeEditSelectors.selectEncoderVersions(state[IPBE_SLICE_NAME]),

    main: {
        id: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditMainId(state[IPBE_SLICE_NAME]),
        encoderVersion: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEncoderVersion(state[IPBE_SLICE_NAME]),
        destinations: (state: CpRootState) => localIpbeEditSelectors.selectIpbeDestinations(state[IPBE_SLICE_NAME]),
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
        imageUrl: (state: CpRootState) => localIpbeEditSelectors.selectIpbeEditAdvancedImageUrl(state[IPBE_SLICE_NAME]),
    },
};

// TODO make new file
export const txrListSelectors = {
    selectTxrListFilter: (state: CpRootState) => localTxrListSelectors.selectTxrListFilter(state[TXR_SLICE_NAME]),
    selectTxrListPagination: (state: CpRootState) =>
        localTxrListSelectors.selectTxrListPagination(state[TXR_SLICE_NAME]),
    selectTxrListViewMode: (state: CpRootState) => localTxrListSelectors.selectTxrListViewMode(state[TXR_SLICE_NAME]),
    selectTxrListItems: (state: CpRootState) => localTxrListSelectors.selectTxrListItems(state[TXR_SLICE_NAME]),
    selectTxrListStatus: (state: CpRootState) => localTxrListSelectors.selectTxrListStatus(state[TXR_SLICE_NAME]),
    selectTxrListAction: (state: CpRootState) => localTxrListSelectors.selectTxrListAction(state[TXR_SLICE_NAME]),
};

export const txrEditSelectors = {
    selectState: (state: CpRootState) => localTxrEditSelectors.selectTxrEditState(state[TXR_SLICE_NAME]),
    selectStatus: (state: CpRootState) => localTxrEditSelectors.selectTxrEditStatus(state[TXR_SLICE_NAME]),
    selectValidStatus: (state: CpRootState) => localTxrEditSelectors.selectTxrEditValidStatus(state[TXR_SLICE_NAME]),
    templates: (state: CpRootState) => localTxrEditSelectors.selectTxrTemplates(state[TXR_SLICE_NAME]),

    main: {
        id: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainId(state[TXR_SLICE_NAME]),
        startedAtMs: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainStartedAtMs(state[TXR_SLICE_NAME]),
        values: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainValues(state[TXR_SLICE_NAME]),
        errors: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainErrors(state[TXR_SLICE_NAME]),
        name: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainName(state[TXR_SLICE_NAME]),
        error: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainError(state[TXR_SLICE_NAME]),
        status: (state: CpRootState) => localTxrEditSelectors.selectTxrEditMainStatus(state[TXR_SLICE_NAME]),
        company: (state: CpRootState) => localTxrEditSelectors.selectTxrEditCompany(state[TXR_SLICE_NAME]),
        appType: (state: CpRootState) => localTxrEditSelectors.selectTxrAppType(state[TXR_SLICE_NAME]),
        doubleRetransmission: (state: CpRootState) =>
            localTxrEditSelectors.selectTxrdoubleRetransmission(state[TXR_SLICE_NAME]),
        openPortAt: (state: CpRootState) => localTxrEditSelectors.selectTxrOpenPortAt(state[TXR_SLICE_NAME]),
        txrNodes: (state: CpRootState) => localTxrEditSelectors.selectTxrNodes(state[TXR_SLICE_NAME]),
        txrSource: (state: CpRootState) => localTxrEditSelectors.selectTxrSource(state[TXR_SLICE_NAME]),
        txrDestination: (state: CpRootState) => localTxrEditSelectors.selectTxrDestination(state[TXR_SLICE_NAME]),
        txrUseInterface: (state: CpRootState) => localTxrEditSelectors.selectTxrUseInterface(state[TXR_SLICE_NAME]),
        ttl: (state: CpRootState) => localTxrEditSelectors.selectTxrTTL(state[TXR_SLICE_NAME]),
        buffer: (state: CpRootState) => localTxrEditSelectors.selectTxrBuffer(state[TXR_SLICE_NAME]),
    },
};
