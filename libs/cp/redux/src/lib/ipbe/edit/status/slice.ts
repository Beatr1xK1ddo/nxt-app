import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchIpbe} from "../actions";

export const IPBE_EDIT_STATUS_SLICE_NAME = "status";

const initialState: string = EDataProcessingStatus.fetchRequired;

export const ipbeEditStatusSlice = createSlice({
    name: IPBE_EDIT_STATUS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchIpbe.pending, (state) => {
            return EDataProcessingStatus.loading;
        });
        builder.addCase(fetchIpbe.fulfilled, (state) => {
            return EDataProcessingStatus.succeeded;
        });
        builder.addCase(fetchIpbe.rejected, (state) => {
            return EDataProcessingStatus.failed;
        });
    },
});

export default ipbeEditStatusSlice.reducer;
