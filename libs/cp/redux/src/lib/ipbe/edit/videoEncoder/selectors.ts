import {createSelector} from "@reduxjs/toolkit";
import {IIpbeEditVideoEncoderErrors, IIpbeEditVideoEncoderState} from "./types";

export const selectIpbeEditVideoEncoderValues = (state: IIpbeEditVideoEncoderState) => state.values;
export const selectIpbeEditVideoEncoderErrors = (state: IIpbeEditVideoEncoderState) => state.errors;
export const selectIpbeEditVideoEncoderError = createSelector(selectIpbeEditVideoEncoderErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof IIpbeEditVideoEncoderErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
