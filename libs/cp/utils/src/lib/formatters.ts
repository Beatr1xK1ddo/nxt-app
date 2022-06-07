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
