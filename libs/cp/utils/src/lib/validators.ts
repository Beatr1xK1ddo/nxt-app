import {Optional} from "@nxt-ui/cp/types";

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

export function validationPort(port: Optional<number>) {
    return port && port <= 65555 ? true : false;
}
