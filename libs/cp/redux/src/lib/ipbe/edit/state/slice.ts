import {EStateTypes} from "@nxt-ui/cp/types";
import {createSlice} from "@reduxjs/toolkit";
import {createIpbe, resetIpbe, updateIpbe} from "../actions";

export const IPBE_EDIT_STATE_SLICE_NAME = "state";

const initialState = EStateTypes.empty as string;

export const ipbeEditStateSlice = createSlice({
    name: IPBE_EDIT_STATE_SLICE_NAME,
    initialState,
    reducers: {
        reset() {
            return EStateTypes.empty;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(resetIpbe, () => {
                return initialState;
            })
            .addCase(createIpbe.rejected, () => {
                return EStateTypes.failed;
            })
            .addCase(createIpbe.fulfilled, () => {
                return EStateTypes.success;
            })
            .addCase(createIpbe.pending, () => {
                return EStateTypes.processing;
            })
            .addCase(updateIpbe.pending, () => {
                return EStateTypes.processing;
            })
            .addCase(updateIpbe.rejected, () => {
                return EStateTypes.failed;
            })
            .addCase(updateIpbe.fulfilled, () => {
                return EStateTypes.success;
            });
    },
});

export default ipbeEditStateSlice.reducer;
