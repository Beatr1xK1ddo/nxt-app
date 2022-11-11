import {createSelector} from "@reduxjs/toolkit";
import {INavigationState} from "../types";
import {activeNavTab} from "../utils";

export const selectNavLogs = (state: INavigationState) => state.logs;
export const selectActiveLogTab = createSelector(selectNavLogs, (logs) => activeNavTab(logs));
