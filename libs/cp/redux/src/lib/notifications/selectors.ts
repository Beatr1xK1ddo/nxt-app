import {IUserNotificationState} from "./types";

import * as formSelectors from "./form/selectors";
import * as rulesSelectors from "./rules/selectors";
export const selectNotificationId = (state: IUserNotificationState) => formSelectors.selectNotificationId(state.form);
export const userNotificationAttTypesSelect = (state: IUserNotificationState) =>
    formSelectors.userNotificationAttTypesSelect(state.form);
export const selectNotificationWhere = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhere(state.form);
export const userNotificationEmployesSelect = (state: IUserNotificationState) =>
    formSelectors.userNotificationEmployesSelect(state.form);
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

export const selectNotificationWhereErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhereErrors(state.form);
export const selectNotificationDayTimeErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationDayTimeErrors(state.form);
export const selectNotificationWhatErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhatErrors(state.form);
export const selectNotificationOutputErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationOutputErrors(state.form);
export const selectNotificationWhomeErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationWhomeErrors(state.form);
export const selectNotificationNameErrors = (state: IUserNotificationState) =>
    formSelectors.selectNotificationNameErrors(state.form);

export const seelectNotificationRools = (state: IUserNotificationState) => rulesSelectors.selectRools(state.rules);
