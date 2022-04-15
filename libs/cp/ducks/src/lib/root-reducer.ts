import { combineReducers } from '@reduxjs/toolkit';
import { changeFilterReducer } from './filter/reducers';
import { IRootState } from './types';
import { createUiReducer } from './ui/reducers';

export const rootReducer = () =>
    combineReducers<IRootState>({
        ui: createUiReducer(),
        filter: changeFilterReducer,
    });
