import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProcessingState} from "./types";
import {ipbeListActions} from "../actions";
import {ipbeEditActions} from "../ipbe/edit";

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
            });
    },
});

//export reducer by default
export default processingSlice.reducer;
