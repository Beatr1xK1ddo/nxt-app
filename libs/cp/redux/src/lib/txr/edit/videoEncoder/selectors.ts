import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditVideoEncoderErrors, ITxrEditVideoEncoderState} from "./types";

export const selectTxrEditVideoEncoderValues = (state: ITxrEditVideoEncoderState) => state.values;
export const selectTxrEditVideoEncoderErrors = (state: ITxrEditVideoEncoderState) => state.errors;
export const selectTxrEditVideoEncoderError = createSelector(selectTxrEditVideoEncoderErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditVideoEncoderErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
