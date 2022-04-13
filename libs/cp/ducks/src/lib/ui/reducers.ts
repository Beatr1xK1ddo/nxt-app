import { IUiState } from './card-view/types';
import { combineReducers } from '@reduxjs/toolkit';
import { changeCardReducer } from './card-view/reducers';

export const createUiReducer = () =>
    combineReducers<IUiState>({
        cardView: changeCardReducer,
    });
