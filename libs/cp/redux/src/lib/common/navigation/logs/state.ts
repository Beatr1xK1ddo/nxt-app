import {ELogsNavAppList, INavLogsState} from "./types";
import {activeNavTabState} from "../utils";

export const logsInitialState: INavLogsState = {
    apiLog: {
        active: activeNavTabState("apiLog"),
        disabled: true,
        permission: "",
        link: "",
        key: "apiLog",
        label: ELogsNavAppList.apiLog,
    },
    liveApplicationLog: {
        active: activeNavTabState("liveApplicationLog"),
        disabled: true,
        permission: "",
        link: "",
        key: "liveApplicationLog",
        label: ELogsNavAppList.liveApplicationLog,
    },
    liveSyslog: {
        active: activeNavTabState("liveSyslog"),
        disabled: true,
        permission: "",
        link: "",
        key: "liveSyslog",
        label: ELogsNavAppList.liveSyslog,
    },
    userActions: {
        active: activeNavTabState("userActions"),
        disabled: true,
        permission: "",
        link: "",
        key: "userActions",
        label: ELogsNavAppList.userActions,
    },
    userVisits: {
        active: activeNavTabState("userVisits"),
        disabled: true,
        permission: "",
        link: "",
        key: "userVisits",
        label: ELogsNavAppList.userVisits,
    },
};
