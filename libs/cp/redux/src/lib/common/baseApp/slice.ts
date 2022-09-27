import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBaseAppState} from "./types";
export const BASE_APP_SLICE_NAME = "baseApp";

const initialState: IBaseAppState = {
    tabVisible: true,
};

export const baseAppSlice = createSlice({
    name: BASE_APP_SLICE_NAME,
    initialState,
    reducers: {
        setTabVisible(state, action: PayloadAction<boolean>) {
            state.tabVisible = action.payload;
        },
    },
});

export default baseAppSlice.reducer;
