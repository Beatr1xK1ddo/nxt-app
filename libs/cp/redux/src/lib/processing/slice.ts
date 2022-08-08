import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProcessingState} from "./types";
import {ipbeListActions, ipbeEditActions, txrListActions} from "../actions";

export const PROCESSING_SLICE_NAME = "processing";

const initialState: IProcessingState = {
    generalProcessing: false,
};

//state slice itself
export const processingSlice = createSlice({
    name: PROCESSING_SLICE_NAME,
    initialState,
    reducers: {
        setGeneralProcessing: (state, action: PayloadAction<boolean>) => {
            state.generalProcessing = action.payload;
        },
    },
    //todo: not sure if it's a good idea^ but lets leave it for now
    extraReducers(builder) {
        builder
            //todo kan: refactor with addMatcher
            .addCase(ipbeEditActions.cloneIpbes.pending, (state) => {
                state.generalProcessing = true;
            })
            .addCase(ipbeEditActions.cloneIpbes.fulfilled, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeEditActions.cloneIpbes.rejected, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeListActions.fetchIpbes.pending, (state) => {
                state.generalProcessing = true;
            })
            .addCase(ipbeListActions.fetchIpbes.fulfilled, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeListActions.fetchIpbes.rejected, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeEditActions.fetchIpbe.pending, (state) => {
                state.generalProcessing = true;
            })
            .addCase(ipbeEditActions.fetchIpbe.fulfilled, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeEditActions.fetchIpbe.rejected, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeEditActions.updateIpbe.pending, (state) => {
                state.generalProcessing = true;
            })
            .addCase(ipbeEditActions.updateIpbe.fulfilled, (state) => {
                state.generalProcessing = false;
            })
            .addCase(ipbeEditActions.updateIpbe.rejected, (state) => {
                state.generalProcessing = false;
            })

            // refactor this
            .addCase(txrListActions.fetchTxrs.pending, (state) => {
                state.generalProcessing = true;
            })
            .addCase(txrListActions.fetchTxrs.fulfilled, (state) => {
                state.generalProcessing = false;
            })
            .addCase(txrListActions.fetchTxrs.rejected, (state) => {
                state.generalProcessing = false;
            });
    },
});

//export reducer by default
export default processingSlice.reducer;
