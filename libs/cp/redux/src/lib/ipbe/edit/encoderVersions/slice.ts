import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import api, {IApiApplicationTypeListItem} from "@nxt-ui/cp/api";
import {IEncoderVersion} from "./types";

export const ENCODER_VERSIONS_SLICE_NAME = "encoderVersion";
type IFetchApplication = {
    nodeId: number;
    application: string;
};
export const fetchEncoderVersions = createAsyncThunk(
    `${ENCODER_VERSIONS_SLICE_NAME}/fetchEncoderVersion`,
    async (data: IFetchApplication) => {
        const {nodeId, application} = data;
        const response = await api.common.fetchApplicationTypes(nodeId, application);
        return response;
    }
);

const initialState: IEncoderVersion = {
    values: [],
    status: EDataProcessingStatus.fetchRequired,
};

export const encoderVersionsSlice = createSlice({
    name: ENCODER_VERSIONS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchEncoderVersions.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchEncoderVersions.fulfilled, (state, action: PayloadAction<IApiApplicationTypeListItem>) => {
                state.status = EDataProcessingStatus.succeeded;
                const keys = Object.keys(action.payload);
                const result = keys.map((key) => ({
                    value: key,
                    key: action.payload[key],
                }));
                state.values = result;
            })
            .addCase(fetchEncoderVersions.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

export default encoderVersionsSlice.reducer;
