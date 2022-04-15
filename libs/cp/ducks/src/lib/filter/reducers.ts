import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { clearFilter, setFilter, setNameFilter } from './actions';
import { IFilterState, IFilters } from './types';

const defaultState = {
    'ipbe_filter[company]': undefined,
    'ipbe_filter[name]': undefined,
    'ipbe_filter[timecode]': undefined, // add later
    'ipbe_filter[node]': undefined,
    'ipbe_filter[status]': undefined, // add later
    'ipbe_filter[itemsPerPage]': undefined,
};

export const changeFilterReducer = createReducer<IFilterState>(defaultState, {
    [clearFilter.type]: (state) => {
        state = defaultState;
    },
    [setNameFilter.type]: (state, action: PayloadAction<string>) => {
        const { payload } = action;
        state['ipbe_filter[name]'] = payload;
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
                default:
                    return;
            }
        }
    },
});
