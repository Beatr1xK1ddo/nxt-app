import {INavigationTabState, INavTab} from "../types";

export enum ESatelliteNavAppList {
    satelliteSatelliteList = "Satellite List",
    satelliteSatelliteSettings = "Satellite Settings",
}
export enum ETerrestrialNavAppList {
    terrestrialTerrestrialList = "Terrestrial List",
    terrestrialTerrestrialHistory = "Terrestrial History",
}
export enum EMcrNavAppList {
    mcrList = "MCR List",
    mcrHistory = "MCR History",
}
export enum EGsrNavAppList {
    manageGsr = "Manage GSR",
}
export enum EIrdNavAppList {
    manageIrdDevices = "Manage IRD Devices",
    irdDevicesByLocation = "IRD Devices By Location",
}
export enum ERfScanNavAppList {
    rfScan = "RF Scan",
    fastRfScan = "Fast RF Scan",
    rfScanDevices = "RF Scan Devices",
    addRfScanDevice = "Add new RF Scan device",
    liveRfScanDemo = "LIVE RF Scan Demo",
}

export interface INavSatelliteState extends INavTab {
    satellite: INavigationTabState<keyof typeof ESatelliteNavAppList>;
    terrestrial: INavigationTabState<keyof typeof ETerrestrialNavAppList>;
    mcr: INavigationTabState<keyof typeof EMcrNavAppList>;
    gsr: INavigationTabState<keyof typeof EGsrNavAppList>;
    ird: INavigationTabState<keyof typeof EIrdNavAppList>;
    rfScan: INavigationTabState<keyof typeof ERfScanNavAppList>;
}
