import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditAdvanced, ITxrEditAdvancedError, ITxrEditAdvancedState} from "./types";

export const selectTxrEditAdvancedValues = (state: ITxrEditAdvancedState): ITxrEditAdvanced => state.values;
export const selectTxrEditAdvancedErrors = (state: ITxrEditAdvancedState): ITxrEditAdvancedError => state.errors;
export const selectTxrEditAdvancedImageUrl = createSelector(selectTxrEditAdvancedValues, (state) => state.image);
export const selectTxrEditAdvancedError = createSelector(selectTxrEditAdvancedErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditAdvancedError>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
