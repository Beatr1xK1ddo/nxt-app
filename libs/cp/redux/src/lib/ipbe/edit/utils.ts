import {IApiIpbe, IApiIpbeEditAudioEncoder} from "@nxt-ui/cp/api";
import {IIpbeEditState} from "./types";
import {EIpbeApplicationType, IFormError} from "@nxt-ui/cp/types";

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

export const createUpdateIpbeMapper = (state: IIpbeEditState): {error: boolean; result: Partial<IApiIpbe>} => {
    const payloadState = {error: false, result: {}};
    const keys = Object.keys(state) as Array<keyof IIpbeEditState>;
    for (const key of keys) {
        if (key === "status" || key === "encoderVersion" || key === "videoConnections") {
            continue;
        }

        const errors = state[key].errors;
        const errorsKeys = Object.keys(errors) as Array<keyof typeof errors>;
        for (const errorKey of errorsKeys) {
            const errorValue = errors[errorKey] as IFormError | Array<IFormError>;
            if (Array.isArray(errorValue)) {
                for (const error of errorValue) {
                    if (error.error) {
                        payloadState.error = true;
                        break;
                    }
                }
            } else {
                if (errorValue.error) {
                    payloadState.error = true;
                    break;
                }
            }
        }

        if (payloadState.error) {
            break;
        }
        let values;

        if (key === "main") {
            const {nodeId, ...rest} = state[key].values;
            values = {...rest, node: nodeId};
        } else if (key === "audioEncoder") {
            const result = state[key].values.map((item) => {
                const {dirty, ...rest} = item;
                return rest;
            });
            values = {
                ipbeAudioEncoders: result,
            };
        } else {
            values = state[key].values;
        }
        payloadState.result = {...payloadState.result, ...values};
    }
    if (state.main.values.applicationType === EIpbeApplicationType.Sdi2Web) {
        const {ipbeDestinations, ...rest} = payloadState.result as Partial<IApiIpbe>;
        payloadState.result = rest;
    } else {
        const {audioOutputIp, audioOutputPort, videoOutputIp, videoOutputPort, ...rest} =
            payloadState.result as Partial<IApiIpbe>;
        payloadState.result = rest;
    }
    return payloadState;
};
