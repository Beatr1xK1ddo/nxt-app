import { IRootState } from './../../types';
import { createSelector } from '@reduxjs/toolkit';

export const getUiRootState = (state: IRootState) => state.ui;

export const getCardViewMode = createSelector(
    getUiRootState,
    (ui) => ui.cardView
);
