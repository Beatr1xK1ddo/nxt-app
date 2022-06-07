export function stringIpMask(str?: string) {
    if (!str) {
        return false;
    }
    let isValid = true;
    if (!str || !/^[\d.]+$/.test(str)) {
        console.log("tutu1");
        isValid = false;
    }
    const splitArray = str.split(".");
    if (splitArray.length !== 4) {
        isValid = false;
    }

    splitArray.forEach((item) => {
        if (!item || item.length > 4) {
            isValid = false;
        }
    });

    return isValid;
}
