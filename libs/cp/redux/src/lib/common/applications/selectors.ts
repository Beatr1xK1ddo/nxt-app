import {IApplicationsState} from "./types";

export const selectSelectedApps = (state: IApplicationsState) => state.selectedApps;
export const selectAppFormStatus = (state: IApplicationsState) => state.appFormStatus.changed;
