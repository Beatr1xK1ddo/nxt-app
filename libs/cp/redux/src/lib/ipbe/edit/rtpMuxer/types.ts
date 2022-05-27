import {IFormError} from "@nxt-ui/cp/types";

export enum ERTPMuxerError {
    videoPt = "videoPt",
    audioPt = "audioPt",
}

export type IIpbeEditRTPMuxerErrors = {
    [key in ERTPMuxerError]: IFormError;
};

export type IIpbeEditRTPMuxer = {
    audioPt: null | number;
    videoPt: null | number;
};

export type IIpbeEditRTPMuxerState = {
    values: IIpbeEditRTPMuxer;
    errors: IIpbeEditRTPMuxerErrors;
};
