import { combineReducers } from '@reduxjs/toolkit';
import { IRootState } from './types';
import { createUiReducer } from './ui/reducers';

export const rootReducer = () =>
    combineReducers<IRootState>({
        ui: createUiReducer(),
    });
