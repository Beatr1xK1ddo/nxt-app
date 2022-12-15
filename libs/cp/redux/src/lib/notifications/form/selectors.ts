import {INotificationApp} from "@nxt-ui/cp/api";
import {createSelector} from "@reduxjs/toolkit";
import {appsAdapter, appTypesAdapter, employesAdapter, messageTypesAdapter} from "./slices";
import {INotificationForm} from "./types";

const messageTypesSelector = messageTypesAdapter.getSelectors((state: INotificationForm) => state.messageTypes);
export const messageTypesSelectById = messageTypesSelector.selectById;
export const messageTypesSelectAll = messageTypesSelector.selectAll;

const appsAdapterSelector = appsAdapter.getSelectors((state: INotificationForm) => state.apps);
export const appsAdapterSelectById = appsAdapterSelector.selectById;
export const appsAdapterSelectAll = appsAdapterSelector.selectAll;
export const selectAppsWithFilter = createSelector(
    appsAdapterSelectAll,
    (state: unknown, filter: string) => filter,
    (apps, filter) => {
        return filter ? apps.filter((app) => app.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : apps;
    }
);

const employesAdapterSelector = employesAdapter.getSelectors((state: INotificationForm) => state.employes);
export const employesAdapterSelectById = employesAdapterSelector.selectById;
export const employesAdapterSelectAll = employesAdapterSelector.selectAll;
export const selectEmployesWithFilter = createSelector(
    employesAdapterSelectAll,
    (state: unknown, filter: string) => filter,
    (apps, filter) => {
        return filter ? apps.filter((app) => app.email.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : apps;
    }
);

const appTypesSelector = appTypesAdapter.getSelectors((state: INotificationForm) => state.appTypes);
export const appTypesSelectById = appTypesSelector.selectById;
export const appTypesSelectAll = appTypesSelector.selectAll;
export const appTypesWithFilter = createSelector(
    appTypesSelectAll,
    (state: unknown, filter: string) => filter,
    (apps, filter) => {
        return filter ? apps.filter((app) => app.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : apps;
    }
);

export const userNotificationValuesSelect = (state: INotificationForm) => state.values;
export const userNotificationErrorsSelect = (state: INotificationForm) => state.errors;
export const userNotificationAttTypesSelect = (state: INotificationForm) => state.appTypes;
export const userNotificationEmployesSelect = (state: INotificationForm) => state.employes;
export const userNotificationAppsSelect = (state: INotificationForm) => state.apps;
export const userNotificationMessageTypesSelect = (state: INotificationForm) => state.messageTypes;
export const selectNotificationManualSelection = createSelector(userNotificationValuesSelect, (values) =>
    values.filter.manualSelection.map((item) => item.name)
);
export const userNotificationSelectAll = createSelector(
    messageTypesSelectAll,
    selectNotificationManualSelection,
    (messages, selectedMessages) => messages.length === selectedMessages.length
);
// values
export const selectNotificationId = createSelector(userNotificationValuesSelect, (values) => values.id);
export const selectNotificationWhere = createSelector(userNotificationValuesSelect, (values) => values.where);
export const selectNotificationWhat = createSelector(userNotificationValuesSelect, (values) => values.filter);
export const selectNotificationWhome = createSelector(userNotificationValuesSelect, (values) => values.whome);
export const selectNotificationPriority = createSelector(
    userNotificationValuesSelect,
    (values) => values.filter.priority
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
