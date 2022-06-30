import {IApiTxr} from "@nxt-ui/cp/api";
import {IFormError} from "@nxt-ui/cp/types";

import {ITxrEditState} from "./types";
import {
    selectTxrEditMainValues,
    selectTxrEditVideoEncoderValues,
    selectTxrEditAudioEncoderValues,
    selectTxrEditRtpMuxerValues,
    selectTxrEditMpegTsMuxerValues,
    selectTxrEditAdvancedValues,
} from "./selectors";
import {txrMainToApiMapper} from "./main/utils";
import {txrVideoEncoderToApiMapper} from "./videoEncoder/utils";
import {txrAdvancedToApiMapper} from "./advanced/utils";
import {txrMpegTsMuxerToApiMapper} from "./mpegTsMuxer/utils";
import {txrRTPMuxerToApiMapper} from "./rtpMuxer/utils";
import {txrAudioEncoderToApiMapper} from "./audioEncoder/utils";

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

export const toApiTxrMapper = (state: ITxrEditState): IApiTxr => {
    const main = txrMainToApiMapper(selectTxrEditMainValues(state));
    const videoEncoder = txrVideoEncoderToApiMapper(selectTxrEditVideoEncoderValues(state));
    const audioEncoder = txrAudioEncoderToApiMapper(selectTxrEditAudioEncoderValues(state));
    const mpegTsMuxer = txrMpegTsMuxerToApiMapper(selectTxrEditMpegTsMuxerValues(state));
    const rtpMuxer = txrRTPMuxerToApiMapper(selectTxrEditRtpMuxerValues(state));
    const advanced = txrAdvancedToApiMapper(selectTxrEditAdvancedValues(state));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
        ...main,
        ...videoEncoder,
        ...advanced,
        ...audioEncoder,
        ...mpegTsMuxer,
        ...rtpMuxer,
    };
};
