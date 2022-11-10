import {EIpMonitoringNavAppList, ENextomonQaNavAppList, INavMonitoringState} from "./types";

export const monitoringInitialState: INavMonitoringState = {
    ipMonitoring: {
        key: "ipMonitoring",
        label: "IP Monitoring",
        permission: "",
        active: true,
        tabs: {
            ipMonitoringBatchMonitoring: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringBatchMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringBatchMonitoring,
            },
            ipMonitoringCreateIPMonitoring: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringCreateIPMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringCreateIPMonitoring,
            },
            ipMonitoringHiddenErrors: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringHiddenErrors",
                label: EIpMonitoringNavAppList.ipMonitoringHiddenErrors,
            },
            ipMonitoringLiveMonitor: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringLiveMonitor",
                label: EIpMonitoringNavAppList.ipMonitoringLiveMonitor,
            },
            ipMonitoringManageMonitoring: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringManageMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringManageMonitoring,
            },
            ipMonitoringManagePresets: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringManagePresets",
                label: EIpMonitoringNavAppList.ipMonitoringManagePresets,
            },
            ipMonitoringServerRoomMonitoring: {
                active: true,
                permission: "",
                link: "",
                key: "ipMonitoringServerRoomMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringServerRoomMonitoring,
            },
        },
    },
    nextomonQa: {
        key: "nextomonQa",
        label: "Nextomon QA",
        active: true,
        permission: "",
        tabs: {
            apMonitoringQa: {
                active: true,
                permission: "",
                link: "",
                key: "apMonitoringQa",
                label: ENextomonQaNavAppList.apMonitoringQa,
            },
        },
    },
};
