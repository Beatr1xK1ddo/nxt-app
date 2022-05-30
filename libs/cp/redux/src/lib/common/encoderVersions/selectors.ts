import {createSelector} from "@reduxjs/toolkit";
import {IEncoderVersion} from "./types";

const selectAllApplicationTypesRootState = (state: IEncoderVersion) => state;
export const selectApplicationTypesStatus = createSelector(selectAllApplicationTypesRootState, (state) => state.status);
export const selectApplicationTypesValues = createSelector(selectAllApplicationTypesRootState, (state) => state.values);
