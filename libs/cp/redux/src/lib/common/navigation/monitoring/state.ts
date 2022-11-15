import {EIpMonitoringNavAppList, ENextomonQaNavAppList, INavMonitoringState} from "./types";
import {activeNavTabState} from "../utils";

export const monitoringInitialState: INavMonitoringState = {
    ipMonitoring: {
        key: "ipMonitoring",
        label: "IP Monitoring",
        permission: "",
        active: activeNavTabState("ipMonitoring"),
        disabled: true,
        tabs: {
            ipMonitoringBatchMonitoring: {
                active: activeNavTabState("ipMonitoringBatchMonitoring"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringBatchMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringBatchMonitoring,
            },
            ipMonitoringCreateIPMonitoring: {
                active: activeNavTabState("ipMonitoringCreateIPMonitoring"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringCreateIPMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringCreateIPMonitoring,
            },
            ipMonitoringHiddenErrors: {
                active: activeNavTabState("ipMonitoringHiddenErrors"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringHiddenErrors",
                label: EIpMonitoringNavAppList.ipMonitoringHiddenErrors,
            },
            ipMonitoringLiveMonitor: {
                active: activeNavTabState("ipMonitoringLiveMonitor"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringLiveMonitor",
                label: EIpMonitoringNavAppList.ipMonitoringLiveMonitor,
            },
            ipMonitoringManageMonitoring: {
                active: activeNavTabState("ipMonitoringManageMonitoring"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringManageMonitoring",
                label: EIpMonitoringNavAppList.ipMonitoringManageMonitoring,
            },
            ipMonitoringManagePresets: {
                active: activeNavTabState("ipMonitoringManagePresets"),
                disabled: true,
                permission: "",
                link: "",
                key: "ipMonitoringManagePresets",
                label: EIpMonitoringNavAppList.ipMonitoringManagePresets,
            },
            ipMonitoringServerRoomMonitoring: {
                active: activeNavTabState("ipMonitoringServerRoomMonitoring"),
                disabled: true,
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
        active: activeNavTabState("nextomonQa"),
        disabled: true,
        permission: "",
        tabs: {
            apMonitoringQa: {
                active: activeNavTabState("apMonitoringQa"),
                disabled: true,
                permission: "",
                link: "",
                key: "apMonitoringQa",
                label: ENextomonQaNavAppList.apMonitoringQa,
            },
        },
    },
};
