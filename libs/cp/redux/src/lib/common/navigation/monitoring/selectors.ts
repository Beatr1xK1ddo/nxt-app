import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const selectNavMonitoring = (state: INavigationState) => state.monitoring;

export const ipMonitoring = createSelector(selectNavMonitoring, (monitoring) => monitoring.ipMonitoring);
export const nextomonQa = createSelector(selectNavMonitoring, (monitoring) => monitoring.nextomonQa);
