import {IFormError} from "@nxt-ui/cp/types";

export enum ERTPMuxerError {
    videoPt = "videoPtError",
    audioPt = "audioPtError",
}

export type IIpbeEditRTPMuxerErrorsState = {
    [key in ERTPMuxerError]: IFormError;
};

export type IIpbeEditRTPMuxer = {
    audioPid?: string;
    videoPid?: string;
};

export type IIpbeEditRTPMuxerTabState = {
    errors: IIpbeEditRTPMuxerErrorsState;
    values: Partial<IIpbeEditRTPMuxer>;
};
