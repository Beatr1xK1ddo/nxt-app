import {createSelector} from "@reduxjs/toolkit";
import {IIpbeAudioEncoderError, IIpbeEditAudioEncodersState} from "./types";

export const selectIpbeEditAudioEncoderValues = (state: IIpbeEditAudioEncodersState) => state.values;
export const selectIpbeEditAudioEncoderErrors = (state: IIpbeEditAudioEncodersState) => state.errors;
export const selectIpbeEditAudioEncoderError = createSelector(selectIpbeEditAudioEncoderErrors, (errors) => {
    let isError = false;
    errors.forEach((error) => {
        const keys = Object.keys(error) as Array<keyof IIpbeAudioEncoderError>;
        keys.forEach((key) => {
            if (error[key]?.error) {
                isError = true;
            }
        });
    });
    return isError;
});
