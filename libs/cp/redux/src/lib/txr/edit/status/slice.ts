import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {fetchTxr, resetTxr, updateTxr} from "../actions";
export const TXR_EDIT_STATUS_SLICE_NAME = "status";

const initialState: string = EDataProcessingStatus.fetchRequired;

export const txrEditStatusSlice = createSlice({
    name: TXR_EDIT_STATUS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addMatcher(isAnyOf(updateTxr.pending, fetchTxr.pending), () => {
                return EDataProcessingStatus.loading;
            })
            .addMatcher(isAnyOf(updateTxr.fulfilled, fetchTxr.fulfilled), () => {
                return EDataProcessingStatus.succeeded;
            })
            .addMatcher(isAnyOf(updateTxr.rejected, fetchTxr.rejected), () => {
                return EDataProcessingStatus.failed;
            });
    },
});

export default txrEditStatusSlice.reducer;
