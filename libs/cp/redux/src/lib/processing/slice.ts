import {createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";

import {IProcessingState} from "./types";
import {ipbeListActions, ipbeEditActions, txrListActions} from "../actions";
import {applicationActions} from "../common/applications";
import {createNotification} from "../notifications/form/slices";
import {deleteNotificationsRule, getNotificationsRules} from "../notifications/rules/slices";

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
    extraReducers(builder) {
        const {fetchIpbes} = ipbeListActions;
        const {fetchTxrs} = txrListActions;
        const {fetchIpbe, updateIpbe} = ipbeEditActions;
        const {changeStatuses, removeApplications, cloneApplications} = applicationActions;
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
                    cloneApplications.pending,
                    fetchIpbes.pending,
                    fetchIpbe.pending,
                    updateIpbe.pending,
                    fetchTxrs.pending,
                    createNotification.pending,
                    deleteNotificationsRule.pending,
                    getNotificationsRules.pending
                ),
                (state) => {
                    state.generalProcessing = true;
                }
            )
            .addMatcher(
                isAnyOf(
                    cloneApplications.fulfilled,
                    cloneApplications.rejected,
                    fetchIpbes.fulfilled,
                    fetchIpbes.rejected,
                    fetchIpbe.fulfilled,
                    fetchIpbe.rejected,
                    updateIpbe.fulfilled,
                    updateIpbe.rejected,
                    fetchTxrs.fulfilled,
                    fetchTxrs.rejected,
                    createNotification.fulfilled,
                    createNotification.rejected,
                    deleteNotificationsRule.fulfilled,
                    deleteNotificationsRule.rejected,
                    getNotificationsRules.fulfilled,
                    getNotificationsRules.rejected
                ),
                (state) => {
                    state.generalProcessing = false;
                }
            );
    },
});

//export reducer by default
export default processingSlice.reducer;
