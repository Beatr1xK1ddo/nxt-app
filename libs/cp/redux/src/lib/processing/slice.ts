import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IProcessingState} from "./types";
import {ipbeListActions, ipbeEditActions, txrListActions} from "../actions";
import {applicationActions} from "../common/applications";

export const PROCESSING_SLICE_NAME = "processing";

const initialState: IProcessingState = {
    generalProcessing: false,
    backgroundProcessing: false,
};

//state slice itself
export const processingSlice = createSlice({
    name: PROCESSING_SLICE_NAME,
    initialState,
    reducers: {
        setGeneralProcessing: (state, action: PayloadAction<boolean>) => {
            state.generalProcessing = action.payload;
        },
        setBackgroundProcessing: (state, action: PayloadAction<boolean>) => {
            state.backgroundProcessing = action.payload;
        },
    },
    //todo: not sure if it's a good idea^ but lets leave it for now
    extraReducers(builder) {
        const {fetchIpbes} = ipbeListActions;
        const {fetchTxrs} = txrListActions;
        const {fetchIpbe, updateIpbe, cloneIpbe} = ipbeEditActions;
        const {changeStatuses, removeApplications} = applicationActions;
        builder
            .addMatcher(isAnyOf(changeStatuses.pending, removeApplications.pending), (state) => {
                state.backgroundProcessing = true;
            })
            .addMatcher(
                isAnyOf(
                    changeStatuses.fulfilled,
                    changeStatuses.rejected,
                    removeApplications.fulfilled,
                    removeApplications.rejected
                ),
                (state) => {
                    state.backgroundProcessing = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    cloneIpbe.pending,
                    fetchIpbes.pending,
                    fetchIpbe.pending,
                    updateIpbe.pending,
                    fetchTxrs.pending
                ),
                (state) => {
                    state.generalProcessing = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    cloneIpbe.fulfilled,
                    cloneIpbe.rejected,
                    fetchIpbes.fulfilled,
                    fetchIpbes.rejected,
                    fetchIpbe.fulfilled,
                    fetchIpbe.rejected,
                    updateIpbe.fulfilled,
                    updateIpbe.rejected,
                    fetchTxrs.fulfilled,
                    fetchTxrs.rejected
                ),
                (state) => {
                    state.generalProcessing = false;
                }
            );
    },
});

//export reducer by default
export default processingSlice.reducer;
