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

export const setPageFilter = createAction<number, 'SET_PAGE_FILTER'>(
    'SET_PAGE_FILTER'
);
