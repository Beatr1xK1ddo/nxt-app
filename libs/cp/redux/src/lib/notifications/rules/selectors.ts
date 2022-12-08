import {INotificationRules} from "./types";

export const selectRools = (state: INotificationRules) => state.rules;
export const selectRoolsStatus = (state: INotificationRules) => state.status;

// export const selectNotificationId = createSelector(userNotificationValuesSelect, (values) => values.id);
