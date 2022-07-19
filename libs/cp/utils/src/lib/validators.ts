import {IMonitoringDataEvent, Optional} from "@nxt-ui/cp/types";

export function stringIpMask(str: Optional<string>) {
    if (!str) {
        return false;
    }
    let isValid = true;
    if (!str || !/^[\d.]+$/.test(str)) {
        isValid = false;
    }
    const splitArray = str.split(".");
    if (splitArray.length !== 4) {
        isValid = false;
    }

    splitArray.forEach((item) => {
        if (!item || item.length > 3) {
            isValid = false;
        }
    });

    return isValid;
}

export const isIMonitoringDataEvent = (data: any): data is IMonitoringDataEvent => {
    return data && typeof data === "object" && "payload" in data && "nodeId" in data && "ip" in data && "port" in data;
};
