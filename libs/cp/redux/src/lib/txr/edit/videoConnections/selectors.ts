import {createSelector} from "@reduxjs/toolkit";
import {IVideoConnectionsState} from "./types";

const selectVideoConnectionsRootState = (state: IVideoConnectionsState) => state;
export const selectVideoConnectionValues = createSelector(selectVideoConnectionsRootState, (state) => state.values);
