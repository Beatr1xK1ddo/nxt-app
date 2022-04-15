import { IFilterState } from './types';
import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../types';
import { IFilters } from './types';

export const getFilterState = (state: IRootState) => state.filter;

export const getNotEmptyFilters = createSelector(getFilterState, (filter) => {
    const result: IFilterState = {};
    const keys = Object.keys(filter) as IFilters[];
    for (const key of keys) {
        if (filter[key]) {
            result[key] = filter[key];
        }
    }

    return result;
});
