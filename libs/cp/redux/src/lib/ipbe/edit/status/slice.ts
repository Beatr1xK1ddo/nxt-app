import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice} from "@reduxjs/toolkit";
import {createIpbe, fetchIpbe, resetIpbe, updateIpbe, validateIpbe} from "../actions";

export const IPBE_EDIT_STATUS_SLICE_NAME = "status";

const initialState: string = EDataProcessingStatus.fetchRequired;

export const ipbeEditStatusSlice = createSlice({
    name: IPBE_EDIT_STATUS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(validateIpbe, () => {
                return EDataProcessingStatus.try;
            })
            .addCase(createIpbe.fulfilled, () => {
                return EDataProcessingStatus.succeeded;
            })
            .addCase(createIpbe.rejected, () => {
                return EDataProcessingStatus.failed;
            })
            .addCase(updateIpbe.fulfilled, () => {
                return EDataProcessingStatus.succeeded;
            })
            .addCase(updateIpbe.rejected, () => {
                return EDataProcessingStatus.failed;
            })
            .addCase(fetchIpbe.pending, () => {
                return EDataProcessingStatus.loading;
            })
            .addCase(fetchIpbe.fulfilled, () => {
                return EDataProcessingStatus.succeeded;
            })
            .addCase(fetchIpbe.rejected, () => {
                return EDataProcessingStatus.failed;
            });
    },
});

export default ipbeEditStatusSlice.reducer;
