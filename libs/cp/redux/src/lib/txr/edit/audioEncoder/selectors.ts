import {createSelector} from "@reduxjs/toolkit";
import {ITxrAudioEncoderError, ITxrEditAudioEncodersState} from "./types";

export const selectTxrEditAudioEncoderValues = (state: ITxrEditAudioEncodersState) => state.values;
export const selectTxrEditAudioEncoderErrors = (state: ITxrEditAudioEncodersState) => state.errors;
export const selectTxrEditAudioEncoderDirty = (state: ITxrEditAudioEncodersState, index: number) =>
    state.dirty[index].dirty;
export const selectTxrEditAudioEncoderError = createSelector(selectTxrEditAudioEncoderErrors, (errors) => {
    let isError = false;
    errors.forEach((error) => {
        const keys = Object.keys(error) as Array<keyof ITxrAudioEncoderError>;
        keys.forEach((key) => {
            if (error[key]?.error) {
                isError = true;
            }
        });
    });
    return isError;
});
