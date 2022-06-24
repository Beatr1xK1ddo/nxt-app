import api from "@nxt-ui/cp/api";
import {ENotificationType, IChangeStatus, IChangeStatuses, IChangeStatusData, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";
import {IDeleteRequestData, IRemoveIpbe} from "./types";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

const isIRemoveIpbePayload = (data: IDeleteRequestData): data is IRemoveIpbe => {
    return !Array.isArray(data);
};

const isIChangeStatusesPayload = (data: IChangeStatus | IChangeStatuses): data is IChangeStatuses => {
    return Array.isArray(data);
};

const removeIpbes = createAsyncThunk(
    `${IPBE_SLICE_NAME}/removeIpbe`,
    async (data: Array<NumericId> | IRemoveIpbe, thunkAPI) => {
        const arrayOfNumbers = isIRemoveIpbePayload(data);
        try {
            let result;
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting ipbe: ${data.name}`,
                    })
                );
                result = await api.ipbe.removeIpbes([data.id]);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Ipbe ${data.name} was removed successfully`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting ${data.length > 1 ? "ipbes" : "ipbe"}`,
                    })
                );
                result = await api.ipbe.removeIpbes(data);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `${data.length > 1 ? "Ipbes were" : "Ipbe was"} removed successfully`,
                    })
                );
            }

            return result;
        } catch (e) {
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove Ipbe: ${data.name}`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove ${data.length > 1 ? "ipbes" : "ipbe"}`,
                    })
                );
            }

            return e;
        }
    }
);

const changeStatuses = createAsyncThunk(
    `${IPBE_SLICE_NAME}/changeStatus`,
    async ({statuses, withMessages}: IChangeStatusData, thunkApi) => {
        const arrayOfStatuses = isIChangeStatusesPayload(statuses);
        try {
            let newStatuses;
            if (arrayOfStatuses) {
                if (withMessages) {
                    const message = `Changing ${statuses.length > 1 ? `${statuses.length} statuses` : "status"}`;
                    thunkApi.dispatch(notificationsActions.add({message}));
                }
                newStatuses = statuses;
            } else {
                const {name, ...status} = statuses;
                if (withMessages) {
                    thunkApi.dispatch(notificationsActions.add({message: `Changing ${name} status`}));
                }
                newStatuses = [status];
            }
            return await api.ipbe.changeStatuses(newStatuses);
        } catch (e) {
            const message = arrayOfStatuses
                ? `Failed to change ${statuses.length > 1 ? "statuses" : "status"}`
                : `Failed to change ${statuses.name} status`;
            thunkApi.dispatch(notificationsActions.add({message}));
            return e;
        }
    }
);

export const ipbeCommonActions = {
    removeIpbes,
    changeStatuses,
};
