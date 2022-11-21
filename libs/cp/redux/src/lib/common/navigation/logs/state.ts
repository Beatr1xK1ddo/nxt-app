import {ELogsNavAppList, INavLogsState} from "./types";
import {activeNavTabState} from "../utils";

export const logsInitialState: INavLogsState = {
    apiLog: {
        id: 3,

        active: activeNavTabState("apiLog"),
        disabled: true,
        permission: "",
        link: "",
        key: "apiLog",
        label: ELogsNavAppList.apiLog,
    },
    liveApplicationLog: {
        id: 4,

        active: activeNavTabState("liveApplicationLog"),
        disabled: true,
        permission: "",
        link: "",
        key: "liveApplicationLog",
        label: ELogsNavAppList.liveApplicationLog,
    },
    liveSyslog: {
        id: 5,

        active: activeNavTabState("liveSyslog"),
        disabled: true,
        permission: "",
        link: "",
        key: "liveSyslog",
        label: ELogsNavAppList.liveSyslog,
    },
    userActions: {
        id: 1,
        active: activeNavTabState("userActions"),
        disabled: true,
        permission: "",
        link: "",
        key: "userActions",
        label: ELogsNavAppList.userActions,
    },
    userVisits: {
        id: 2,
        active: activeNavTabState("userVisits"),
        disabled: true,
        permission: "",
        link: "",
        key: "userVisits",
        label: ELogsNavAppList.userVisits,
    },
};
