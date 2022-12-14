import {INotificationRules} from "./types";

export const selectRools = (state: INotificationRules) => state.rules;
export const selectHistory = (state: INotificationRules) => state.history.values;
export const selectRoolsStatus = (state: INotificationRules) => state.status;
export const selectHistoryId = (state: INotificationRules) => state.history.lastHistoryId;
export const selectHistoryProcess = (state: INotificationRules) => state.history.process;

// export const selectNotificationId = createSelector(userNotificationValuesSelect, (values) => values.id);
