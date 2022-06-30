import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditMpegTsMuxerErrors, ITxrEditMpegTsMuxerState} from "./types";

export const selectTxrEditMpegTsMuxerValues = (state: ITxrEditMpegTsMuxerState) => state.values;
export const selectTxrEditMpegTsMuxerErrors = (state: ITxrEditMpegTsMuxerState) => state.errors;
export const selectTxrEditMpegTsMuxerError = createSelector(selectTxrEditMpegTsMuxerErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditMpegTsMuxerErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
