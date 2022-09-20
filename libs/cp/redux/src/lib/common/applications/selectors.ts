import {IApplicationsState} from "./types";

export const selectSelectedApps = (state: IApplicationsState) => state.selectedApps;
