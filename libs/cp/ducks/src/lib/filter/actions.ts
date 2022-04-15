import { makeDuckActionFactory } from '../utils';

const createAction = makeDuckActionFactory('filter');

export const clearFilter = createAction('CLEAR_FILTER');

export const setFilter = createAction<URLSearchParams, 'SET_FILTER'>(
    'SET_FILTER'
);

export const setNameFilter = createAction<string, 'SET_NAME_FILTER'>(
    'SET_NAME_FILTER'
);

export const applyFilter = createAction('APPLY_FILTER');

// export type IFilterState = {
//     'ipbe_filter[company]'?: number;
//     'ipbe_filter[name]'?: string;
//     'ipbe_filter[timecode]'?: string;
//     'ipbe_filter[node]'?: number;
//     'ipbe_filter[status]'?: string;
//     'ipbe_filter[itemsPerPage]'?: number;
// };
