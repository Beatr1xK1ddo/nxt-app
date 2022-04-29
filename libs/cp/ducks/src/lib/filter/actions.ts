import {makeDuckActionFactory} from "../utils";

const createAction = makeDuckActionFactory("filter");

export const clearFilter = createAction("CLEAR_FILTER");

export const setFilter = createAction<URLSearchParams, "SET_FILTER">("SET_FILTER");

export const setNameFilter = createAction<string, "SET_NAME_FILTER">("SET_NAME_FILTER");

export const setStatusFilter = createAction<string, "SET_STATUS_FILTER">("SET_STATUS_FILTER");
export const setNodeFilter = createAction<number, "SET_NODE_FILTER">("SET_NODE_FILTER");
export const setCompanyFilter = createAction<number, "SET_COMPANY_FILTER">("SET_COMPANY_FILTER");

export const setTimecodeFilter = createAction<string, "SET_TIMECODE_FILTER">("SET_TIMECODE_FILTER");
export const setItemsPerPageFilter = createAction<string, "SET_ITEMS_PER_PAGE_FILTER">(
    "SET_ITEMS_PER_PAGE_FILTER"
);

export const applyFilter = createAction("APPLY_FILTER");

export const setPageFilter = createAction<number, "SET_PAGE_FILTER">("SET_PAGE_FILTER");
