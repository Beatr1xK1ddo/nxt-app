import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EDataProcessingStatus, NumericId} from "@nxt-ui/cp/types";
import api, {IApiIpbe} from "@nxt-ui/cp/api";
import {createIpbe, updateIpbe} from "./actions";

export const IPBE_EDIT_SLICE_NAME = "edit";

export const initialState: string = EDataProcessingStatus.fetchRequired;

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    const response = await api.ipbe.fetchIpbe(id);
    return response;
});

export const ipbeEditFormSlice = createSlice({
    name: IPBE_EDIT_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchIpbe.fulfilled, () => {
            return EDataProcessingStatus.succeeded;
        });
        builder.addCase(fetchIpbe.pending, () => {
            return EDataProcessingStatus.loading;
        });
        builder.addCase(fetchIpbe.rejected, () => {
            return EDataProcessingStatus.failed;
        });
        builder.addCase(updateIpbe.pending, () => {
            return EDataProcessingStatus.loading;
        });
        builder.addCase(updateIpbe.fulfilled, () => {
            return EDataProcessingStatus.succeeded;
        });
        builder.addCase(updateIpbe.rejected, () => {
            return EDataProcessingStatus.failed;
        });
        builder.addCase(createIpbe.pending, () => {
            return EDataProcessingStatus.loading;
        });
        builder.addCase(createIpbe.fulfilled, () => {
            return EDataProcessingStatus.succeeded;
        });
        builder.addCase(createIpbe.rejected, () => {
            return EDataProcessingStatus.failed;
        });
    },
});

export default ipbeEditFormSlice.reducer;
