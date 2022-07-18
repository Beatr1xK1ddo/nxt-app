import {createAsyncThunk, createSlice, PayloadAction, isAnyOf} from "@reduxjs/toolkit";
import api from "@nxt-ui/cp/api";
import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    EChooseActions,
    EListViewMode,
    EIpbeTimeCode,
    EItemsPerPage,
    IIpbeListItem,
    IListData,
} from "@nxt-ui/cp/types";
import {searchParamsHandler} from "@nxt-ui/shared/utils";

import {IIpbeListState, IIpbeListStateFilter, IIpbeListStateFilterByKeyActionPayload} from "./types";
import {ipbeListItemMapper} from "./utils";
import {ipbeEditActions} from "../actions";
import {commonActions} from "../../common";
export const IPBE_LIST_SLICE_NAME = "list";
const IPBE_FILTER_NAME_KEY = "ipbe_filter[name]";
const IPBE_FILTER_NODE_ID_KEY = "ipbe_filter[node]";
const IPBE_FILTER_COMPANY_ID_KEY = "ipbe_filter[company]";
const IPBE_FILTER_STATUS_KEY = "ipbe_filter[status]";
const IPBE_FILTER_TIME_CODE_KEY = "ipbe_filter[timecode]";
const IPBE_FILTER_ITEMS_PER_PAGE_KEY = "ipbe_filter[itemsPerPage]";
const IPBE_FILTER_PAGE_KEY = "page";

const filterClearState: IIpbeListStateFilter = {
    name: "",
    nodeId: null,
    companyId: null,
    status: null,
    timeCode: null,
    pagination: {
        page: 1,
        itemsPerPage: EItemsPerPage.twentyFour,
        itemsCount: 0,
        pagesCount: 0,
    },
    urlSearchParams: "?page=1&ipbe_filter%5BitemsPerPage%5D=24",
};
function prepareFilterState(): IIpbeListStateFilter {
    const filter: IIpbeListStateFilter = {
        ...filterClearState,
        pagination: {
            ...filterClearState.pagination,
        },
    };
    const {searchParams, updateSearchParams} = searchParamsHandler(window.location.search);
    if (window.location.search) {
        //todo: make a method to obtain this values
        const name = searchParams.get(IPBE_FILTER_NAME_KEY);
        const nodeId = searchParams.get(IPBE_FILTER_NODE_ID_KEY);
        const companyId = searchParams.get(IPBE_FILTER_COMPANY_ID_KEY);
        const status = searchParams.get(IPBE_FILTER_STATUS_KEY) as EAppGeneralStatus;
        const timeCode = searchParams.get(IPBE_FILTER_TIME_CODE_KEY) as EIpbeTimeCode;
        const page = searchParams.get(IPBE_FILTER_PAGE_KEY);
        const itemsPerPage = searchParams.get(IPBE_FILTER_ITEMS_PER_PAGE_KEY);
        if (name) filter.name = name;
        if (nodeId) filter.nodeId = Number.parseInt(nodeId) || null;
        if (companyId) filter.companyId = Number.parseInt(companyId) || null;
        if (status) filter.status = EAppGeneralStatus[status];
        if (timeCode) filter.timeCode = EIpbeTimeCode[timeCode];
        if (page) filter.pagination.page = Number.parseInt(page) || 1;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        //todo: make enum builder
        if (itemsPerPage) filter.pagination.itemsPerPage = EItemsPerPage[itemsPerPage] || EItemsPerPage.twentyFour;
        updateSearchParams(IPBE_FILTER_NAME_KEY, filter.name);
        updateSearchParams(IPBE_FILTER_NODE_ID_KEY, filter.nodeId);
        updateSearchParams(IPBE_FILTER_COMPANY_ID_KEY, filter.companyId);
        updateSearchParams(IPBE_FILTER_STATUS_KEY, filter.status);
        updateSearchParams(IPBE_FILTER_TIME_CODE_KEY, filter.timeCode);
    }
    updateSearchParams(IPBE_FILTER_PAGE_KEY, filter.pagination.page);
    updateSearchParams(IPBE_FILTER_ITEMS_PER_PAGE_KEY, filter.pagination.itemsPerPage);
    filter.urlSearchParams = searchParams.toString();
    return filter;
}

