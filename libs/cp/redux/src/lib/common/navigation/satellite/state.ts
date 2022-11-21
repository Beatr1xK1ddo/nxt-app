import {activeNavTabState} from "../utils";
import {
    EGsrNavAppList,
    EIrdNavAppList,
    EMcrNavAppList,
    ERfScanNavAppList,
    ESatelliteNavAppList,
    ETerrestrialNavAppList,
    INavSatelliteState,
} from "./types";

export const satelliteInitialState: INavSatelliteState = {
    satellite: {
        id: 1,

        key: "satellite",
        label: "Satellite",
        active: activeNavTabState("satellite"),
        disabled: true,
        permission: "",
        tabs: {
            satelliteSatelliteList: {
                active: activeNavTabState("satelliteSatelliteList"),
                disabled: true,
                permission: "",
                link: "",
                key: "satelliteSatelliteList",
                label: ESatelliteNavAppList.satelliteSatelliteList,
            },
            satelliteSatelliteSettings: {
                active: activeNavTabState("satelliteSatelliteSettings"),
                disabled: true,
                permission: "",
                link: "",
                key: "satelliteSatelliteSettings",
                label: ESatelliteNavAppList.satelliteSatelliteSettings,
            },
        },
    },
    terrestrial: {
        id: 2,

        key: "terrestrial",
        label: "Terrestrial",
        active: activeNavTabState("terrestrial"),
        disabled: true,
        permission: "",
        tabs: {
            terrestrialTerrestrialHistory: {
                active: activeNavTabState("terrestrialTerrestrialHistory"),
                disabled: true,
                permission: "",
                link: "",
                key: "terrestrialTerrestrialHistory",
                label: ETerrestrialNavAppList.terrestrialTerrestrialHistory,
            },
            terrestrialTerrestrialList: {
                active: activeNavTabState("terrestrialTerrestrialList"),
                disabled: true,
                permission: "",
                link: "",
                key: "terrestrialTerrestrialList",
                label: ETerrestrialNavAppList.terrestrialTerrestrialList,
            },
        },
    },
    mcr: {
        id: 3,

        key: "mcr",
        label: "MCR",
        permission: "",
        active: activeNavTabState("mcr"),
        disabled: true,
        tabs: {
            mcrHistory: {
                active: activeNavTabState("mcrHistory"),
                disabled: true,
                permission: "",
                link: "",
                key: "mcrHistory",
                label: EMcrNavAppList.mcrHistory,
            },
            mcrList: {
                active: activeNavTabState("mcrList"),
                disabled: true,
                permission: "",
                link: "",
                key: "mcrList",
                label: EMcrNavAppList.mcrList,
            },
        },
    },
    gsr: {
        id: 4,

        key: "gsr",
        label: "GSR",
        permission: "",
        active: activeNavTabState("gsr"),
        disabled: true,
        tabs: {
            manageGsr: {
                active: activeNavTabState("manageGsr"),
                disabled: true,
                permission: "",
                link: "",
                key: "manageGsr",
                label: EGsrNavAppList.manageGsr,
            },
        },
    },
    ird: {
        id: 5,

        key: "ird",
        label: "IRD",
        permission: "",
        active: activeNavTabState("ird"),
        disabled: true,
        tabs: {
            manageIrdDevices: {
                active: activeNavTabState("manageIrdDevices"),
                disabled: true,
                permission: "",
                link: "",
                key: "manageIrdDevices",
                label: EIrdNavAppList.manageIrdDevices,
            },
            irdDevicesByLocation: {
                active: activeNavTabState("irdDevicesByLocation"),
                disabled: true,
                permission: "",
                link: "",
                key: "irdDevicesByLocation",
                label: EIrdNavAppList.irdDevicesByLocation,
            },
        },
    },
    rfScan: {
        id: 6,

        key: "rfScan",
        label: "Rf Scan",
        permission: "",
        active: activeNavTabState("rfScan"),
        disabled: true,
        tabs: {
            rfScan: {
                active: activeNavTabState("rfScan"),
                disabled: true,
                permission: "",
                link: "",
                key: "rfScan",
                label: ERfScanNavAppList.rfScan,
            },
            rfScanDevices: {
                active: activeNavTabState("rfScanDevices"),
                disabled: true,
                permission: "",
                link: "",
                key: "rfScanDevices",
                label: ERfScanNavAppList.rfScanDevices,
            },
            liveRfScanDemo: {
                active: activeNavTabState("liveRfScanDemo"),
                disabled: true,
                permission: "",
                link: "",
                key: "liveRfScanDemo",
                label: ERfScanNavAppList.liveRfScanDemo,
            },
            fastRfScan: {
                active: activeNavTabState("fastRfScan"),
                disabled: true,
                permission: "",
                link: "",
                key: "fastRfScan",
                label: ERfScanNavAppList.fastRfScan,
            },
            addRfScanDevice: {
                active: activeNavTabState("addRfScanDevice"),
                disabled: true,
                permission: "",
                link: "",
                key: "addRfScanDevice",
                label: ERfScanNavAppList.addRfScanDevice,
            },
        },
    },
};
