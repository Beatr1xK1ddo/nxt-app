import api from "@nxt-ui/cp/api";
import {ENotificationType, IChangeStatus, IChangeStatusData, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";
import {IDeleteRequestData, IRemoveIpbe} from "./types";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

const isIRemoveIpbe = (data: IDeleteRequestData): data is IRemoveIpbe => {
    return !Array.isArray(data);
};

const isIChangeStatus = (data: IChangeStatusData): data is IChangeStatus => {
    return Array.isArray(data);
};

const removeIpbes = createAsyncThunk(
    `${IPBE_SLICE_NAME}/removeIpbe`,
    async (data: Array<NumericId> | IRemoveIpbe, thunkAPI) => {
        const arrayOfNnumbers = isIRemoveIpbe(data);
        try {
            let result;
            if (arrayOfNnumbers) {
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
                        message: `Deleting ipbes`,
                    })
                );
                result = await api.ipbe.removeIpbes(data);
                thunkAPI.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Ipbes was removed successfully`,
                    })
                );
            }

            return result;
        } catch (e) {
            if (arrayOfNnumbers) {
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
                        message: `Failed to remove Ipbes`,
                    })
                );
            }

            return e;
        }
    }
);

const changeStatuses = createAsyncThunk(
    `${IPBE_SLICE_NAME}/changeStatus`,
    async (data: IChangeStatusData, thunkApi) => {
        const arrayOfStatuses = isIChangeStatus(data);
        try {
            let result;
            if (arrayOfStatuses) {
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Chaning ipbes statuses`,
                    })
                );
                result = await api.ipbe.changeStatuses(data);
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Ipbes statuses was changed successfully`,
                    })
                );
            } else {
                const {name, ...rest} = data;
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `Changing ${name} status`,
                    })
                );
                result = await api.ipbe.changeStatuses([rest]);
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.info,
                        message: `${name} status was changed successfully`,
                    })
                );
            }

            return result;
        } catch (e) {
            if (arrayOfStatuses) {
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to change statuses`,
                    })
                );
            } else {
                thunkApi.dispatch(
                    notificationsActions.add({
                        type: ENotificationType.error,
                        message: `Failed to change ${data.name} status`,
                    })
                );
            }

            return e;
        }
    }
);

export const ipbeCommonActions = {
    removeIpbes,
    changeStatuses,
};
