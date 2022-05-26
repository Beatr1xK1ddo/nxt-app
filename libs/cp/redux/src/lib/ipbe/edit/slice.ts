import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus, NumericId} from "@nxt-ui/cp/types";
import api, {IApiIpbe} from "@nxt-ui/cp/api";

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
        builder.addCase(fetchIpbe.fulfilled, (state, action: PayloadAction<IApiIpbe>) => {
            state = EDataProcessingStatus.succeeded;
            return state;
        });
        builder.addCase(fetchIpbe.pending, (state) => {
            state = EDataProcessingStatus.loading;
            return state;
        });
        builder.addCase(fetchIpbe.rejected, (state) => {
            state = EDataProcessingStatus.failed;
            return state;
        });
    },
});

export default ipbeEditFormSlice.reducer;
