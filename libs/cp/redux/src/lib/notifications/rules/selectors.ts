import {INotificationRules} from "./types";

export const selectRools = (state: INotificationRules) => state.rules;
export const selectHistory = (state: INotificationRules) => state.history;
export const selectRoolsStatus = (state: INotificationRules) => state.status;
export const selectHistoryId = (state: INotificationRules) => state.lastHistoryId;

// export const selectNotificationId = createSelector(userNotificationValuesSelect, (values) => values.id);
