export const frontUiMapper = (appType: string) => {
    switch (appType) {
        case "ipbe2":
            return "ipbe";
        case "txr2":
            return "txr";
        default:
            return "ipbe";
    }
};
