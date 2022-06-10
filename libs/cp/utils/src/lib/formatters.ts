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

export function bitrateEndings(value: Optional<number>) {
    if (typeof value !== "number") {
        return "";
    }
    if (value < 90) {
        return "Mbps";
    } else if (value > 90 && value < 5000) {
        return "Kbps";
    } else {
        return "Bps";
    }
}

export function convertToMbps(value: Optional<number>) {
    if (typeof value !== "number") {
        return null;
    }
    let result;
    if (value < 90) {
        result = value;
    } else if (value > 90 && value < 5000) {
        result = value / 1000;
    } else {
        result = value / 1000000;
    }
    return result;
}
