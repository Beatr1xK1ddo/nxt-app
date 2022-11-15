import {ENodeNavAppList, INavNodeState} from "./types";

export const nodeInitialState: INavNodeState = {
    nodeCreateLocation: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeCreateLocation",
        label: ENodeNavAppList.nodeCreateLocation,
    },
    nodeCreateNode: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeCreateNode",
        label: ENodeNavAppList.nodeCreateNode,
    },
    nodeManageLocations: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeManageLocations",
        label: ENodeNavAppList.nodeManageLocations,
    },
    nodeManageNodes: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeManageNodes",
        label: ENodeNavAppList.nodeManageNodes,
    },
    nodeOfflineNodes: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeOfflineNodes",
        label: ENodeNavAppList.nodeOfflineNodes,
    },
    nodeOurWorld: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeOurWorld",
        label: ENodeNavAppList.nodeOurWorld,
    },
    nodeOutdatedAppController: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeOutdatedAppController",
        label: ENodeNavAppList.nodeOutdatedAppController,
    },
    nodeOutdatedController: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeOutdatedController",
        label: ENodeNavAppList.nodeOutdatedController,
    },
    nodeStagingZone: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "nodeStagingZone",
        label: ENodeNavAppList.nodeStagingZone,
    },
};