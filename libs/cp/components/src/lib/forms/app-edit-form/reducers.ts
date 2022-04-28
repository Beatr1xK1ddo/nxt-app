import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IFormProps } from "./types";

export const initialState: IFormProps = {};

export const setInitialState = createAction<IFormProps>('SET_INITIAL_STATE');

export const changeCompany = createAction<number>('CHANGE_COMPANY');

export const changeNode = createAction<number>('CHANGE_NODE');

export const changeName = createAction<string>('CHANGE_NAME');

export const reducer = createReducer<IFormProps>(initialState, {
    [setInitialState.type]: (_, action: PayloadAction<IFormProps>) => action.payload,
    [changeName.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state.name = payload;
    },
});