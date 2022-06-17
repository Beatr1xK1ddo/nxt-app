import api from "@nxt-ui/cp/api";
import {ENotificationType, IChangeStatus, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";
import {IDeleteRequestData, IRemoveIpbe} from "./types";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

const isIRemoveIpbe = (data: IDeleteRequestData): data is IRemoveIpbe => {
    return !Array.isArray(data);
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

const changeStatuses = createAsyncThunk(`${IPBE_SLICE_NAME}/changeStatus`, async (data: IChangeStatus) => {
    try {
        const result = await api.ipbe.changeStatuses(data);
        return result;
    } catch (e) {
        return e;
    }
});

export const ipbeCommonActions = {
    removeIpbes,
    changeStatuses,
};
