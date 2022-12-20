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
import {NOTIFICATIONS_SLICE_NAME, userNotificationSelectors as userNotificationSelectorsLocal} from "./notifications";
export const commonSelectors = {
    //user
    user: {
        user: (state: CpRootState) => common.selectUserSelector(state[COMMON_SLICE_NAME]),
        status: (state: CpRootState) => common.selectUserStatusSelector(state[COMMON_SLICE_NAME]),
        email: (state: CpRootState) => common.emailSelector(state[COMMON_SLICE_NAME]),
    },
    //base app
    baseApp: {
        selectTabVisible: (state: CpRootState) => common.selectTabVisible(state[COMMON_SLICE_NAME]),
    },
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
        applications: {
            root: (state: CpRootState) => common.navigation.applicationRoot(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.applicationActive(state[COMMON_SLICE_NAME]),
            ipbe: (state: CpRootState) => common.navigation.applicationIpbe(state[COMMON_SLICE_NAME]),
            txr: (state: CpRootState) => common.navigation.applicationTxr(state[COMMON_SLICE_NAME]),
            channel: (state: CpRootState) => common.navigation.applicationChannel(state[COMMON_SLICE_NAME]),
            srt: (state: CpRootState) => common.navigation.applicationSrt(state[COMMON_SLICE_NAME]),
            tsForward: (state: CpRootState) => common.navigation.applicationTsForward(state[COMMON_SLICE_NAME]),
            spts: (state: CpRootState) => common.navigation.applicationSpts(state[COMMON_SLICE_NAME]),
            qFrame: (state: CpRootState) => common.navigation.applicationQFrame(state[COMMON_SLICE_NAME]),
            mpts: (state: CpRootState) => common.navigation.applicationMpts(state[COMMON_SLICE_NAME]),
            failover: (state: CpRootState) => common.navigation.applicationFailover(state[COMMON_SLICE_NAME]),
            supervisor: (state: CpRootState) => common.navigation.applicationSupervisor(state[COMMON_SLICE_NAME]),
            teranex: (state: CpRootState) => common.navigation.applicationTeranex(state[COMMON_SLICE_NAME]),
            decryption: (state: CpRootState) => common.navigation.applicationDecryption(state[COMMON_SLICE_NAME]),
            encryption: (state: CpRootState) => common.navigation.applicationEncryption(state[COMMON_SLICE_NAME]),
            filePlayer: (state: CpRootState) => common.navigation.applicationFilePlayer(state[COMMON_SLICE_NAME]),
            hyperDeck: (state: CpRootState) => common.navigation.applicationHyperDeck(state[COMMON_SLICE_NAME]),
            hlsAnalyzer: (state: CpRootState) => common.navigation.applicationHlsAnalyzer(state[COMMON_SLICE_NAME]),
            nxtLitePlayer: (state: CpRootState) => common.navigation.applicationNxtLitePlayer(state[COMMON_SLICE_NAME]),
            multiscreens: (state: CpRootState) => common.navigation.applicationMultiscreens(state[COMMON_SLICE_NAME]),
            timeshifting: (state: CpRootState) => common.navigation.applicationTimeshifting(state[COMMON_SLICE_NAME]),
            slateGenerator: (state: CpRootState) =>
                common.navigation.applicationSlateGenerator(state[COMMON_SLICE_NAME]),
            transcoder: (state: CpRootState) => common.navigation.applicationTranscoder(state[COMMON_SLICE_NAME]),
            standardsConversion: (state: CpRootState) =>
                common.navigation.applicationStandardsConversion(state[COMMON_SLICE_NAME]),
            transcoder2: (state: CpRootState) => common.navigation.applicationTranscoder2(state[COMMON_SLICE_NAME]),
        },
        logs: {
            logs: (state: CpRootState) => common.navigation.logs(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.logsActive(state[COMMON_SLICE_NAME]),
        },
        monitoring: {
            root: (state: CpRootState) => common.navigation.monitoringRoot(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.monitoringActive(state[COMMON_SLICE_NAME]),
            ipMonitoring: (state: CpRootState) => common.navigation.monitoringIpMonitoring(state[COMMON_SLICE_NAME]),
            nextomonQa: (state: CpRootState) => common.navigation.monitoringNextomonQa(state[COMMON_SLICE_NAME]),
        },
        node: {
            node: (state: CpRootState) => common.navigation.node(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.nodeActive(state[COMMON_SLICE_NAME]),
        },
        playout: {
            root: (state: CpRootState) => common.navigation.playoutRoot(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.playoutActive(state[COMMON_SLICE_NAME]),
            playout: (state: CpRootState) => common.navigation.playoutPlayout(state[COMMON_SLICE_NAME]),
            playout2: (state: CpRootState) => common.navigation.playoutPlayout2(state[COMMON_SLICE_NAME]),
            ingest: (state: CpRootState) => common.navigation.playoutIngest(state[COMMON_SLICE_NAME]),
            mam: (state: CpRootState) => common.navigation.playoutMam(state[COMMON_SLICE_NAME]),
            fastSync: (state: CpRootState) => common.navigation.playoutFastSync(state[COMMON_SLICE_NAME]),
            adReplacer: (state: CpRootState) => common.navigation.playoutAdReplacer(state[COMMON_SLICE_NAME]),
        },
        projects: {
            root: (state: CpRootState) => common.navigation.projectsRoot(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.projectsActive(state[COMMON_SLICE_NAME]),
            projects: (state: CpRootState) => common.navigation.projectsProjects(state[COMMON_SLICE_NAME]),
            webPlayer: (state: CpRootState) => common.navigation.projectsWebPlayer(state[COMMON_SLICE_NAME]),
            ap: (state: CpRootState) => common.navigation.projectsAp(state[COMMON_SLICE_NAME]),
            apTests: (state: CpRootState) => common.navigation.projectsApTests(state[COMMON_SLICE_NAME]),
            raspberry: (state: CpRootState) => common.navigation.projectsRaspberry(state[COMMON_SLICE_NAME]),
            mags: (state: CpRootState) => common.navigation.projectsMags(state[COMMON_SLICE_NAME]),
            media: (state: CpRootState) => common.navigation.projectsMedia(state[COMMON_SLICE_NAME]),
            videoHub: (state: CpRootState) => common.navigation.projectsVideoHub(state[COMMON_SLICE_NAME]),
            hlsPacketizers: (state: CpRootState) => common.navigation.projectsHlsPacketizers(state[COMMON_SLICE_NAME]),
            nextomeet: (state: CpRootState) => common.navigation.projectsNextomeet(state[COMMON_SLICE_NAME]),
            mobileMultiview: (state: CpRootState) =>
                common.navigation.projectsMobileMultiview(state[COMMON_SLICE_NAME]),
            exportWebStream: (state: CpRootState) =>
                common.navigation.projectsExportWebStream(state[COMMON_SLICE_NAME]),
            commercialDetection: (state: CpRootState) =>
                common.navigation.projectsCommercialDetection(state[COMMON_SLICE_NAME]),
            apOccasionalUse: (state: CpRootState) =>
                common.navigation.projectsApOccasionalUse(state[COMMON_SLICE_NAME]),
        },
        satellite: {
            root: (state: CpRootState) => common.navigation.satelliteRoot(state[COMMON_SLICE_NAME]),
            active: (state: CpRootState) => common.navigation.satelliteActive(state[COMMON_SLICE_NAME]),
            satellite: (state: CpRootState) => common.navigation.satelliteSatellite(state[COMMON_SLICE_NAME]),
            terrestrial: (state: CpRootState) => common.navigation.satelliteTerrestrial(state[COMMON_SLICE_NAME]),
            mcr: (state: CpRootState) => common.navigation.satelliteMcr(state[COMMON_SLICE_NAME]),
            gsr: (state: CpRootState) => common.navigation.satelliteGsr(state[COMMON_SLICE_NAME]),
            ird: (state: CpRootState) => common.navigation.satelliteIrd(state[COMMON_SLICE_NAME]),
            rfScan: (state: CpRootState) => common.navigation.satelliteRfScan(state[COMMON_SLICE_NAME]),
        },
    },
    apps: {
        selectedApps: (state: CpRootState) => common.selectSelectedApps(state[COMMON_SLICE_NAME]),
        appFormStatus: (state: CpRootState) => common.selectAppFormStatus(state[COMMON_SLICE_NAME]),
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
        inputFormat: (state: CpRootState) => localIpbeEditSelectors.selectInputFormat(state[IPBE_SLICE_NAME]),
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
export const userNotificationSelectors = {
    values: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationValues(state[NOTIFICATIONS_SLICE_NAME]),
    id: (state: CpRootState) => userNotificationSelectorsLocal.selectNotificationId(state[NOTIFICATIONS_SLICE_NAME]),
    name: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationRuleName(state[NOTIFICATIONS_SLICE_NAME]),
    dayTime: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationDayTime(state[NOTIFICATIONS_SLICE_NAME]),
    manualSelection: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationManualSelection(state[NOTIFICATIONS_SLICE_NAME]),
    output: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationOutput(state[NOTIFICATIONS_SLICE_NAME]),
    priority: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationPriority(state[NOTIFICATIONS_SLICE_NAME]),
    what: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhat(state[NOTIFICATIONS_SLICE_NAME]),
    where: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhere(state[NOTIFICATIONS_SLICE_NAME]),
    whome: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhome(state[NOTIFICATIONS_SLICE_NAME]),
    dayTimeErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationDayTimeErrors(state[NOTIFICATIONS_SLICE_NAME]),
    outputErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationOutputErrors(state[NOTIFICATIONS_SLICE_NAME]),
    whatErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhatErrors(state[NOTIFICATIONS_SLICE_NAME]),
    whereErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhereErrors(state[NOTIFICATIONS_SLICE_NAME]),
    whomeErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationWhomeErrors(state[NOTIFICATIONS_SLICE_NAME]),
    nameErrors: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectNotificationNameErrors(state[NOTIFICATIONS_SLICE_NAME]),
    rules: (state: CpRootState) =>
        userNotificationSelectorsLocal.seelectNotificationRools(state[NOTIFICATIONS_SLICE_NAME]),
    appTypes: (state: CpRootState) => userNotificationSelectorsLocal.appTypesSelectAll(state[NOTIFICATIONS_SLICE_NAME]),
    appTypesById: (state: CpRootState, id: Optional<string>) =>
        id ? userNotificationSelectorsLocal.appTypesSelectById(state[NOTIFICATIONS_SLICE_NAME], id) : undefined,
    employes: (state: CpRootState) => userNotificationSelectorsLocal.employesSelectAll(state[NOTIFICATIONS_SLICE_NAME]),
    employesById: (state: CpRootState, id: Optional<NumericId>) =>
        id ? userNotificationSelectorsLocal.employesSelectById(state[NOTIFICATIONS_SLICE_NAME], id) : undefined,
    ruleStatus: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectRoolsStatus(state[NOTIFICATIONS_SLICE_NAME]),
    appsList: (state: CpRootState) =>
        userNotificationSelectorsLocal.appsAdapterSelectAll(state[NOTIFICATIONS_SLICE_NAME]),
    appsListWithFilter: (state: CpRootState, filter: string) =>
        userNotificationSelectorsLocal.selectAppsWithFilter(state[NOTIFICATIONS_SLICE_NAME], filter),
    employesWithFilter: (state: CpRootState, filter: string) =>
        userNotificationSelectorsLocal.selectEmployesWithFilter(state[NOTIFICATIONS_SLICE_NAME], filter),
    appTypesWithFilter: (state: CpRootState, filter: string) =>
        userNotificationSelectorsLocal.appTypesWithFilter(state[NOTIFICATIONS_SLICE_NAME], filter),
    appsListById: (state: CpRootState, id: Optional<NumericId>) =>
        id ? userNotificationSelectorsLocal.appsAdapterSelectById(state[NOTIFICATIONS_SLICE_NAME], id) : undefined,
    messageTypes: (state: CpRootState) =>
        userNotificationSelectorsLocal.messageTypesSelectAll(state[NOTIFICATIONS_SLICE_NAME]),
    messageTypesById: (state: CpRootState, id: Optional<string>) =>
        id ? userNotificationSelectorsLocal.messageTypesSelectById(state[NOTIFICATIONS_SLICE_NAME], id) : undefined,
    selectAll: (state: CpRootState) =>
        userNotificationSelectorsLocal.userNotificationSelectAll(state[NOTIFICATIONS_SLICE_NAME]),
    selectHistory: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectHistory(state[NOTIFICATIONS_SLICE_NAME]),
    selectHistoryId: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectHistoryId(state[NOTIFICATIONS_SLICE_NAME]),
    historyProcess: (state: CpRootState) =>
        userNotificationSelectorsLocal.selectHistoryProcess(state[NOTIFICATIONS_SLICE_NAME]),
};

export const txrEditSelectors = {
    selectState: (state: CpRootState) => localTxrEditSelectors.selectTxrEditState(state[TXR_SLICE_NAME]),
    selectStatus: (state: CpRootState) => localTxrEditSelectors.selectTxrEditStatus(state[TXR_SLICE_NAME]),
    selectValidStatus: (state: CpRootState) => localTxrEditSelectors.selectTxrEditValidStatus(state[TXR_SLICE_NAME]),
    templates: (state: CpRootState) => localTxrEditSelectors.selectTxrTemplates(state[TXR_SLICE_NAME]),
    basicApplication: (state: CpRootState) => localTxrEditSelectors.selectBasicApplication(state[TXR_SLICE_NAME]),

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
