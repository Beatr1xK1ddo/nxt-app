import {INavigationState} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {activeNavTab} from "../utils";

export const selectNavMonitoring = (state: INavigationState) => state.monitoring;
export const selectActiveMonitoringTab = createSelector(selectNavMonitoring, (monitoring) => activeNavTab(monitoring));

export const ipMonitoring = createSelector(selectNavMonitoring, (monitoring) => monitoring.ipMonitoring);
export const nextomonQa = createSelector(selectNavMonitoring, (monitoring) => monitoring.nextomonQa);
