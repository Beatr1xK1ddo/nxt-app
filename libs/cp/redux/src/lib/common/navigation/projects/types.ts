import {INavigationTabState, INavTab} from "../types";

export enum EProjectsNavProjectList {
    mailing = "Mailing",
    ingest = "Ingest",
    crm = "CRM",
    addb = "Addb",
    transcodingCluster = "Transcoding cluster",
    streaming = "Streaming",
    ptzCameraTest = "PTZ Camera Test",
    crtcChannelsLogger = "CRTC Channels Logger",
    voiceDetection = "Voice Detection",
    nxtMeet1 = "NXTMeet 1.0",
}

export enum EWebPlayerNavProjectList {
    projectManageWebPlayers = "Manage Web Players",
    projectCreateWebPlayer = "Create Web Player",
    projectMonitoringSecurityCameras = "Monitoring security cameras",
}

export enum EApOccasionalUseNavProjectList {
    projectApOccasionalUseSettings = "AP Occasional Use Settings",
    projectManageAPOccasionalUse = "Manage AP Occasional Use",
}
export enum EApNavProjectList {
    projectApDashboard = "AP Dashboard",
    projectCdnReport = "CDN Report",
    projectApClients = "AP Clients",
    projectViewAllEndpoints = "View all endpoints",
    projectManageReplays = "Manage Replays",
    projectManagePlayoutItems = "Manage Playout Items",
    projectSdiPlayoutErrorsLog = "Sdi Playout Errors Log",
    projectSlateDetails = "Slate details",
    projectMediaServers = "Media Servers",
    projectCdnProfileChecker = "CDN Profile Checker",
    projectPricingSettings = "Pricing Settings",
    projectGenerateInvoice = "Generate Invoice",
}

export enum EApTestsNavProjectList {
    projectViewApStreams = "View AP Streams",
    projectTestApCdn = "Test AP CDN",
    projectManageApCdnLinks = "Manage AP CDN Links",
}
export enum ERaspberryNavProjectList {
    projectManageRaspberry = "Manage Raspberry",
    projectCreateRaspberry = "Create new Raspberry",
}
export enum EMagsNavProjectList {
    projectManageMags = "Manage Mags",
    projectCreateMag = "Create new Mag",
}
export enum ECommercialDetectionNavProjectList {
    projectManageChannels = "Manage Channels",
    projectReviewCommercials = "Review Commercials",
    projectAdvLibrary = "ADV Library",
    projectBlackDetectLog = "Black Detect Log",
    projectLogoDetection = "Logo detection",
    projectScteLogger = "SCTE Logger",
}
export enum EExportWebStreamNavProjectList {
    projectManageEmbedLink = "Manage Embed Link",
    projectCreateEmbedLink = "Create new Embed Link",
}
export enum EMediaNavProjectList {
    projectMediaServers = "Media servers",
    projectMpegtsInputOutput = "Mpegts Input/Output",
    projectRepublishing = "Republishing",
}
export enum EMobileMultiviewNavProjectList {
    projectManageMultiview = "Manage multiview",
    projectAddMultiview = "Add new multiview",
}

export enum EVideoHubNavProjectList {
    projectManageVideoHubs = "Manage Video Hubs",
    projectCreateVideoHub = "Create new Video Hub",
}
export enum EHlsPacketizersNavProjectList {
    projectHlsPacketizers = "Hls Packetizers",
    projectCreateHlsPacketizer = "Create new Hls Packetizer",
}

export enum ENextomeetNavProjectList {
    projectNextomeetServers = "Nextomeet Servers",
    projectNextomeetRooms = "Nextomeet Rooms",
    projectSdiMonitoring = "SDI Monitoring",
    projectCalendar = "Calendar",
}

export interface INavProjectState extends INavTab {
    projects: INavigationTabState<keyof typeof EProjectsNavProjectList>;
    webPlayer: INavigationTabState<keyof typeof EWebPlayerNavProjectList>;
    apOccasionalUse: INavigationTabState<keyof typeof EApOccasionalUseNavProjectList>;
    ap: INavigationTabState<keyof typeof EApNavProjectList>;
    apTests: INavigationTabState<keyof typeof EApTestsNavProjectList>;
    raspberry: INavigationTabState<keyof typeof ERaspberryNavProjectList>;
    mags: INavigationTabState<keyof typeof EMagsNavProjectList>;
    commercialDetection: INavigationTabState<keyof typeof ECommercialDetectionNavProjectList>;
    exportWebStream: INavigationTabState<keyof typeof EExportWebStreamNavProjectList>;
    media: INavigationTabState<keyof typeof EMediaNavProjectList>;
    mobileMultiview: INavigationTabState<keyof typeof EMobileMultiviewNavProjectList>;
    videoHub: INavigationTabState<keyof typeof EVideoHubNavProjectList>;
    hlsPacketizers: INavigationTabState<keyof typeof EHlsPacketizersNavProjectList>;
    nextomeet: INavigationTabState<keyof typeof ENextomeetNavProjectList>;
}
