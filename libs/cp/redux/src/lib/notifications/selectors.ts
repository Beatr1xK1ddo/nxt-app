import {IUserNotificationState} from "./types";

import * as formSelectors from "./form/selectors";
import * as rulesSelectors from "./rules/selectors";
import {NumericId} from "@nxt-ui/cp/types";
export const selectNotificationValues = (state: IUserNotificationState) =>
    formSelectors.selectNotificationValues(state.form);
export const selectNotificationId = (state: IUserNotificationState) => formSelectors.selectNotificationId(state.form);
export const selectNotificationWhere = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhere(state.form);
export const selectNotificationWhat = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhat(state.form);
export const selectNotificationWhome = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhome(state.form);
export const selectNotificationPriority = (state: IUserNotificationState) =>
    formSelectors.selectNotificationPriority(state.form);
export const selectNotificationManualSelection = (state: IUserNotificationState) =>
    formSelectors.selectNotificationManualSelection(state.form);
export const selectNotificationRuleName = (state: IUserNotificationState) =>
    formSelectors.selectNotificationRuleName(state.form);
export const selectNotificationDayTime = (state: IUserNotificationState) =>
    formSelectors.selectNotificationDayTime(state.form);
export const selectNotificationOutput = (state: IUserNotificationState) =>
    formSelectors.selectNotificationOutput(state.form);

export const appTypesSelectAll = (state: IUserNotificationState) => formSelectors.appTypesSelectAll(state.form);
export const appTypesSelectById = (state: IUserNotificationState, id: string) =>
    formSelectors.appTypesSelectById(state.form, id);

export const appsAdapterSelectAll = (state: IUserNotificationState) => formSelectors.appsAdapterSelectAll(state.form);
export const appsAdapterSelectById = (state: IUserNotificationState, id: NumericId) =>
    formSelectors.appsAdapterSelectById(state.form, id);
export const selectAppsWithFilter = (state: IUserNotificationState, filter: string) =>
    formSelectors.selectAppsWithFilter(state.form, filter);

export const employesSelectAll = (state: IUserNotificationState) => formSelectors.employesAdapterSelectAll(state.form);
export const employesSelectById = (state: IUserNotificationState, id: NumericId) =>
    formSelectors.employesAdapterSelectById(state.form, id);
export const selectEmployesWithFilter = (state: IUserNotificationState, filter: string) =>
    formSelectors.selectEmployesWithFilter(state.form, filter);

export const messageTypesSelectAll = (state: IUserNotificationState) => formSelectors.messageTypesSelectAll(state.form);
export const messageTypesSelectById = (state: IUserNotificationState, id: string) =>
    formSelectors.messageTypesSelectById(state.form, id);
export const appTypesWithFilter = (state: IUserNotificationState, filter: string) =>
    formSelectors.appTypesWithFilter(state.form, filter);

//appTypesWithFilter
export const selectNotificationWhereErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhereErrors(state.form);
export const selectNotificationDayTimeErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationDayTimeErrors(state.form);
export const userNotificationMessageTypesSelect = (state: IUserNotificationState) =>
    formSelectors.userNotificationMessageTypesSelect(state.form);
export const selectNotificationWhatErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhatErrors(state.form);
export const selectNotificationOutputErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationOutputErrors(state.form);
export const selectNotificationWhomeErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhomeErrors(state.form);
export const selectNotificationNameErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationNameErrors(state.form);
export const userNotificationSelectAll = (state: IUserNotificationState) =>
    formSelectors.userNotificationSelectAll(state.form);

export const seelectNotificationRools = (state: IUserNotificationState) => rulesSelectors.selectRools(state.rules);
export const selectRoolsStatus = (state: IUserNotificationState) => rulesSelectors.selectRoolsStatus(state.rules);
export const selectHistory = (state: IUserNotificationState) => rulesSelectors.selectHistory(state.rules);
export const selectHistoryId = (state: IUserNotificationState) => rulesSelectors.selectHistoryId(state.rules);
export const selectHistoryProcess = (state: IUserNotificationState) => rulesSelectors.selectHistoryProcess(state.rules);
