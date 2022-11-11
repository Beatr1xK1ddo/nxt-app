import {INavigationSimpleTabState} from "../types";

export enum ENodeNavAppList {
    nodeStagingZone = "Staging Zone",
    nodeManageNodes = "Manage nodes",
    nodeCreateNode = "Create new node",
    nodeOfflineNodes = "Offline nodes",
    nodeOutdatedController = "Outdated dv controller",
    nodeOutdatedAppController = "Outdated app controller",
    nodeManageLocations = "Manage locations",
    nodeCreateLocation = "Create new location",
    nodeOurWorld = "Our world",
}

export type INavNodeState = INavigationSimpleTabState<keyof typeof ENodeNavAppList>;
