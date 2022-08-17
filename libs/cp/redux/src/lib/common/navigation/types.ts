import {EIpbeNavAppList, ENavApplicationsItems, ETxrNavAppList} from "@nxt-ui/cp/types";

type INavApplicationState = {
    ipbe: {
        key: string;
        name: string;
        active: boolean;
        tabs: {
            [key in keyof typeof EIpbeNavAppList]: boolean;
        };
    };
    txr: {
        key: string;
        name: string;
        active: boolean;
        tabs: {
            [key in keyof typeof ETxrNavAppList]: boolean;
        };
    };
};

export type ENavApplicationKeys = keyof INavApplicationState;

export type INavigationTab = {
    active?: boolean;
    name: ENavApplicationsItems;
};

export type INavigationState = {
    applications: INavApplicationState;
};
