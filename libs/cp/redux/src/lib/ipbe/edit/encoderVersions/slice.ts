import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import api, {IApiApplicationTypeListItem} from "@nxt-ui/cp/api";
import {IEncoderVersion} from "./types";
import {resetIpbe} from "../actions";

export const ENCODER_VERSIONS_SLICE_NAME = "encoderVersion";
type IFetchApplication = {
    nodeId: number;
    application: string;
};
export const fetchEncoderVersions = createAsyncThunk(
    `${ENCODER_VERSIONS_SLICE_NAME}/fetchEncoderVersion`,
    async (data: IFetchApplication) => {
        const {nodeId, application} = data;
        return await api.common.fetchApplicationTypes(nodeId, application);
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
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(fetchEncoderVersions.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchEncoderVersions.fulfilled, (state, action: PayloadAction<IApiApplicationTypeListItem>) => {
                state.status = EDataProcessingStatus.succeeded;
                const keys = Object.keys(action.payload);
                state.values = keys.map((key) => ({
                    value: key,
                    key: action.payload[key],
                }));
            })
            .addCase(fetchEncoderVersions.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

export default encoderVersionsSlice.reducer;
