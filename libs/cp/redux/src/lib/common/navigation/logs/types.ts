import {INavigationSimpleTabState} from "../types";

export enum ELogsNavAppList {
    userActions = "User Actions",
    userVisits = "User Visits",
    apiLog = "API log",
    liveApplicationLog = "Live Application log",
    liveSyslog = "Live Syslog",
}

export type INavLogsState = INavigationSimpleTabState<keyof typeof ELogsNavAppList>;
