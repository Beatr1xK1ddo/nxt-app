import api from "@nxt-ui/cp/api";
import {ENotificationType, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {notificationsActions} from "../common/notifications/";
import {IPBE_SLICE_NAME} from "./constants";

export {ipbeListActions} from "./list";
export {ipbeEditActions} from "./edit";

const removeIpbe = createAsyncThunk(`${IPBE_SLICE_NAME}/removeIpbe`, async (id: NumericId, thunkAPI) => {
    try {
        const result = await api.ipbe.removeIpbe(id);
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.info,
                message: "Ipbe was removed successfuly",
            })
        );
        return result;
    } catch (e) {
        thunkAPI.dispatch(
            notificationsActions.add({
                type: ENotificationType.error,
                message: "Ipbe was removed successfuly",
            })
        );
        return e;
    }
});

export const ipbeCommonActions = {
    removeIpbe,
};
