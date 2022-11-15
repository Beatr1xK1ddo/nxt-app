import {IApiNodesListItem, IMenuItem, IMenuItemShort} from "@nxt-ui/cp/api";
import {INodesListItem} from "@nxt-ui/cp/types";
import {INavigationSimpleTabState, INavigationState, INavTab, ENavigationTabState} from "./types";
export const nodesMapper = (node: IApiNodesListItem): INodesListItem => ({
    id: node.id,
    serialNumber: node.digitCode,
    name: node.name,
    hostname: node.hostname,
    online: node.is_online,
    cpuCoresCount: node.cpuCore,
    cpuGovernorMode: node.cpuGovernor,
    cpuLoad: node.cpu,
    cpuTemperature: node.temperature,
    cpuLoadAverage: node.loadAverage,
    ramUsed: node.memoryUsed,
    ramTotal: node.memory_total,
    decklinkPortsNum: node.decklinkPortsNum,
    sdiPortMapping: node.sdiPortMapping,
    digitCode: node.digitCode,
    isLocalInterface: node.isLocalInterface,
    sshPublicPort: node.sshPublicPort,
    adminUser: node.adminUser,
    rsshPort: node.rsshPort,
    remoteAddr: node.remoteAddr,
    type: node.type,
});

export const getLocalStorageBoolState = (key: string) => {
    const item = localStorage.getItem(key);
    const result = JSON.parse(item ?? "true") as boolean;
    return result;
};

export const setLocalStorageBoolState = (key: string, value: boolean) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const isIIMenuItem = (data: IMenuItemShort | IMenuItem): data is IMenuItem => {
    const submenu = data.submenu[0];
    return submenu && typeof submenu === "object" && "submenu" in submenu;
};

export const isINavTab = (data: INavTab | INavigationSimpleTabState): data is INavTab => {
    const key = Object.keys(data)[0];
    const field = data[key as keyof typeof data];
    return field && typeof field === "object" && "tabs" in field;
};

export const activeNavTab = (data: INavTab | INavigationSimpleTabState) => {
    let active = false;
    Object.keys(data).forEach((key) => {
        if (!data[key].disabled) {
            active = true;
        }
    });
    return active;
};

export const navigationMapper = (
    data: Array<IMenuItem | IMenuItemShort>,
    state: INavigationState
): INavigationState => {
    data.forEach((item) => {
        const isMenuItem = isIIMenuItem(item);
        if (isMenuItem) {
            const keyState = item.key as keyof INavigationState;
            const navItem = state[keyState] as INavTab;
            item.submenu.forEach((item) => {
                const keyTab = item.key;
                const tab = navItem[keyTab];
                tab.disabled = false;
                item.submenu.forEach((item) => {
                    if (item.key) {
                        const subTab = tab.tabs[item.key];
                        subTab.disabled = false;
                        if (!subTab.link) {
                            subTab.link = item.url;
                        }
                    }
                });
            });
        } else {
            const keyState = item.key as keyof INavigationState;
            const navItem = state[keyState] as INavigationSimpleTabState;
            item.submenu.forEach((item) => {
                navItem[item.key].disabled = false;
                if (!navItem[item.key].link) {
                    navItem[item.key].link = item.url;
                }
            });
        }
    });
    return state;
};

export const activeNavTabState = (key: string) => {
    return localStorage.getItem(key) ? (JSON.parse(localStorage.getItem(key) as string) as boolean) : true;
};
