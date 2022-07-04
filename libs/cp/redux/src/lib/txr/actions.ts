import api from "@nxt-ui/cp/api";
import {ENotificationType, IChangeStatus, IChangeStatuses, IChangeStatusData, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications";
import {TXR_SLICE_NAME} from "./constants";
import {IDeleteRequestData, IRemoveTxr} from "./types";

export {txrListActions} from "./list";
export {txrEditActions} from "./edit";

const isIRemoveTxrPayload = (data: IDeleteRequestData): data is IRemoveTxr => {
    return !Array.isArray(data);
};

const isIChangeStatusesPayload = (data: IChangeStatus | IChangeStatuses): data is IChangeStatuses => {
    return Array.isArray(data);
};

const removeTxrs = createAsyncThunk(
    `${TXR_SLICE_NAME}/removeTxr`,
    async (data: Array<NumericId> | IRemoveTxr, thunkAPI) => {
        const arrayOfNumbers = isIRemoveTxrPayload(data);
        try {
            let result;
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting txr: ${data.name}`,
                    })
                );
                result = await api.txr.removeItem([data.id]);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Txr ${data.name} was removed successfully`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Deleting ${data.length > 1 ? "txrs" : "txr"}`,
                    })
                );
                result = await api.txr.removeItem(data);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `${data.length > 1 ? "Txrs were" : "Txr was"} removed successfully`,
                    })
                );
            }

            return result;
        } catch (e) {
            if (arrayOfNumbers) {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove Txr: ${data.name}`,
                    })
                );
            } else {
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to remove ${data.length > 1 ? "txrs" : "txr"}`,
                    })
                );
            }

            return e;
        }
    }
);

const changeStatuses = createAsyncThunk(
    `${TXR_SLICE_NAME}/changeStatus`,
    async ({statuses, withMessage}: IChangeStatusData, thunkApi) => {
        const arrayOfStatuses = isIChangeStatusesPayload(statuses);
        try {
            let newStatuses;
            if (arrayOfStatuses) {
                const message = `Changing ${statuses.length > 1 ? `${statuses.length} statuses` : "status"}`;
                thunkApi.dispatch(notificationsActions.add({message}));
                newStatuses = statuses;
            } else {
                newStatuses = [statuses];
            }
            return await api.common.changeStatuses(newStatuses);
        } catch (e) {
            const message = arrayOfStatuses && `Failed to change ${statuses.length > 1 ? "statuses" : "status"}`;
            if (message) {
                thunkApi.dispatch(notificationsActions.add({message}));
            }
            return e;
        }
    }
);

export const txrCommonActions = {
    removeTxrs,
    changeStatuses,
};
