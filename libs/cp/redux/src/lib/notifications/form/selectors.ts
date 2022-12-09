import {createSelector} from "@reduxjs/toolkit";
import {INotificationForm} from "./types";

export const userNotificationValuesSelect = (state: INotificationForm) => state.values;
export const userNotificationErrorsSelect = (state: INotificationForm) => state.errors;
export const userNotificationAttTypesSelect = (state: INotificationForm) => state.appTypes;
export const userNotificationEmployesSelect = (state: INotificationForm) => state.employes;
export const userNotificationAppsSelect = (state: INotificationForm) => state.apps;
// values
export const selectNotificationId = createSelector(userNotificationValuesSelect, (values) => values.id);
export const selectNotificationWhere = createSelector(userNotificationValuesSelect, (values) => values.where);
export const selectNotificationWhat = createSelector(userNotificationValuesSelect, (values) => values.filter);
export const selectNotificationWhome = createSelector(userNotificationValuesSelect, (values) => values.whome);
export const selectNotificationPriority = createSelector(
    userNotificationValuesSelect,
    (values) => values.filter.priority
);
export const selectNotificationManualSelection = createSelector(
    userNotificationValuesSelect,
    (values) => values.filter.manualSelection
);
export const selectNotificationDayTime = createSelector(userNotificationValuesSelect, (values) => values.dayTime);
export const selectNotificationRuleName = createSelector(userNotificationValuesSelect, (values) => values.ruleName);
export const selectNotificationOutput = createSelector(
    userNotificationValuesSelect,
    (values) => values.deliveryChannel
);
// errors
export const selectNotificationWhereErrors = createSelector(userNotificationErrorsSelect, (errors) => errors?.where);
export const selectNotificationWhatErrors = createSelector(userNotificationErrorsSelect, (errors) => errors?.what);
export const selectNotificationDayTimeErrors = createSelector(
    userNotificationErrorsSelect,
    (errors) => errors?.dayTime
);
export const selectNotificationOutputErrors = createSelector(
    userNotificationErrorsSelect,
    (errors) => errors?.deliveryChannel
);
export const selectNotificationWhomeErrors = createSelector(userNotificationErrorsSelect, (errors) => errors?.whome);
export const selectNotificationNameErrors = createSelector(userNotificationErrorsSelect, (errors) => errors?.ruleName);
