import {EVideoEncoderFormError, IIpbeEditVideoEncoderErrorsState} from "./types";

export const videoEncoderErrorState: IIpbeEditVideoEncoderErrorsState = Object.values(EVideoEncoderFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);
