import api from "@nxt-ui/cp/api";
import {EAppType, ENotificationType, IChangeStatusData, IRemoveApp, NumericId} from "@nxt-ui/cp/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {notificationsActions} from "../notifications";
import {IApplicationsState} from "./types";
export const APPLICATIONS_SLICE_NAME = "applications";

export const cloneIpbes = createAsyncThunk(
    `${APPLICATIONS_SLICE_NAME}/cloneIpbes`,
    async (ids: Array<NumericId>, thunkApi) => {
        try {
            const message = `Try to clone ${ids.length > 1 ? `apps with ids ${ids}` : `app with id ${ids[0]}`}`;
            thunkApi.dispatch(notificationsActions.add({message, duration: 2000}));
            return await api.ipbe.cloneIpbe(ids);
        } catch (e) {
            const message = `Can not clone ${ids.length > 1 ? `apps with ids ${ids}` : `app with id ${ids[0]}`}`;
            thunkApi.dispatch(notificationsActions.add({message, duration: 2000, type: ENotificationType.error}));
            return e;
        }
    }
);
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
                if (appType === EAppType.IPBE) {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `Removing ${data.length > 1 ? "SDI to IP encoders" : "SDI to IP encoder"}`,
                        })
                    );
                    result = await api.ipbe.removeItems(data);
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `${
                                data.length > 1 ? "SDI to IP encoders were " : "SDI to IP encoder was"
                            } removed successfully`,
                        })
                    );
                } else {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `Removing ${data.length > 1 ? "Transfers" : "Transfer"}`,
                        })
                    );
                    result = await api.txr.removeItems(data);
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `${data.length > 1 ? "Transfers were " : "Transfer was"} removed successfully`,
                        })
                    );
                }
            } else {
                if (appType === EAppType.IPBE) {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `Deleting SDI to IP encoder: ${data.name}`,
                        })
                    );
                    result = await api.ipbe.removeItems([data.id]);
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `SDI to IP encoder ${data.name} was removed successfully`,
                        })
                    );
                } else {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `Deleting Transfer: ${data.name}`,
                        })
                    );
                    result = await api.txr.removeItems([data.id]);
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.info,
                            message: `Transfer ${data.name} was removed successfully`,
                        })
                    );
                }
            }
            return result;
        } catch (e) {
            if (arrayOfNumbers) {
                if (appType === EAppType.IPBE) {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.error,
                            message: `Failed to remove SDI to IP encoders`,
                        })
                    );
                } else {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.error,
                            message: `Failed to remove Transfers`,
                        })
                    );
                }
            } else {
                if (appType === EAppType.IPBE) {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.error,
                            message: `Failed to remove SDI to IP encoder: ${data.name}`,
                        })
                    );
                } else {
                    thunkAPI.dispatch(
                        notificationsActions.add({
                            type: ENotificationType.error,
                            message: `Failed to remove Transfer: ${data.name}`,
                        })
                    );
                }
            }
            return e;
        }
    }
);

const initialState: IApplicationsState = {
    selectedApps: [],
};

export const applicationsSlice = createSlice({
    name: APPLICATIONS_SLICE_NAME,
    initialState,
    reducers: {
        setSelectedApplications(state, action: PayloadAction<number>) {
            state.selectedApps.push(action.payload);
        },
        removeSelectedApplications(state, action: PayloadAction<number>) {
            state.selectedApps = state.selectedApps.filter((id) => id !== action.payload);
        },
        removeAllSelectedApplications(state) {
            state.selectedApps = [];
        },
    },
});

export default applicationsSlice.reducer;
