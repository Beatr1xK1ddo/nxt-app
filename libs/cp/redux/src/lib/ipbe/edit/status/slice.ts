import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchIpbe, resetIpbe} from "../actions";

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
