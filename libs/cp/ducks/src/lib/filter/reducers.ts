import { createReducer, PayloadAction, current } from '@reduxjs/toolkit';
import {
    clearFilter,
    setFilter,
    setItemsPerPageFilter,
    setNameFilter,
    setPageFilter,
    setStatusFilter,
    setTimecodeFilter,
} from './actions';
import { IFilterState, IFilters, EItemsPerPage } from './types';

const defaultState = {
    'ipbe_filter[company]': undefined,
    'ipbe_filter[name]': undefined,
    'ipbe_filter[timecode]': undefined, // add later
    'ipbe_filter[node]': undefined,
    'ipbe_filter[status]': undefined, // add later
    'ipbe_filter[itemsPerPage]': EItemsPerPage.fifty,
    page: '1',
};

export const changeFilterReducer = createReducer<IFilterState>(defaultState, {
    [clearFilter.type]: (state) => defaultState,
    [setPageFilter.type]: (state, action: PayloadAction<number>) => {
        const { payload } = action;
        state.page = payload.toString();
    },
    [setNameFilter.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state[IFilters.name] = payload;
    },
    [setItemsPerPageFilter.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state[IFilters.itemsPerPage] = payload;
    },
    [setStatusFilter.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state[IFilters.status] = payload;
    },
    [setTimecodeFilter.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state[IFilters.timecode] = payload;
    },
    [setFilter.type]: (state, action: PayloadAction<URLSearchParams>) => {
        const { payload } = action;
        for (const key of payload.keys()) {
            switch (key) {
                case IFilters.name:
                    state[key] = payload.get(key) as string;
                    break;
                case IFilters.company:
                    state[key] = payload.get(key) as string;
                    break;
                case IFilters.node:
                    state[key] = payload.get(key) as string;
                    break;
                case IFilters.itemsPerPage:
                    state[key] = payload.get(key) as string;
                    break;
                case IFilters.page:
                    state[key] = payload.get(key) as string;
                    break;
                default:
                    return;
            }
        }
    },
});
