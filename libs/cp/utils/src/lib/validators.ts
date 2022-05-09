export function stringIpMask(str: string) {
    let isValid = true;
    if (str && !parseInt(str)) {
        isValid = false;
    }
    const splitArray = str.split(".");
    if (str.length !== 4) {
        isValid = false;
    }

    splitArray.forEach((item) => {
        if (!item || item.length > 3) {
            isValid = false;
        }
    });

    return isValid;
}

// 1.2.2.4
// [1] [2] [2] [4]

// 1.2.2.
// [1] [2] [2] []

// 1.2..312.4
// [1] [2] [] [2] []
