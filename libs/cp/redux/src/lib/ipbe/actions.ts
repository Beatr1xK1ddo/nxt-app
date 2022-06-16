import api from "@nxt-ui/cp/api";
import {ENotificationType, IChangeStatus, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

type IRemoveIpbe = {
    id: NumericId;
    name: string;
};
const removeIpbes = createAsyncThunk(`${IPBE_SLICE_NAME}/removeIpbe`, async (data: Array<NumericId>, thunkAPI) => {
    thunkAPI.dispatch(
        notificationsActions.add({
            type: ENotificationType.info,
            message: `Deleting ipbes`,
        })
    );
    try {
        const result = await api.ipbe.removeIpbes(data);
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.info,
                message: `Ipbes was removed successfully`,
            })
        );
        return result;
    } catch (e) {
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.error,
                message: `Failed to remove Ipbes`,
            })
        );
        return e;
    }
});

const changeStatuses = createAsyncThunk(`${IPBE_SLICE_NAME}/changeStatus`, async (data: IChangeStatus) => {
    try {
        const result = await api.ipbe.changeStatuses(data);
        return result;
    } catch (e) {
        console.log("error in changeStatus", e);
        return e;
    }
});

export const ipbeCommonActions = {
    removeIpbes,
    changeStatuses,
};
