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
        key: "satellite",
        label: "Satellite",
        active: true,
        permission: "",
        tabs: {
            satelliteSatelliteList: {
                active: true,
                permission: "",
                link: "",
                key: "satelliteSatelliteList",
                label: ESatelliteNavAppList.satelliteSatelliteList,
            },
            satelliteSatelliteSettings: {
                active: true,
                permission: "",
                link: "",
                key: "satelliteSatelliteSettings",
                label: ESatelliteNavAppList.satelliteSatelliteSettings,
            },
        },
    },
    terrestrial: {
        key: "terrestrial",
        label: "Terrestrial",
        active: true,
        permission: "",
        tabs: {
            terrestrialTerrestrialHistory: {
                active: true,
                permission: "",
                link: "",
                key: "terrestrialTerrestrialHistory",
                label: ETerrestrialNavAppList.terrestrialTerrestrialHistory,
            },
            terrestrialTerrestrialList: {
                active: true,
                permission: "",
                link: "",
                key: "terrestrialTerrestrialList",
                label: ETerrestrialNavAppList.terrestrialTerrestrialList,
            },
        },
    },
    mcr: {
        key: "mcr",
        label: "MCR",
        permission: "",
        active: true,
        tabs: {
            mcrHistory: {
                active: true,
                permission: "",
                link: "",
                key: "mcrHistory",
                label: EMcrNavAppList.mcrHistory,
            },
            mcrList: {
                active: true,
                permission: "",
                link: "",
                key: "mcrList",
                label: EMcrNavAppList.mcrList,
            },
        },
    },
    gsr: {
        key: "gsr",
        label: "GSR",
        permission: "",
        active: true,
        tabs: {
            manageGsr: {
                active: true,
                permission: "",
                link: "",
                key: "manageGsr",
                label: EGsrNavAppList.manageGsr,
            },
        },
    },
    ird: {
        key: "ird",
        label: "IRD",
        permission: "",
        active: true,
        tabs: {
            manageIrdDevices: {
                active: true,
                permission: "",
                link: "",
                key: "manageIrdDevices",
                label: EIrdNavAppList.manageIrdDevices,
            },
            irdDevicesByLocation: {
                active: true,
                permission: "",
                link: "",
                key: "irdDevicesByLocation",
                label: EIrdNavAppList.irdDevicesByLocation,
            },
        },
    },
    rfScan: {
        key: "rfScan",
        label: "Rf Scan",
        permission: "",
        active: true,
        tabs: {
            rfScan: {
                active: true,
                permission: "",
                link: "",
                key: "rfScan",
                label: ERfScanNavAppList.rfScan,
            },
            rfScanDevices: {
                active: true,
                permission: "",
                link: "",
                key: "rfScanDevices",
                label: ERfScanNavAppList.rfScanDevices,
            },
            liveRfScanDemo: {
                active: true,
                permission: "",
                link: "",
                key: "liveRfScanDemo",
                label: ERfScanNavAppList.liveRfScanDemo,
            },
            fastRfScan: {
                active: true,
                permission: "",
                link: "",
                key: "fastRfScan",
                label: ERfScanNavAppList.fastRfScan,
            },
            addRfScanDevice: {
                active: true,
                permission: "",
                link: "",
                key: "addRfScanDevice",
                label: ERfScanNavAppList.addRfScanDevice,
            },
        },
    },
};
