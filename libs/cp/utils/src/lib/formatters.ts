import {Optional} from "@nxt-ui/cp/types";

export function memoryFormatter(value: number) {
    if (Number.isNaN(value)) {
        return "unknown";
    } else {
        if (value > 1000000000000) {
            return (value / 1000000000000).toFixed(2) + "Tb";
        } else if (value > 1000000000) {
            return (value / 1000000000).toFixed(2) + "Gb";
        } else if (value > 1000000) {
            return (value / 1000000).toFixed(2) + "Mb";
        } else if (value > 1000) {
            return (value / 1000).toFixed(2) + "Kb";
        } else {
            return value + "bps";
        }
    }
}

export function bitrateEndings(value: Optional<string>) {
    const floatNumber = parseFloat(value || "");
    if (isNaN(floatNumber)) {
        return "";
    }
    if (floatNumber < 90) {
        return "Mbps";
    } else if (floatNumber > 90 && floatNumber < 5000) {
        return "Kbps";
    } else {
        return "Bps";
    }
}

export function convertToMbps(value: Optional<string>) {
    const floatNumber = parseFloat(value || "");
    if (isNaN(floatNumber)) {
        return null;
    }
    let result;
    if (floatNumber < 90) {
        result = floatNumber;
    } else if (floatNumber > 90 && floatNumber < 5000) {
        result = floatNumber / 1000;
    } else {
        result = floatNumber / 1000000;
    }
    return result;
}
