import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus, EErrorType, NumericId} from "@nxt-ui/cp/types";
import api, {IApiIpbe} from "@nxt-ui/cp/api";
import {IIpbeEditGeneralState} from "./types";

export const IPBE_EDIT_SLICE_NAME = "ipbe-edit";

export const initialState: IIpbeEditGeneralState = {
    status: EDataProcessingStatus.fetchRequired,
    fetchError: {error: false},
};

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
            state.status = EDataProcessingStatus.succeeded;
        });
        builder.addCase(fetchIpbe.pending, (state) => {
            state.status = EDataProcessingStatus.loading;
        });
        builder.addCase(fetchIpbe.rejected, (state) => {
            state.status = EDataProcessingStatus.failed;
            state.fetchError.error = true;
            state.fetchError.helperText = EErrorType.requestFailed;
        });
    },
});

export default ipbeEditFormSlice.reducer;
