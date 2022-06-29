import {IFormError} from "@nxt-ui/cp/types";

export enum ERTPMuxerError {
    videoPt = "videoPt",
    audioPt = "audioPt",
}

export type ITxrEditRTPMuxerErrors = {
    [key in ERTPMuxerError]: IFormError;
};

export type ITxrEditRTPMuxer = {
    audioPt: null | number;
    videoPt: null | number;
};

export type ITxrEditRTPMuxerState = {
    values: ITxrEditRTPMuxer;
    errors: ITxrEditRTPMuxerErrors;
};
