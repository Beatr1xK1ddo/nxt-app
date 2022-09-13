import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

import {EDataProcessingStatus, NumericId, Optional} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {notificationsActions} from "../../common/notifications";
import {CpRootState, ICpRootState} from "../../types";
import {ITxrEditState} from "./types";
import {toApiTxrMapper} from "./utils";
import {TXR_EDIT_SLICE_NAME} from "./constants";
import {mainActions} from "./main";
import {editStatusTxrActions} from "./status";

export const resetTxr = createAction(`${TXR_EDIT_SLICE_NAME}/resetTxr`);
export const validateTxr = createAction(`${TXR_EDIT_SLICE_NAME}/validateAndSaveTxr`);

export const fetchTxr = createAsyncThunk(`${TXR_EDIT_SLICE_NAME}/fetchTxr`, async (id: NumericId) => {
    return await api.txr.getItem(id);
});

export const getTemplateSelectedValues = createAsyncThunk(
    `${TXR_EDIT_SLICE_NAME}/getTemplateSelectedValues`,
    async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await api.txr.getTemplateSelectedValues();
    }
);

export const getTemplateFromNodes = createAsyncThunk(
    `${TXR_EDIT_SLICE_NAME}/getTemplateFromNodes`,
    async ({txNodeId, rxNodeId}: {txNodeId: number; rxNodeId: number}) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await api.txr.getTemplateFromNodes(txNodeId, rxNodeId);
    }
);

type RootSelector<R> = (state: CpRootState) => R;
interface IUpdateApiParams {
    name: string;
    selectId: RootSelector<Optional<NumericId>>;
    selectValidStatus: RootSelector<boolean>;
    selectEditState: RootSelector<ITxrEditState>;
    restart?: boolean;
}
export const updateTxr = createAsyncThunk(
    `${TXR_EDIT_SLICE_NAME}/updateTxr`,
    async ({name, selectId, selectValidStatus, selectEditState, restart}: IUpdateApiParams, thunkAPI) => {
        const state = thunkAPI.getState() as ICpRootState;
        const valid = selectValidStatus(state);
        if (valid) {
            const exist = Boolean(selectId(state));
            const txr = toApiTxrMapper(selectEditState(state));
            const apiCall = exist ? api.txr.updateItem : api.txr.createItem;
            const message = exist ? `SDI to IP encoder ${name} updated` : `SDI to IP encoder ${name} created`;
            try {
                const apiTxr = await apiCall(txr, restart);
                thunkAPI.dispatch(notificationsActions.add({message}));
                if (!exist) {
                    thunkAPI.dispatch(editStatusTxrActions.setStatus(EDataProcessingStatus.navigateRequired));
                } else {
                    thunkAPI.dispatch(editStatusTxrActions.setStatus(EDataProcessingStatus.succeeded));
                }
                return apiTxr;
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        } else {
            return Promise.reject();
        }
    }
);

export const editActions = {
    fetchTxr,
    updateTxr,
    getTemplateSelectedValues,
    getTemplateFromNodes,
    resetTxr,
    validateTxr,
    ...mainActions,
};
