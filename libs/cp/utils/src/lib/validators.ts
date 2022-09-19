import {EErrorType, Optional} from "@nxt-ui/cp/types";

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
    return port && port <= 65535 ? true : false;
}

export const checkErrors = (state: any, value: any, key: string, message: string, isValid = true) => {
    const emptyValue = value === undefined || value === null || value === "";
    if (emptyValue || !isValid) {
        state.errors[key].error = true;
        state.errors[key].helperText = message; //EErrorType.required;
    }

    if (value && state.errors[key].error && isValid) {
        state.errors[key].error = false;
        delete state.errors[key].helperText;
    }
};

interface IValidationData {
    key: string;
    value: any;
    required?: boolean;
}

export const toggleValueInState = (state: any, key: string) => {
    state.values[key] = !state.values[key];
};
export const setValueInState = (state: any, data: IValidationData) => {
    data.required && checkErrors(state, data.value, data.key, EErrorType.required);
    state.values[data.key] = data.value;
};
export const setPortInState = (state: any, data: IValidationData) => {
    const isValid = validationPort(data.value);
    checkErrors(state, data.value, data.key, EErrorType.badPort, isValid);
    state.values[data.key] = data.value;
};
export const setIpInState = (state: any, data: IValidationData) => {
    const isValid = stringIpMask(data.value);
    checkErrors(state, data.value, data.key, EErrorType.badIp, isValid);
    state.values[data.key] = data.value;
};
export const setNameInState = (state: any, data: IValidationData) => {
    let name = "";
    if (/^[a-z0-9_]+$/i.test(data.value) || data.value === "") {
        name = data.value;
    } else {
        const strArray = data.value.split("");
        strArray.forEach((char: string, i: number) => {
            if (!/^[a-z0-9_]+$/i.test(char)) {
                name = `${data.value.slice(0, i)}_${data.value.slice(i + 1, data.value.length)}`;
            }
        });
    }
    const isValid = !/^[_]+$/i.test(name);
    const errorText = isValid ? EErrorType.required : EErrorType.notCorrect;
    checkErrors(state, name, data.key, errorText, isValid);
    state.values[data.key] = name;
};
