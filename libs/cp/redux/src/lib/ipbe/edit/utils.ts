import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditState} from "./types";
import {EIpbeApplicationType, IFormError} from "@nxt-ui/cp/types";
import {IIpbeEditMainState} from "./main/types";

type ErrorHolder = {
    [key: string]: IFormError | Array<ErrorHolder>;
};

export const stateValidator = (errorsState: ErrorHolder | Array<ErrorHolder>): boolean => {
    if (Array.isArray(errorsState)) {
        for (const errorState of errorsState) {
            if (!stateValidator(errorState)) return false;
        }
    } else {
        for (const errorState of Object.values(errorsState)) {
            if (Array.isArray(errorState)) {
                if (!stateValidator(errorState)) return false;
            } else {
                if (errorState.error) return false;
            }
        }
    }
    return true;
};

type IFormErrorObject = {
    [key: string]: IFormError | Array<IFormErrorObject>;
};

type IFormErrorType = IFormErrorObject | Array<IFormErrorObject>;

const validTab = (errorValue: IFormErrorType) => {
    if (Array.isArray(errorValue)) {
        for (const item of errorValue) {
            validTab(item);
        }
    } else {
        const keys = Object.keys(errorValue);
        for (const key of keys) {
            const field = errorValue[key];
            if (Array.isArray(field)) {
                validTab(field);
            } else {
                if (field.error) return false;
            }
        }
    }
    return true;
};

const ipbeEditRequestMapper = (state: IIpbeEditMainState) => {
    let result;
    if (state.values.applicationType === EIpbeApplicationType.Sdi2Web) {
        const {ipbeDestinations, ...rest} = state.values;
        result = rest;
    } else {
        const {audioOutputIp, audioOutputPort, videoOutputIp, videoOutputPort, ...rest} = state.values;
        result = rest;
    }
    const {nodeId, ...rest} = result;
    result = Object.assign(rest, {node: nodeId});
    return result;
};

export const createUpdateIpbeMapper = (state: IIpbeEditState): {error: boolean; result: Partial<IApiIpbe>} => {
    const payloadState = {error: false, result: {}};
    const keys = Object.keys(state) as Array<keyof IIpbeEditState>;
    for (const key of keys) {
        if (key === "status" || key === "encoderVersion" || key === "videoConnections") {
            continue;
        }

        const errors = state[key].errors;
        const validTabField = validTab(errors);

        if (validTabField) {
            let values;
            if (key === "main") {
                values = ipbeEditRequestMapper(state.main);
            } else if (key === "audioEncoder") {
                values = {ipbeAudioEncoders: state[key].values};
            } else {
                values = state[key].values;
            }
            payloadState.result = {...payloadState.result, ...values};
        } else {
            payloadState.error = true;
            break;
        }
    }
    console.log("payloadState", payloadState);
    return payloadState;
};
