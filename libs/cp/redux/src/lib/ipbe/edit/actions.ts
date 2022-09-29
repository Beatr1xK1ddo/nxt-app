import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

import {EDataProcessingStatus, ENotificationType, IValidateIpbePayload, NumericId, Optional} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {notificationsActions} from "../../common/notifications";
import {CpRootState, ICpRootState} from "../../types";
import {IIpbeEditState} from "./types";
import {toApiIpbeMapper} from "./utils";
import {IPBE_EDIT_SLICE_NAME} from "./constants";
import {mainActions} from "./main";
import {videoEncoderActions} from "./videoEncoder";
import {audioEncoderActions} from "./audioEncoder";
import {mpegTsMuxerActions} from "./mpegTsMuxer";
import {rtpMuxerActions} from "./rtpMuxer";
import {advancedActions} from "./advanced";
import {editStatusActions} from "./status";
import {commonActions} from "../../common";

export const resetIpbe = createAction(`${IPBE_EDIT_SLICE_NAME}/resetIpbe`);
export const validateIpbe = createAction<IValidateIpbePayload>(`${IPBE_EDIT_SLICE_NAME}/validateAndSaveIpbe`);

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    return await api.ipbe.fetchIpbe(id);
});

export const fetchMainSelectValues = createAsyncThunk(
    `${IPBE_EDIT_SLICE_NAME}/fetchMainSelectValues`,
    async (nodeId: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await api.ipbe.fetchMainSelectValues(nodeId);
    }
);

type RootSelector<R> = (state: CpRootState) => R;
interface IUpdateApiParams {
    name: string;
    selectId: RootSelector<Optional<NumericId>>;
    selectValidStatus: RootSelector<boolean>;
    selectEditState: RootSelector<IIpbeEditState>;
    restart?: boolean;
    duration?: number;
}
export const updateIpbe = createAsyncThunk(
    `${IPBE_EDIT_SLICE_NAME}/updateIpbe`,
    async ({name, selectId, selectValidStatus, selectEditState, restart, duration}: IUpdateApiParams, thunkAPI) => {
        const state = thunkAPI.getState() as ICpRootState;
        const valid = selectValidStatus(state);
        if (valid) {
            const exist = Boolean(selectId(state));
            const ipbe = toApiIpbeMapper(selectEditState(state));
            const apiCall = exist ? api.ipbe.updateIpbe : api.ipbe.createIpbe;
            try {
                const messageBefore = exist
                    ? `Updating SDI to IP encoder ${name}`
                    : ` Creating SDI to IP encoder ${name}`;
                if (!exist) {
                    thunkAPI.dispatch(
                        notificationsActions.add({message: messageBefore, duration: 2000, type: ENotificationType.info})
                    );
                } else {
                    thunkAPI.dispatch(
                        notificationsActions.add({message: messageBefore, duration: 2000, type: ENotificationType.info})
                    );
                }
                const apiIpbe = await apiCall(ipbe, restart);
                const message = exist ? `SDI to IP encoder ${name} updated` : `SDI to IP encoder ${name} created`;
                thunkAPI.dispatch(notificationsActions.add({message, duration}));
                if (!exist) {
                    thunkAPI.dispatch(editStatusActions.setStatus(EDataProcessingStatus.navigateRequired));
                } else {
                    thunkAPI.dispatch(editStatusActions.setStatus(EDataProcessingStatus.succeeded));
                }
                thunkAPI.dispatch(commonActions.applicationActions.setAppFormStatus(false));
                return apiIpbe;
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        } else {
            const message = "Can not save SDI to IP Encoder";
            thunkAPI.dispatch(notificationsActions.add({message, type: ENotificationType.error, duration}));
            return Promise.reject();
        }
    }
);

export const editActions = {
    fetchIpbe,
    updateIpbe,
    fetchMainSelectValues,
    resetIpbe,
    validateIpbe,
    ...mainActions,
    ...videoEncoderActions,
    ...audioEncoderActions,
    ...mpegTsMuxerActions,
    ...rtpMuxerActions,
    ...advancedActions,
    ...editStatusActions,
};
