import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditRTPMuxerErrors, ITxrEditRTPMuxerState} from "./types";

export const selectTxrEditRtpMuxerValues = (state: ITxrEditRTPMuxerState) => state.values;
export const selectTxrEditRtpMuxerErrors = (state: ITxrEditRTPMuxerState) => state.errors;
export const selectTxrEditRtpMuxerError = createSelector(selectTxrEditRtpMuxerErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditRTPMuxerErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
