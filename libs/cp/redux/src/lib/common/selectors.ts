//selectors
import {NumericId, StringId} from "@nxt-ui/cp/types";
import {ICommonState} from "./types";
import {nodesSelectors} from "./nodes";
import {applicationSelectors} from "./applications";
import {companiesSelector} from "./companies";
import {proxyServersSelector} from "./proxyServers";
import {NOTIFICATIONS_SLICE_NAME, notificationsSelectors} from "./notifications";
import {baseAppSelectors} from "./baseApp";
import {navigationSelectors} from "./navigation";
import {userSelectors} from "./user";

//base
export const selectTabVisible = (state: ICommonState) => baseAppSelectors.selectTabVisible(state.baseApp);
//applications
export const selectSelectedApps = (state: ICommonState) => applicationSelectors.selectSelectedApps(state.applications);
export const selectAppFormStatus = (state: ICommonState) =>
    applicationSelectors.selectAppFormStatus(state.applications);
// node
export const selectNodeById = (state: ICommonState, id: NumericId) => nodesSelectors.selectById(state.nodes, id);
export const selectNodesAll = (state: ICommonState) => nodesSelectors.selectAll(state.nodes);
export const selectNodeStatus = (state: ICommonState) => nodesSelectors.selectStatus(state.nodes);
export const selectNodesIds = (state: ICommonState) => nodesSelectors.selectIds(state.nodes);
export const selectNodesWithFilter = (state: ICommonState, filter?: string) =>
    nodesSelectors.selectWithFilter(state.nodes, filter);
// company
export const selectCompanyById = (state: ICommonState, id: NumericId) =>
    companiesSelector.selectById(state.companies, id);
export const selectCompanyStatus = (state: ICommonState) => companiesSelector.selectStatus(state.companies);
export const selectCompaniesAll = (state: ICommonState) => companiesSelector.selectAll(state.companies);
export const selectCompaniesWithFilter = (state: ICommonState, filter?: string) =>
    companiesSelector.selectWithFilter(state.companies, filter);
//notifications
export const notifications = {
    all: (state: ICommonState) => notificationsSelectors.all(state[NOTIFICATIONS_SLICE_NAME]),
    visible: (state: ICommonState) => notificationsSelectors.visible(state[NOTIFICATIONS_SLICE_NAME]),
    byId: (state: ICommonState, id: StringId) => notificationsSelectors.byId(state[NOTIFICATIONS_SLICE_NAME], id),
};
// proxyServer
export const selectProxyServerItemById = (state: ICommonState, id: NumericId) =>
    proxyServersSelector.selectById(state.proxyServers, id);
export const selectProxyServers = (state: ICommonState) => proxyServersSelector.selectAll(state.proxyServers);
export const selectProxyServersEntities = (state: ICommonState) =>
    proxyServersSelector.selectEntities(state.proxyServers);
