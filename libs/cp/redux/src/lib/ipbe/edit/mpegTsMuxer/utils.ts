import {EMpegTsMuxerFormError, IIpbeEditMpegTsMuxerErrorsState} from "./types";

export const mpegTsMuxerErrorState: IIpbeEditMpegTsMuxerErrorsState = Object.values(EMpegTsMuxerFormError).reduce(
    (obj: any, key) => {
        obj[key] = {
            error: false,
        };
        return obj;
    },
    {}
);
