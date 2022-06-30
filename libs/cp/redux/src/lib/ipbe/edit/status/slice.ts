import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {fetchIpbe, resetIpbe, updateIpbe} from "../actions";
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
            .addMatcher(isAnyOf(updateIpbe.pending, fetchIpbe.pending), () => {
                return EDataProcessingStatus.loading;
            })
            .addMatcher(isAnyOf(updateIpbe.fulfilled, fetchIpbe.fulfilled), () => {
                return EDataProcessingStatus.succeeded;
            })
            .addMatcher(isAnyOf(updateIpbe.rejected, fetchIpbe.rejected), () => {
                return EDataProcessingStatus.failed;
            });
    },
});

export default ipbeEditStatusSlice.reducer;
