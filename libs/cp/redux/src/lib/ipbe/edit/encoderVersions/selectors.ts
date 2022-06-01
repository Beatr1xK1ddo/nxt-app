import {createSelector} from "@reduxjs/toolkit";
import {IEncoderVersion} from "./types";

const selectEncoderVersionsRootState = (state: IEncoderVersion) => state;
export const selectEncoderVersionsStatus = createSelector(selectEncoderVersionsRootState, (state) => state.status);
export const selectEncoderVersionsValues = createSelector(selectEncoderVersionsRootState, (state) => state.values);
