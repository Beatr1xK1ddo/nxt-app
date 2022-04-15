import { IFilterState } from './types';
import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../types';
import { IFilters } from './types';

export const getFilterState = (state: IRootState) => state.filter;

export const getNotEmptyFilters = createSelector(getFilterState, (filter) => {
    const result: IFilterState = {
        [IFilters.itemsPerPage]: filter[IFilters.itemsPerPage],
        page: filter[IFilters.page],
    };

    const keys = Object.values(IFilters) as IFilters[];

    for (const key of keys) {
        if (key === IFilters.itemsPerPage || key === IFilters.page) {
            continue;
        }

        if (filter[key]) {
            result[key] = filter[key];
        }
    }

    return result;
});

export const getPaginationFilters = createSelector(getFilterState, (filter) => {
    const page = +filter['page'];
    const pages = +filter[IFilters.itemsPerPage];
    const end = pages * page;
    const diff = end - pages;
    const start = diff || 1;

    return [start, end];
});
