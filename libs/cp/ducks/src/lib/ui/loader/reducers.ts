import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {setLoader} from "./actions";
import {ILoaderState} from "./types";

const defaultState = {
    pageLoading: false,
};

export const changeLoaderReducer = createReducer<ILoaderState>(defaultState, {
    [setLoader.type]: (state, action: PayloadAction<boolean>) => {
        const {payload} = action;
        state.pageLoading = payload;
    },
});
