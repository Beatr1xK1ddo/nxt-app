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
    if (floatNumber <= 90) {
        // 1 000 000 - 90 000 000
        return "Mbps";
    } else if (floatNumber > 90 && floatNumber <= 5000) {
        // 91 000 - 5 000 000
        return "Kbps";
    } else {
        return "Bps";
    }
}
// 6000 / 80 000
export function transformBitrate(value: Optional<string>) {
    const floatNumber = parseFloat(value || "");
    if (isNaN(floatNumber)) {
        return "";
    }
    const mbps = floatNumber / 1000000;
    const kbps = floatNumber / 1000;
    if (mbps >= 1 && mbps <= 90) {
        return mbps.toString();
    } else if (kbps > 90 && kbps <= 5000) {
        return kbps.toString();
    } else {
        return floatNumber.toString();
    }
}

export function convertToMbps(value: Optional<string>) {
    const floatNumber = parseFloat(value || "");
    if (isNaN(floatNumber)) {
        return null;
    }
    let result;
    if (floatNumber <= 90) {
        result = floatNumber * 1000000;
    } else if (floatNumber > 90 && floatNumber <= 5000) {
        result = floatNumber * 1000;
    } else {
        result = floatNumber;
    }
    return result;
}

export const bitrateFormatter = (value: d3.AxisDomain, index: number) => {
    if (typeof value === "number") {
        if (value > 1000000000) {
            return (value / 1000000000).toFixed(2) + "Gbps";
        } else if (value > 1000000) {
            return (value / 1000000).toFixed(2) + "Mbps";
        } else if (value > 1000) {
            return (value / 1000).toFixed(2) + "Kbps";
        } else {
            return value + "bps";
        }
    } else {
        return "unknown";
    }
};
