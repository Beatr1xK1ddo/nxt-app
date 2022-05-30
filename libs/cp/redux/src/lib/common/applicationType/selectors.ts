import {createSelector} from "@reduxjs/toolkit";
import {IApplicationTypeState} from "./types";

const selectAllApplicationTypesRootState = (state: IApplicationTypeState) => state;
export const selectApplicationTypesStatus = createSelector(selectAllApplicationTypesRootState, (state) => state.status);
export const selectApplicationTypesValues = createSelector(selectAllApplicationTypesRootState, (state) => state.values);
