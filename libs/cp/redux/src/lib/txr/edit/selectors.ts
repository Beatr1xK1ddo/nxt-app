import {createSelector} from "@reduxjs/toolkit";
import {ITxrEditState} from "./types";
import {TXR_EDIT_STATUS_SLICE_NAME} from "./status";
import {TXR_EDIT_MAIN_SLICE_NAME, mainSelectors} from "./main";
import {stateValidator} from "./utils";

export const selectTxrEditStatus = (state: ITxrEditState) => state[TXR_EDIT_STATUS_SLICE_NAME];

export const selectTxrEditMainValues = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainValues(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainErrors = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainErrors(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainStatus = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainStatus(state[TXR_EDIT_MAIN_SLICE_NAME]);

export const selectTxrEditMainName = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainName(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainId = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainId(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrEditMainStartedAtMs = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainStartedAtMs(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrEditCompany =(state: ITxrEditState) =>
    mainSelectors.selectTxrEditCompany(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrAppType = (state: ITxrEditState) =>
    mainSelectors.selectTxrAppType(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrNodes = (state: ITxrEditState) =>
    mainSelectors.selectTxrNodes(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrSource = (state: ITxrEditState) =>
    mainSelectors.selectTxrSource(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrDestination = (state: ITxrEditState) =>
    mainSelectors.selectTxrDestination(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrDoubleTransmission = (state: ITxrEditState) =>
    mainSelectors.selectTxrDoubleTransmission(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrOpenPortAt = (state: ITxrEditState) =>
    mainSelectors.selectTxrOpenPortAt(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrRunMonitor = (state: ITxrEditState) =>
    mainSelectors.selectTxrRunMonitor(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrUseInterface = (state: ITxrEditState) =>
    mainSelectors.selectTxrUseInterface(state[TXR_EDIT_MAIN_SLICE_NAME]); 
export const selectTxrTTL = (state: ITxrEditState) => 
    mainSelectors.selectTxrTTL(state[TXR_EDIT_MAIN_SLICE_NAME]);
export const selectTxrBuffer = (state: ITxrEditState) => 
    mainSelectors.selectTxrBuffer(state[TXR_EDIT_MAIN_SLICE_NAME]);

export const selectTxrEditValidStatus = createSelector(
    [
        selectTxrEditMainErrors,
    ],
    (main) => {
        const states = [main];
        for (const state of states) {
            const valid = stateValidator(state);
            if (!valid) return false;
        }
        return true;
    }
);
export const selectTxrEditMainError = (state: ITxrEditState) =>
    mainSelectors.selectTxrEditMainError(state[TXR_EDIT_MAIN_SLICE_NAME]);
