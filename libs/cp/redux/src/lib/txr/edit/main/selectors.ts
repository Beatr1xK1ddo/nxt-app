import {ITxrEditMainErrors, ITxrEditMainState} from "./types";
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
export const selectTxrEditMainStatus = createSelector(selectTxrEditMainValues, (state) => state.status);
export const selectTxrEditMainName = createSelector(selectTxrEditMainValues, (state) => state.name);
export const selectTxrEditMainId = createSelector(selectTxrEditMainValues, (state) => state.id);
export const selectTxrEditMainStartedAtMs = createSelector(selectTxrEditMainValues, (state) => state.startedAtMs);
export const selectTxrEditCompany = createSelector(selectTxrEditMainValues, (state) => state.company);
export const selectTxrAppType = createSelector(selectTxrEditMainValues, (state) => state.appType);
export const selectTxrDoubleTransmission = createSelector(selectTxrEditMainValues, (state) => state.doubleTransmission);
export const selectTxrOpenPortAt = createSelector(selectTxrEditMainValues, (state) => state.openPortAt);
export const selectTxrTTL = createSelector(selectTxrEditMainValues, (state) => state.ttl);
export const selectTxrBuffer = createSelector(selectTxrEditMainValues, (state) => state.buffer);
export const selectTxrNodes = createSelector(selectTxrEditMainValues, (state) => ({
    txNodeId: state.txNodeId,
    rxNodeId: state.rxNodeId,

}));
export const selectTxrSource = createSelector(selectTxrEditMainValues, (state) => ({
    sourceIp: state.sourceIp,
    sourcePort: state.sourcePort,

}));
export const selectTxrDestination = createSelector(selectTxrEditMainValues, (state) => ({
    destinationIp: state.destinationIp,
    destinationPort: state.destinationPort,

}));
export const selectTxrRunMonitor = createSelector(selectTxrEditMainValues, (state) => ({
    txRunMonitor: state.txRunMonitor,
    rxRunMonitor: state.rxRunMonitor,

}));
export const selectTxrUseInterface = createSelector(selectTxrEditMainValues, (state) => ({
    txUseInterface: state.txUseInterface,
    rxUseInterface: state.rxUseInterface,

}));

export const selectTxrEditMainError = createSelector(selectTxrEditMainErrors, (errors) => {
    let isError = false;
    const keys = Object.keys(errors) as Array<keyof ITxrEditMainErrors>;
    keys.forEach((key) => {
        if (errors[key].error) {
            isError = true;
        }
    });
    return isError;
});
