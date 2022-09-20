import {IIpbeDestinationError, IIpbeEditMainErrors, IIpbeEditMainState} from "./types";
import {createSelector} from "@reduxjs/toolkit";
import {BasicApplication, EApiAppType} from "@nxt-ui/cp/types";

export const selectIpbeEditMainValues = (state: IIpbeEditMainState) => state.values;
export const selectIpbeEditMainErrors = (state: IIpbeEditMainState) => state.errors;
export const selectBasicApplication = createSelector(selectIpbeEditMainValues, (state): BasicApplication => {
    return {
        id: state.id,
        company: state.company,
        status: state.status,
        statusChange: state.statusChange,
        startedAtMs: state.startedAtMs,
        type: EApiAppType.IPBE,
    };
});
export const selectIpbeEditMainApplication = createSelector(selectIpbeEditMainValues, (state) => state.applicationType);
export const selectIpbeDestinations = createSelector(selectIpbeEditMainValues, (state) => state.ipbeDestinations);
export const selectIpbeEncoderVersion = createSelector(selectIpbeEditMainValues, (state) => state.encoderVersion);
export const selectIpbeEditMainStatus = createSelector(selectIpbeEditMainValues, (state) => state.status);
export const selectIpbeEditMainOutputType = createSelector(selectIpbeEditMainValues, (state) => state.outputType);
export const selectIpbeEditMainName = createSelector(selectIpbeEditMainValues, (state) => state.name);
export const selectIpbeEditMainId = createSelector(selectIpbeEditMainValues, (state) => state.id);
export const selectIpbeEditMainStartedAtMs = createSelector(selectIpbeEditMainValues, (state) => state.startedAtMs);
export const selectIpbeEditNode = createSelector(selectIpbeEditMainValues, (state) => state.nodeId);
export const selectIpbeEditMainError = createSelector(selectIpbeEditMainErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof IIpbeEditMainErrors>;
    keys.forEach((key) => {
        if (key === "ipbeDestinations") {
            errors.ipbeDestinations?.forEach((destination) => {
                const destinationKeys = Object.keys(destination) as Array<keyof IIpbeDestinationError>;
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
