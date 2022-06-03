import {createSelector} from "@reduxjs/toolkit";
import {IIpbeEditMpegTsMuxerErrors, IIpbeEditMpegTsMuxerState} from "./types";

export const selectIpbeEditMpegTsMuxerValues = (state: IIpbeEditMpegTsMuxerState) => state.values;
export const selectIpbeEditMpegTsMuxerErrors = (state: IIpbeEditMpegTsMuxerState) => state.errors;
export const selectIpbeEditMpegTsMuxerError = createSelector(selectIpbeEditMpegTsMuxerErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof IIpbeEditMpegTsMuxerErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
