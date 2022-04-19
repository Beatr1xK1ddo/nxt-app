import { combineReducers } from '@reduxjs/toolkit';
import { changeCardReducer } from './card-view/reducers';
import { changeLoaderReducer } from './loader/reducers';
import { IUiState } from './types';

export const createUiReducer = () =>
    combineReducers<IUiState>({
        cardView: changeCardReducer,
        loaders: changeLoaderReducer,
    });
