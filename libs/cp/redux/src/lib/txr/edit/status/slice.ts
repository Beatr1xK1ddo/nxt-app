import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {fetchTxr, resetTxr, updateTxr} from "../actions";
export const TXR_EDIT_STATUS_SLICE_NAME = "status";

const initialState: string = EDataProcessingStatus.idle;

export const txrEditStatusSlice = createSlice({
    name: TXR_EDIT_STATUS_SLICE_NAME,
    initialState,
    reducers: {
        setStatus(_, action: PayloadAction<EDataProcessingStatus>) {
            return action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetTxr, () => {
                return initialState;
            })
            .addMatcher(isAnyOf(updateTxr.pending, fetchTxr.pending), () => {
                return EDataProcessingStatus.loading;
            })
            .addMatcher(isAnyOf(fetchTxr.fulfilled), () => {
                return EDataProcessingStatus.succeeded;
            })
            .addMatcher(isAnyOf(updateTxr.rejected, fetchTxr.rejected), () => {
                return EDataProcessingStatus.failed;
            });
    },
});

export default txrEditStatusSlice.reducer;
