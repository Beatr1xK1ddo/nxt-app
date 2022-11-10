import {ELogsNavAppList, INavLogsState} from "./types";

export const logsInitialState: INavLogsState = {
    apiLog: {
        active: true,
        permission: "",
        link: "",
        key: "apiLog",
        label: ELogsNavAppList.apiLog,
    },
    liveApplicationLog: {
        active: true,
        permission: "",
        link: "",
        key: "liveApplicationLog",
        label: ELogsNavAppList.liveApplicationLog,
    },
    liveSyslog: {
        active: true,
        permission: "",
        link: "",
        key: "liveSyslog",
        label: ELogsNavAppList.liveSyslog,
    },
    userActions: {
        active: true,
        permission: "",
        link: "",
        key: "userActions",
        label: ELogsNavAppList.userActions,
    },
    userVisits: {
        active: true,
        permission: "",
        link: "",
        key: "userVisits",
        label: ELogsNavAppList.userVisits,
    },
};
