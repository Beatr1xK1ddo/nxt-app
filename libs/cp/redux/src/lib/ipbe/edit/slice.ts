import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDataProcessingStatus, NumericId} from "@nxt-ui/cp/types";
import api, {IApiIpbe} from "@nxt-ui/cp/api";
import {ICpRootState} from "../../types";
import {createUpdateIpbeMapper} from "./utils";

export const IPBE_EDIT_SLICE_NAME = "edit";

export const initialState: string = EDataProcessingStatus.fetchRequired;

export const fetchIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/fetchIpbe`, async (id: NumericId) => {
    const response = await api.ipbe.fetchIpbe(id);
    return response;
});

export const updateIpbe = createAsyncThunk(`${IPBE_EDIT_SLICE_NAME}/updateIpbe`, async (_, payloadCreator) => {
    const state = payloadCreator.getState() as ICpRootState;
    const result = createUpdateIpbeMapper(state.ipbe.edit);
    console.log("result", result);
    // const response = await api.ipbe.updateIpbe();
    // return response;
    return 11;
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
        builder.addCase(updateIpbe.pending, () => {
            return EDataProcessingStatus.loading;
        });
        builder.addCase(updateIpbe.fulfilled, () => {
            return EDataProcessingStatus.succeeded;
        });
        builder.addCase(updateIpbe.rejected, () => {
            return EDataProcessingStatus.failed;
        });
    },
});

export default ipbeEditFormSlice.reducer;
