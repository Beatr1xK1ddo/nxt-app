import api from "@nxt-ui/cp/api";
import {EAppType, ENotificationType, IChangeStatusData, IRemoveApp, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../notifications";

export const changeStatuses = createAsyncThunk(
    `changeStatus`,
    async ({statuses, withMessage, appType}: IChangeStatusData, thunkApi) => {
        const arrayOfStatuses = Array.isArray(statuses);
        try {
            let newStatuses;
            if (arrayOfStatuses) {
                const message = `Changing ${statuses.length > 1 ? `${statuses.length} statuses` : "status"}`;
                thunkApi.dispatch(notificationsActions.add({message}));
                newStatuses = statuses;
            } else {
                newStatuses = [statuses];
            }
            return await api.common.changeStatuses(newStatuses, appType);
        } catch (e) {
            const message = arrayOfStatuses && `Failed to change ${statuses.length > 1 ? "statuses" : "status"}`;
            if (message) {
                thunkApi.dispatch(notificationsActions.add({message}));
            }
            return e;
        }
    }
);

export const removeApplications = createAsyncThunk(
    `removeApplications`,
    async ({data, appType}: {data: Array<NumericId> | IRemoveApp; appType: EAppType}, thunkAPI) => {
        const arrayOfNumbers = Array.isArray(data);
        try {
            let result;
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting ${data.length > 1 ? `${appType}s` : appType}`,
                    })
                );
                result = await api[appType].removeItems(data);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `${data.length > 1 ? `${appType}s were` : `${appType} was`} removed successfully`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting txr: ${data.name}`,
                    })
                );
                result = await api[appType].removeItems([data.id]);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `${appType} ${data.name} was removed successfully`,
                    })
                );
            }

            return result;
        } catch (e) {
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove ${data.length > 1 ? `${appType}s` : appType}`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove ${appType}: ${data.name}`,
                    })
                );
            }

            return e;
        }
    }
);