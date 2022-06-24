import {createSelector} from "@reduxjs/toolkit";
import {IIpbeEditAdvanced, IIpbeEditAdvancedError, IIpbeEditAdvancedState} from "./types";

export const selectIpbeEditAdvancedValues = (state: IIpbeEditAdvancedState): IIpbeEditAdvanced => state.values;
export const selectIpbeEditAdvancedErrors = (state: IIpbeEditAdvancedState): IIpbeEditAdvancedError => state.errors;
export const selectIpbeEditAdvancedImageUrl = createSelector(selectIpbeEditAdvancedValues, (state) => state.image);
export const selectIpbeEditAdvancedError = createSelector(selectIpbeEditAdvancedErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof IIpbeEditAdvancedError>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
