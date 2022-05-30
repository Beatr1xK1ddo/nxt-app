import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import api, {IApiApplicationTypeListItem} from "@nxt-ui/cp/api";

import {IApplicationTypeState} from "./types";

export const APPLICATION_TYPE_SLICE_NAME = "applicationTypes";
type IFetchApplication = {
    nodeId: number;
    application: string;
};
export const fetchApplicationTypes = createAsyncThunk(
    `${APPLICATION_TYPE_SLICE_NAME}/fetchApplicationTypes`,
    async (data: IFetchApplication) => {
        const {nodeId, application} = data;
        const response = await api.common.fetchApplicationTypes(nodeId, application);
        return response;
    }
);

const initialState: IApplicationTypeState = {
    values: [],
    status: EDataProcessingStatus.fetchRequired,
};

export const applicationTypeSlice = createSlice({
    name: APPLICATION_TYPE_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchApplicationTypes.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchApplicationTypes.fulfilled, (state, action: PayloadAction<IApiApplicationTypeListItem>) => {
                state.status = EDataProcessingStatus.succeeded;
                const keys = Object.keys(action.payload);
                const result = keys.map((key) => ({
                    value: key,
                    key: action.payload[key],
                }));
                state.values = result;
            })
            .addCase(fetchApplicationTypes.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

export default applicationTypeSlice.reducer;
