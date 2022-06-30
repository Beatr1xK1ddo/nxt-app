import {ITxrDestinationError, ITxrEditMainErrors, ITxrEditMainState} from "./types";
import {createSelector} from "@reduxjs/toolkit";
import {BasicApplication} from "@nxt-ui/cp/types";

export const selectTxrEditMainValues = (state: ITxrEditMainState) => state.values;
export const selectTxrEditMainErrors = (state: ITxrEditMainState) => state.errors;
export const selectBasicApplication = createSelector(selectTxrEditMainValues, (state): BasicApplication => {
    return {
        id: state.id,
        company: state.company,
        status: state.status,
        statusChange: state.statusChange,
        startedAtMs: state.startedAtMs,
    };
});
export const selectTxrEditMainApplication = createSelector(selectTxrEditMainValues, (state) => state.applicationType);
export const selectTxrEditMainStatus = createSelector(selectTxrEditMainValues, (state) => state.status);
export const selectTxrEditMainOutputType = createSelector(selectTxrEditMainValues, (state) => state.outputType);
export const selectTxrEditMainName = createSelector(selectTxrEditMainValues, (state) => state.name);
export const selectTxrEditMainId = createSelector(selectTxrEditMainValues, (state) => state.id);
export const selectTxrEditMainStartedAtMs = createSelector(selectTxrEditMainValues, (state) => state.startedAtMs);
export const selectTxrEditNode = createSelector(selectTxrEditMainValues, (state) => state.nodeId);
export const selectTxrEditMainError = createSelector(selectTxrEditMainErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditMainErrors>;
    keys.forEach((key) => {
        if (key === "txrDestinations") {
            errors.txrDestinations?.forEach((destination) => {
                const destinationKeys = Object.keys(destination) as Array<keyof ITxrDestinationError>;
                destinationKeys.forEach((destinationKey) => {
                    if (destination[destinationKey].error) {
                        isError = true;
                    }
                });
            });
        } else {
            if (errors[key].error) {
                isError = true;
            }
        }
    });
    return isError;
});
