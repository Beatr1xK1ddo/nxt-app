import {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditState} from "./types";
import {IFormError} from "@nxt-ui/cp/types";

export const createUpdateIpbeMapper = (state: IIpbeEditState): {error: boolean; result: Partial<IApiIpbe>} => {
    const payloadState = {error: false, result: {}};
    const keys = Object.keys(state) as Array<keyof IIpbeEditState>;
    for (const key of keys) {
        if (key === "status") {
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

        const values = state[key].values;
        payloadState.result = {...payloadState.result, ...values};
    }

    return payloadState;
};
