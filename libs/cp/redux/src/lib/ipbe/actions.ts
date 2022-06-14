import api from "@nxt-ui/cp/api";
import {ENotificationType, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

type IRemoveIpbe = {
    id: NumericId;
    name: string;
};
const removeIpbe = createAsyncThunk(`${IPBE_SLICE_NAME}/removeIpbe`, async (data: IRemoveIpbe, thunkAPI) => {
    thunkAPI.dispatch(
        notificationsActions.add({
            type: ENotificationType.info,
            message: `Deleting ipbe ${data.name}.`,
        })
    );
    try {
        const result = await api.ipbe.removeIpbe(data.id);
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.info,
                message: `${data.name} removed successfully`,
            })
        );
        return result;
    } catch (e) {
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.error,
                message: `Failed to remove ${data.name}`,
            })
        );
        return e;
    }
});

export const ipbeCommonActions = {
    removeIpbe,
};
