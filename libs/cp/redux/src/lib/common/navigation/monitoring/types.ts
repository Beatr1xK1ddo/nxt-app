import {INavigationTabState, INavTab} from "../types";

export enum EIpMonitoringNavAppList {
    ipMonitoringManageMonitoring = "Manage Monitoring",
    ipMonitoringCreateIPMonitoring = "Create New IP Monitoring",
    ipMonitoringManagePresets = "Manage Presets",
    ipMonitoringLiveMonitor = "Live Monitor",
    ipMonitoringHiddenErrors = "Hidden Errors",
    ipMonitoringBatchMonitoring = "Batch Monitoring",
    ipMonitoringServerRoomMonitoring = "Server Room Monitoring",
}
export enum ENextomonQaNavAppList {
    apMonitoringQa = "AP monitoring QA",
}

export interface INavMonitoringState extends INavTab {
    ipMonitoring: INavigationTabState<keyof typeof EIpMonitoringNavAppList>;
    nextomonQa: INavigationTabState<keyof typeof ENextomonQaNavAppList>;
}