const filterInitialState = prepareFilterState();
const initialState: IIpbeListState = {
    mode: EListViewMode.card,
    filter: filterInitialState,
    data: [],
    status: EDataProcessingStatus.fetchRequired,
    error: null,
    action: null,
    selected: [],
};
export const fetchIpbes = createAsyncThunk(
    `${IPBE_LIST_SLICE_NAME}/fetchIpbes`,
    async (filter: IIpbeListStateFilter) => {
        const response = await api.ipbe.fetchIpbes(filter.urlSearchParams);
        const result: IListData<IIpbeListItem> = {
            data: response.data.map(ipbeListItemMapper),
            total: response.total,
        };
        return result;
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
        setIpbeListViewMode(state, action: PayloadAction<EListViewMode>) {
            state.mode = action.payload;
        },
        //pagination
        setIpbeListPage: (state, action: PayloadAction<number>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            state.filter.pagination.page = action.payload;
            state.filter.urlSearchParams = updateSearchParams(IPBE_FILTER_PAGE_KEY, action.payload).toString();
        },
        setIpbeListItemsPerPage: (state, action: PayloadAction<EItemsPerPage>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            const itemsPerPage = action.payload;
            state.filter.pagination.itemsPerPage = itemsPerPage;
            state.filter.pagination.pagesCount =
                itemsPerPage === EItemsPerPage.all
                    ? 1
                    : Math.ceil(state.filter.pagination.itemsCount / Number.parseInt(itemsPerPage));
            state.filter.urlSearchParams = updateSearchParams(IPBE_FILTER_ITEMS_PER_PAGE_KEY, itemsPerPage).toString();
        },
        //filter
        resetIpbeListFilter: (state) => {
            state.filter = filterClearState;
        },
        setAction: (state, action: PayloadAction<keyof typeof EChooseActions>) => {
            const {payload} = action;
            state.action = payload;
        },
        setSelected: (state, action: PayloadAction<number>) => {
            const {payload} = action;
            state.selected.push(payload);
        },
        removeSelected: (state, action: PayloadAction<number>) => {
            const {payload} = action;
            state.selected = state.selected.filter((id) => id !== payload);
        },
        setIpbeListFilter: (state, action: PayloadAction<Partial<IIpbeListStateFilter>>) => {
            state.filter = {...state.filter, ...action.payload};
            const {searchParams, updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            updateSearchParams(IPBE_FILTER_NAME_KEY, state.filter.name);
            updateSearchParams(IPBE_FILTER_NODE_ID_KEY, state.filter.nodeId);
            updateSearchParams(IPBE_FILTER_COMPANY_ID_KEY, state.filter.companyId);
            updateSearchParams(IPBE_FILTER_STATUS_KEY, state.filter.status);
            updateSearchParams(IPBE_FILTER_TIME_CODE_KEY, state.filter.timeCode);
            updateSearchParams(IPBE_FILTER_PAGE_KEY, state.filter.pagination.page);
            updateSearchParams(IPBE_FILTER_ITEMS_PER_PAGE_KEY, state.filter.pagination.itemsPerPage);
            state.filter.urlSearchParams = searchParams.toString();
        },
        setIpbeListFilterByKey: (state, action: PayloadAction<IIpbeListStateFilterByKeyActionPayload>) => {
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
                    // eslint-disable-next-line no-case-declarations
                    const statusPayload = Object.values(EAppGeneralStatus).includes(filterValue as EAppGeneralStatus);
                    if (filterValue === null || statusPayload) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        state.filter.status = filterValue;
                        updateSearchParams(IPBE_FILTER_STATUS_KEY, filterValue);
                    }
                    break;
                case "timeCode":
                    // eslint-disable-next-line no-case-declarations
                    const timeCodePayload = Object.values(EIpbeTimeCode).includes(filterValue as EIpbeTimeCode);
                    if (filterValue === null || timeCodePayload) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            .addCase(fetchIpbes.fulfilled, (state, action: PayloadAction<IListData<IIpbeListItem>>) => {
                state.status = EDataProcessingStatus.succeeded;
                //@ts-ignore
                state.data = action.payload.data;
                state.filter.pagination.itemsCount = action.payload.total;
                state.filter.pagination.pagesCount =
                    state.filter.pagination.itemsPerPage === EItemsPerPage.all
                        ? 1
                        : Math.ceil(action.payload.total / Number.parseInt(state.filter.pagination.itemsPerPage));
            })
            .addCase(fetchIpbes.rejected, (state, action) => {
                state.status = EDataProcessingStatus.failed;
                state.error = action.error.message || null;
            })
            .addMatcher(
                isAnyOf(
                    commonActions.applicationActions.removeApplications.fulfilled,
                    ipbeEditActions.updateIpbe.fulfilled
                ),
                (state) => {
                    state.status = EDataProcessingStatus.fetchRequired;
                }
            );
    },
});
//export reducer by default
export default ipbeListSlice.reducer;
