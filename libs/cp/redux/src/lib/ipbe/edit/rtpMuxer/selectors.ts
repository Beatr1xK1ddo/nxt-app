import {createSelector} from "@reduxjs/toolkit";
import {IIpbeEditRTPMuxerErrors, IIpbeEditRTPMuxerState} from "./types";

export const selectIpbeEditRtpMuxerValues = (state: IIpbeEditRTPMuxerState) => state.values;
export const selectIpbeEditRtpMuxerErrors = (state: IIpbeEditRTPMuxerState) => state.errors;
export const selectIpbeEditRtpMuxerError = createSelector(selectIpbeEditRtpMuxerErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof IIpbeEditRTPMuxerErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
