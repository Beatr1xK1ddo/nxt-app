import {ELogsNavAppList, INavLogsState} from "./types";

export const logsInitialState: INavLogsState = {
    apiLog: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "apiLog",
        label: ELogsNavAppList.apiLog,
    },
    liveApplicationLog: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "liveApplicationLog",
        label: ELogsNavAppList.liveApplicationLog,
    },
    liveSyslog: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "liveSyslog",
        label: ELogsNavAppList.liveSyslog,
    },
    userActions: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "userActions",
        label: ELogsNavAppList.userActions,
    },
    userVisits: {
        active: true,
        disabled: true,
        permission: "",
        link: "",
        key: "userVisits",
        label: ELogsNavAppList.userVisits,
    },
};
