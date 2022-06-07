import {IIpbeEditMainState} from "./types";
import {createSelector} from "@reduxjs/toolkit";
import {BasicApplication, EAppGeneralStatus, EAppGeneralStatusChange} from "@nxt-ui/cp/types";

export const selectIpbeEditMainValues = (state: IIpbeEditMainState) => state.values;
export const selectIpbeEditMainErrors = (state: IIpbeEditMainState) => state.errors;
export const selectBasicApplication = createSelector(selectIpbeEditMainValues, (state): BasicApplication => {
    return {
        id: state.id,
        company: state.company || null,
        status: EAppGeneralStatus.new,
        statusChange: EAppGeneralStatusChange.start,
        startedAtMs: 0,
    };
});
export const selectIpbeEditMainApplication = createSelector(selectIpbeEditMainValues, (state) => state.applicationType);
export const selectIpbeEditNode = createSelector(selectIpbeEditMainValues, (state) => state.node);
