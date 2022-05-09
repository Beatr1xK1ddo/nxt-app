import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {EAppGeneralStatus, EDataProcessingStatus, EIpbeListViewMode} from "@nxt-ui/cp/types";
import {IIpbeListState, IIpbeListStateFilter, IIpbeListStateFilterActionPayload} from "./types";
import {ETimeCodeType, IIpbeListApiResponse, NxtAPI} from "@nxt-ui/cp/api";
import {searchParamsHandler} from "@nxt-ui/shared/utils";

export const IPBE_LIST_SLICE_NAME = "list";
const IPBE_FILTER_NAME_KEY = "ipbe_filter[name]";
const IPBE_FILTER_NODE_ID_KEY = "ipbe_filter[node]";
const IPBE_FILTER_COMPANY_ID_KEY = "ipbe_filter[company]";
const IPBE_FILTER_STATUS_KEY = "ipbe_filter[status]";
const IPBE_FILTER_TIME_CODE_KEY = "ipbe_filter[timecode]";
const IPBE_FILTER_ITEMS_PER_PAGE_KEY = "ipbe_filter[itemsPerPage]";
const IPBE_FILTER_PAGE_KEY = "page";
const IPBE_FILTER_ITEMS_PER_PAGE_DEFAULT_VALUE = 10;

const filterInitialState: IIpbeListStateFilter = {
    name: "",
    nodeId: null,
    companyId: null,
    status: null,
    timeCode: null,
    pagination: {
        page: 1,
        itemsPerPage: IPBE_FILTER_ITEMS_PER_PAGE_DEFAULT_VALUE,
        itemsCount: 0,
        pagesCount: 0,
    },
    urlSearchParams: "",
};
const initialState: IIpbeListState = {
    mode: EIpbeListViewMode.list,
    filter: filterInitialState,
    data: [],
    status: EDataProcessingStatus.idle,
    error: null,
};
export const fetchIpbes = createAsyncThunk(
    `${IPBE_LIST_SLICE_NAME}/fetchIpbes`,
    async (filter: IIpbeListStateFilter) => {
        const response = await NxtAPI.fetchIpbes(filter.urlSearchParams);
        return response as IIpbeListApiResponse;
    }
);

