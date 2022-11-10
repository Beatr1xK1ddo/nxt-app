import {
    EApNavProjectList,
    EApOccasionalUseNavProjectList,
    EApTestsNavProjectList,
    ECommercialDetectionNavProjectList,
    EExportWebStreamNavProjectList,
    EHlsPacketizersNavProjectList,
    EMagsNavProjectList,
    EMediaNavProjectList,
    EMobileMultiviewNavProjectList,
    ENextomeetNavProjectList,
    EProjectsNavProjectList,
    ERaspberryNavProjectList,
    EVideoHubNavProjectList,
    EWebPlayerNavProjectList,
    INavProjectState,
} from "./types";

export const projectsInitialState: INavProjectState = {
    projects: {
        key: "projects",
        label: "Projects",
        permission: "",
        active: true,
        tabs: {
            crtcChannelsLogger: {
                active: true,
                permission: "",
                link: "",
                key: "crtcChannelsLogger",
                label: EProjectsNavProjectList.crtcChannelsLogger,
            },
            addb: {
                active: true,
                permission: "",
                link: "",
                key: "addb",
                label: EProjectsNavProjectList.addb,
            },
            crm: {
                active: true,
                permission: "",
                link: "",
                key: "crm",
                label: EProjectsNavProjectList.crm,
            },
            ingest: {
                active: true,
                permission: "",
                link: "",
                key: "ingest",
                label: EProjectsNavProjectList.ingest,
            },
            mailing: {
                active: true,
                permission: "",
                link: "",
                key: "mailing",
                label: EProjectsNavProjectList.mailing,
            },
            nxtMeet1: {
                active: true,
                permission: "",
                link: "",
                key: "nxtMeet1",
                label: EProjectsNavProjectList.nxtMeet1,
            },
            ptzCameraTest: {
                active: true,
                permission: "",
                link: "",
                key: "ptzCameraTest",
                label: EProjectsNavProjectList.ptzCameraTest,
            },
            streaming: {
                active: true,
                permission: "",
                link: "",
                key: "streaming",
                label: EProjectsNavProjectList.streaming,
            },
            transcodingCluster: {
                active: true,
                permission: "",
                link: "",
                key: "transcodingCluster",
                label: EProjectsNavProjectList.transcodingCluster,
            },
            voiceDetection: {
                active: true,
                permission: "",
                link: "",
                key: "voiceDetection",
                label: EProjectsNavProjectList.voiceDetection,
            },
        },
    },
    webPlayer: {
        key: "webPlayer",
        label: "Web Player",
        permission: "",
        active: true,
        tabs: {
            projectManageWebPlayers: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageWebPlayers",
                label: EWebPlayerNavProjectList.projectManageWebPlayers,
            },
            projectCreateWebPlayer: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateWebPlayer",
                label: EWebPlayerNavProjectList.projectCreateWebPlayer,
            },
            projectMonitoringSecurityCameras: {
                active: true,
                permission: "",
                link: "",
                key: "projectMonitoringSecurityCameras",
                label: EWebPlayerNavProjectList.projectMonitoringSecurityCameras,
            },
        },
    },
    apOccasionalUse: {
        key: "apOccasionalUse",
        label: "AP Occasional Use",
        permission: "",
        active: true,
        tabs: {
            projectApOccasionalUseSettings: {
                active: true,
                permission: "",
                link: "",
                key: "projectApOccasionalUseSettings",
                label: EApOccasionalUseNavProjectList.projectApOccasionalUseSettings,
            },
            projectManageAPOccasionalUse: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageAPOccasionalUse",
                label: EApOccasionalUseNavProjectList.projectManageAPOccasionalUse,
            },
        },
    },
    ap: {
        key: "ap",
        label: "AP",
        permission: "",
        active: true,
        tabs: {
            projectApClients: {
                active: true,
                permission: "",
                link: "",
                key: "projectApClients",
                label: EApNavProjectList.projectApClients,
            },
            projectApDashboard: {
                active: true,
                permission: "",
                link: "",
                key: "projectApDashboard",
                label: EApNavProjectList.projectApDashboard,
            },
            projectCdnProfileChecker: {
                active: true,
                permission: "",
                link: "",
                key: "projectCdnProfileChecker",
                label: EApNavProjectList.projectCdnProfileChecker,
            },
            projectCdnReport: {
                active: true,
                permission: "",
                link: "",
                key: "projectCdnReport",
                label: EApNavProjectList.projectCdnReport,
            },
            projectGenerateInvoice: {
                active: true,
                permission: "",
                link: "",
                key: "projectGenerateInvoice",
                label: EApNavProjectList.projectGenerateInvoice,
            },
            projectManagePlayoutItems: {
                active: true,
                permission: "",
                link: "",
                key: "projectManagePlayoutItems",
                label: EApNavProjectList.projectManagePlayoutItems,
            },
            projectManageReplays: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageReplays",
                label: EApNavProjectList.projectManageReplays,
            },
            projectMediaServers: {
                active: true,
                permission: "",
                link: "",
                key: "projectMediaServers",
                label: EApNavProjectList.projectMediaServers,
            },
            projectPricingSettings: {
                active: true,
                permission: "",
                link: "",
                key: "projectPricingSettings",
                label: EApNavProjectList.projectPricingSettings,
            },
            projectSdiPlayoutErrorsLog: {
                active: true,
                permission: "",
                link: "",
                key: "projectSdiPlayoutErrorsLog",
                label: EApNavProjectList.projectSdiPlayoutErrorsLog,
            },
            projectSlateDetails: {
                active: true,
                permission: "",
                link: "",
                key: "projectSlateDetails",
                label: EApNavProjectList.projectSlateDetails,
            },
            projectViewAllEndpoints: {
                active: true,
                permission: "",
                link: "",
                key: "projectViewAllEndpoints",
                label: EApNavProjectList.projectViewAllEndpoints,
            },
        },
    },
    apTests: {
        key: "apTests",
        label: "AP Tests",
        permission: "",
        active: true,
        tabs: {
            projectManageApCdnLinks: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageApCdnLinks",
                label: EApTestsNavProjectList.projectManageApCdnLinks,
            },
            projectTestApCdn: {
                active: true,
                permission: "",
                link: "",
                key: "projectTestApCdn",
                label: EApTestsNavProjectList.projectTestApCdn,
            },
            projectViewApStreams: {
                active: true,
                permission: "",
                link: "",
                key: "projectViewApStreams",
                label: EApTestsNavProjectList.projectViewApStreams,
            },
        },
    },
    raspberry: {
        key: "raspberry",
        label: "Raspberry",
        permission: "",
        active: true,
        tabs: {
            projectManageRaspberry: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageRaspberry",
                label: ERaspberryNavProjectList.projectManageRaspberry,
            },
            projectCreateRaspberry: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateRaspberry",
                label: ERaspberryNavProjectList.projectCreateRaspberry,
            },
        },
    },
    mags: {
        key: "raspberry",
        label: "Raspberry",
        permission: "",
        active: true,
        tabs: {
            projectManageMags: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageMags",
                label: EMagsNavProjectList.projectManageMags,
            },
            projectCreateMag: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateMag",
                label: EMagsNavProjectList.projectCreateMag,
            },
        },
    },
    commercialDetection: {
        key: "commercialDetection",
        label: "Commercial Detection",
        permission: "",
        active: true,
        tabs: {
            projectAdvLibrary: {
                active: true,
                permission: "",
                link: "",
                key: "projectAdvLibrary",
                label: ECommercialDetectionNavProjectList.projectAdvLibrary,
            },
            projectBlackDetectLog: {
                active: true,
                permission: "",
                link: "",
                key: "projectBlackDetectLog",
                label: ECommercialDetectionNavProjectList.projectBlackDetectLog,
            },
            projectLogoDetection: {
                active: true,
                permission: "",
                link: "",
                key: "projectLogoDetection",
                label: ECommercialDetectionNavProjectList.projectLogoDetection,
            },
            projectManageChannels: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageChannels",
                label: ECommercialDetectionNavProjectList.projectManageChannels,
            },
            projectReviewCommercials: {
                active: true,
                permission: "",
                link: "",
                key: "projectReviewCommercials",
                label: ECommercialDetectionNavProjectList.projectReviewCommercials,
            },
            projectScteLogger: {
                active: true,
                permission: "",
                link: "",
                key: "projectScteLogger",
                label: ECommercialDetectionNavProjectList.projectScteLogger,
            },
        },
    },
    exportWebStream: {
        key: "exportWebStream",
        label: "Export Web Stream",
        permission: "",
        active: true,
        tabs: {
            projectManageEmbedLink: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageEmbedLink",
                label: EExportWebStreamNavProjectList.projectManageEmbedLink,
            },
            projectCreateEmbedLink: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateEmbedLink",
                label: EExportWebStreamNavProjectList.projectCreateEmbedLink,
            },
        },
    },
    media: {
        key: "media",
        label: "Media",
        permission: "",
        active: true,
        tabs: {
            projectMediaServers: {
                active: true,
                permission: "",
                link: "",
                key: "projectMediaServers",
                label: EMediaNavProjectList.projectMediaServers,
            },
            projectMpegtsInputOutput: {
                active: true,
                permission: "",
                link: "",
                key: "projectMpegtsInputOutput",
                label: EMediaNavProjectList.projectMpegtsInputOutput,
            },
            projectRepublishing: {
                active: true,
                permission: "",
                link: "",
                key: "projectRepublishing",
                label: EMediaNavProjectList.projectRepublishing,
            },
        },
    },
    mobileMultiview: {
        key: "mobileMultiview",
        label: "Mobile multiview",
        permission: "",
        active: true,
        tabs: {
            projectAddMultiview: {
                active: true,
                permission: "",
                link: "",
                key: "projectAddMultiview",
                label: EMobileMultiviewNavProjectList.projectAddMultiview,
            },
            projectManageMultiview: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageMultiview",
                label: EMobileMultiviewNavProjectList.projectManageMultiview,
            },
        },
    },
    videoHub: {
        key: "videoHub",
        label: "VideoHub",
        permission: "",
        active: true,
        tabs: {
            projectManageVideoHubs: {
                active: true,
                permission: "",
                link: "",
                key: "projectManageVideoHubs",
                label: EVideoHubNavProjectList.projectManageVideoHubs,
            },
            projectCreateVideoHub: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateVideoHub",
                label: EVideoHubNavProjectList.projectCreateVideoHub,
            },
        },
    },
    hlsPacketizers: {
        key: "hlsPacketizers",
        label: "Hls Packetizers",
        permission: "",
        active: true,
        tabs: {
            projectHlsPacketizers: {
                active: true,
                permission: "",
                link: "",
                key: "projectHlsPacketizers",
                label: EHlsPacketizersNavProjectList.projectHlsPacketizers,
            },
            projectCreateHlsPacketizer: {
                active: true,
                permission: "",
                link: "",
                key: "projectCreateHlsPacketizer",
                label: EHlsPacketizersNavProjectList.projectCreateHlsPacketizer,
            },
        },
    },
    nextomeet: {
        active: true,
        key: "nextomeet",
        label: "Nextomeet",
        permission: "",
        tabs: {
            projectCalendar: {
                active: true,
                permission: "",
                link: "",
                key: "projectCalendar",
                label: ENextomeetNavProjectList.projectCalendar,
            },
            projectNextomeetRooms: {
                active: true,
                permission: "",
                link: "",
                key: "projectNextomeetRooms",
                label: ENextomeetNavProjectList.projectNextomeetRooms,
            },
            projectNextomeetServers: {
                active: true,
                permission: "",
                link: "",
                key: "projectNextomeetServers",
                label: ENextomeetNavProjectList.projectNextomeetServers,
            },
            projectSdiMonitoring: {
                active: true,
                permission: "",
                link: "",
                key: "projectSdiMonitoring",
                label: ENextomeetNavProjectList.projectSdiMonitoring,
            },
        },
    },
};
