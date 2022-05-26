import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus, NumericId} from "@nxt-ui/cp/types";
import api, {IApiIpbe} from "@nxt-ui/cp/api";

export const IPBE_EDIT_SLICE_NAME = "ipbe-edit";

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
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state = EDataProcessingStatus.succeeded;
        });
        builder.addCase(fetchIpbe.pending, (state) => {
            state = EDataProcessingStatus.loading;
        });
        builder.addCase(fetchIpbe.rejected, (state) => {
            state = EDataProcessingStatus.failed;
        });
    },
});

export default ipbeEditFormSlice.reducer;