export const selectProxyServersStatus = (state: ICommonState) => nodesSelectors.selectStatus(state.nodes);
// navigation
// application
export const navigation = {
    applicationRoot: (state: ICommonState) => navigationSelectors.selectNavApplication(state.navigation),
    applicationIpbe: (state: ICommonState) => navigationSelectors.ipbe(state.navigation),
    applicationTxr: (state: ICommonState) => navigationSelectors.txr(state.navigation),
    applicationChannel: (state: ICommonState) => navigationSelectors.channel(state.navigation),
    applicationSrt: (state: ICommonState) => navigationSelectors.srt(state.navigation),
    applicationTsForward: (state: ICommonState) => navigationSelectors.tsForward(state.navigation),
    applicationSpts: (state: ICommonState) => navigationSelectors.spts(state.navigation),
    applicationQFrame: (state: ICommonState) => navigationSelectors.qFrame(state.navigation),
    applicationMpts: (state: ICommonState) => navigationSelectors.mpts(state.navigation),
    applicationFailover: (state: ICommonState) => navigationSelectors.failover(state.navigation),
    applicationSupervisor: (state: ICommonState) => navigationSelectors.supervisor(state.navigation),
    applicationTeranex: (state: ICommonState) => navigationSelectors.teranex(state.navigation),
    applicationDecryption: (state: ICommonState) => navigationSelectors.decryption(state.navigation),
    applicationEncryption: (state: ICommonState) => navigationSelectors.encryption(state.navigation),
    applicationFilePlayer: (state: ICommonState) => navigationSelectors.filePlayer(state.navigation),
    applicationHyperDeck: (state: ICommonState) => navigationSelectors.hyperDeck(state.navigation),
    applicationHlsAnalyzer: (state: ICommonState) => navigationSelectors.hlsAnalyzer(state.navigation),
    applicationNxtLitePlayer: (state: ICommonState) => navigationSelectors.nxtLitePlayer(state.navigation),
    applicationMultiscreens: (state: ICommonState) => navigationSelectors.multiscreens(state.navigation),
    applicationTimeshifting: (state: ICommonState) => navigationSelectors.timeshifting(state.navigation),
    applicationSlateGenerator: (state: ICommonState) => navigationSelectors.slateGenerator(state.navigation),
    applicationTranscoder: (state: ICommonState) => navigationSelectors.transcoder(state.navigation),
    applicationStandardsConversion: (state: ICommonState) => navigationSelectors.standardsConversion(state.navigation),
    applicationTranscoder2: (state: ICommonState) => navigationSelectors.transcoder2(state.navigation),
    logs: (state: ICommonState) => navigationSelectors.selectNavLogs(state.navigation),
    monitoringRoot: (state: ICommonState) => navigationSelectors.selectNavMonitoring(state.navigation),
    monitoringIpMonitoring: (state: ICommonState) => navigationSelectors.ipMonitoring(state.navigation),
    monitoringNextomonQa: (state: ICommonState) => navigationSelectors.nextomonQa(state.navigation),
    node: (state: ICommonState) => navigationSelectors.selectNavNode(state.navigation),
    playoutRoot: (state: ICommonState) => navigationSelectors.selectNavPlayout(state.navigation),
    playoutPlayout: (state: ICommonState) => navigationSelectors.playout(state.navigation),
    playoutPlayout2: (state: ICommonState) => navigationSelectors.playout2(state.navigation),
    playoutIngest: (state: ICommonState) => navigationSelectors.ingest(state.navigation),
    playoutMam: (state: ICommonState) => navigationSelectors.mam(state.navigation),
    playoutFastSync: (state: ICommonState) => navigationSelectors.fastSync(state.navigation),
    playoutAdReplacer: (state: ICommonState) => navigationSelectors.adReplacer(state.navigation),
    projectsRoot: (state: ICommonState) => navigationSelectors.selectNavProjects(state.navigation),
    projectsProjects: (state: ICommonState) => navigationSelectors.projects(state.navigation),
    projectsWebPlayer: (state: ICommonState) => navigationSelectors.webPlayer(state.navigation),
    projectsApOccasionalUse: (state: ICommonState) => navigationSelectors.apOccasionalUse(state.navigation),
    projectsAp: (state: ICommonState) => navigationSelectors.ap(state.navigation),
    projectsApTests: (state: ICommonState) => navigationSelectors.apTests(state.navigation),
    projectsRaspberry: (state: ICommonState) => navigationSelectors.raspberry(state.navigation),
    projectsMags: (state: ICommonState) => navigationSelectors.mags(state.navigation),
    projectsCommercialDetection: (state: ICommonState) => navigationSelectors.commercialDetection(state.navigation),
    projectsExportWebStream: (state: ICommonState) => navigationSelectors.exportWebStream(state.navigation),
    projectsMedia: (state: ICommonState) => navigationSelectors.media(state.navigation),
    projectsMobileMultiview: (state: ICommonState) => navigationSelectors.mobileMultiview(state.navigation),
    projectsVideoHub: (state: ICommonState) => navigationSelectors.videoHub(state.navigation),
    projectsHlsPacketizers: (state: ICommonState) => navigationSelectors.hlsPacketizers(state.navigation),
    projectsNextomeet: (state: ICommonState) => navigationSelectors.nextomeet(state.navigation),
    satelliteRoot: (state: ICommonState) => navigationSelectors.selectNavSatellite(state.navigation),
    satelliteSatellite: (state: ICommonState) => navigationSelectors.satellite(state.navigation),
    satelliteTerrestrial: (state: ICommonState) => navigationSelectors.terrestrial(state.navigation),
    satelliteMcr: (state: ICommonState) => navigationSelectors.mcr(state.navigation),
    satelliteGsr: (state: ICommonState) => navigationSelectors.gsr(state.navigation),
    satelliteIrd: (state: ICommonState) => navigationSelectors.ird(state.navigation),
    satelliteRfScan: (state: ICommonState) => navigationSelectors.rfScan(state.navigation),
};
//user
export const user = {
    status: (state: ICommonState) => userSelectors.userSelector(state.user),
    user: (state: ICommonState) => userSelectors.userStatusSelector(state.user),
};