//state slice itself
export const ipbeListSlice = createSlice({
    name: IPBE_LIST_SLICE_NAME,
    initialState,
    reducers: {
        //change state
        reloadIpbeListData(state) {
            state.status = EDataProcessingStatus.fetchRequired;
        },
        //list view mode
        setIpbeListViewMode(state, action: PayloadAction<EIpbeListViewMode>) {
            state.mode = action.payload;
        },
        //pagination
        setIpbeListPage: (state, action: PayloadAction<number>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            state.filter.pagination.page = action.payload;
            state.filter.urlSearchParams = updateSearchParams(IPBE_FILTER_PAGE_KEY, action.payload).toString();
        },
        setIpbeListItemsPerPage: (state, action: PayloadAction<number>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            state.filter.pagination.itemsPerPage = action.payload;
            state.filter.pagination.pagesCount = Math.ceil(state.filter.pagination.itemsCount / action.payload);
            state.filter.urlSearchParams = updateSearchParams(IPBE_FILTER_ITEMS_PER_PAGE_KEY, action.payload).toString();
        },
        //filter
        resetIpbeListFilter: (state) => {
            state.filter = filterInitialState;
        },
        setIpbeListFilterFromUrl: (state, action: PayloadAction<string>) => {
            const {searchParams, updateSearchParams} = searchParamsHandler(action.payload);
            //todo: make a method for this values obtaining
            const name = searchParams.get(IPBE_FILTER_NAME_KEY);
            const nodeId = searchParams.get(IPBE_FILTER_NODE_ID_KEY);
            const companyId = searchParams.get(IPBE_FILTER_COMPANY_ID_KEY);
            const status = searchParams.get(IPBE_FILTER_STATUS_KEY) as EAppGeneralStatus;
            const timeCode = searchParams.get(IPBE_FILTER_TIME_CODE_KEY) as ETimeCodeType;
            const page = searchParams.get(IPBE_FILTER_PAGE_KEY);
            const itemsPerPage = searchParams.get(IPBE_FILTER_ITEMS_PER_PAGE_KEY);
            if (name) state.filter.name = name;
            if (nodeId) state.filter.nodeId = Number.parseInt(nodeId) || null;
            if (companyId) state.filter.companyId = Number.parseInt(companyId) || null;
            if (status) state.filter.status = EAppGeneralStatus[status];
            if (timeCode) state.filter.timeCode = ETimeCodeType[timeCode];
            if (page) state.filter.pagination.page = Number.parseInt(page) || 1;
            if (itemsPerPage) state.filter.pagination.itemsPerPage = Number.parseInt(itemsPerPage) || IPBE_FILTER_ITEMS_PER_PAGE_DEFAULT_VALUE;
            updateSearchParams(IPBE_FILTER_NAME_KEY, state.filter.name);
            updateSearchParams(IPBE_FILTER_NODE_ID_KEY, state.filter.nodeId);
            updateSearchParams(IPBE_FILTER_COMPANY_ID_KEY, state.filter.companyId);
            updateSearchParams(IPBE_FILTER_STATUS_KEY, state.filter.status);
            updateSearchParams(IPBE_FILTER_TIME_CODE_KEY, state.filter.timeCode);
            updateSearchParams(IPBE_FILTER_PAGE_KEY, state.filter.pagination.page);
            updateSearchParams(IPBE_FILTER_ITEMS_PER_PAGE_KEY, state.filter.pagination.itemsPerPage);
            state.filter.urlSearchParams = searchParams.toString();
        },
        setIpbeListFilter: (state, action: PayloadAction<IIpbeListStateFilterActionPayload>) => {
            const {searchParams, updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            const filterValue = action.payload.value;
            switch (action.payload.key) {
                case "name":
                    if (typeof filterValue === "string") {
                        state.filter.name = filterValue;
                        updateSearchParams(IPBE_FILTER_NAME_KEY, filterValue);
                    }
                    break;
                case "nodeId":
                    if (filterValue === null || typeof filterValue === "number") {
                        state.filter.nodeId = filterValue;
                        updateSearchParams(IPBE_FILTER_NODE_ID_KEY, filterValue);
                    }
                    break;
                case "companyId":
                    if (filterValue === null || typeof filterValue === "number") {
                        state.filter.companyId = filterValue;
                        updateSearchParams(IPBE_FILTER_COMPANY_ID_KEY, filterValue);
                    }
                    break;
                case "status":
                    const statusPayload = Object.values(EAppGeneralStatus).includes(filterValue as EAppGeneralStatus);
                    if (filterValue === null || statusPayload) {
                        // @ts-ignore
                        state.filter.status = filterValue;
                        updateSearchParams(IPBE_FILTER_STATUS_KEY, filterValue);
                    }
                    break;
                case "timeCode":
                    const timeCodePayload = Object.values(ETimeCodeType).includes(filterValue as ETimeCodeType);
                    if (filterValue === null || timeCodePayload) {
                        // @ts-ignore
                        state.filter.timeCode = filterValue;
                        updateSearchParams(IPBE_FILTER_TIME_CODE_KEY, filterValue);
                    }
                    break;
            }
            state.filter.urlSearchParams = searchParams.toString();
        },
    },
    //data
    extraReducers(builder) {
        builder
            .addCase(fetchIpbes.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchIpbes.fulfilled, (state, action: PayloadAction<IIpbeListApiResponse>) => {
                state.status = EDataProcessingStatus.succeeded;
                state.data = action.payload.data;
                state.filter.pagination.itemsCount = action.payload.total;
                state.filter.pagination.pagesCount = Math.ceil(action.payload.total / state.filter.pagination.itemsPerPage);
            })
            .addCase(fetchIpbes.rejected, (state, action) => {
                state.status = EDataProcessingStatus.failed;
                state.error = action.error.message || null;
            });
    },
});

//export reducer by default
export default ipbeListSlice.reducer;
