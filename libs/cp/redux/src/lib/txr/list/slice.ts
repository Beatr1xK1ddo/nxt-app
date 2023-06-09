import {createAsyncThunk, createSlice, PayloadAction, isAnyOf} from "@reduxjs/toolkit";
import api from "@nxt-ui/cp/api";
import {
    EAppGeneralStatus,
    EDataProcessingStatus,
    ETxrChooseActions,
    EListViewMode,
    EItemsPerPage,
    ITxrListItem,
    IListData,
} from "@nxt-ui/cp/types";
import {searchParamsHandler} from "@nxt-ui/shared/utils";

import {ITxrListState, ITxrListStateFilter, ITxrListStateFilterByKeyActionPayload} from "./types";
import {txrListItemMapper} from "./utils";
import {txrEditActions} from "../actions";
import {commonActions} from "../../common";
export const TXR_LIST_SLICE_NAME = "list";
const TXR_FILTER_NAME_KEY = "filter[name]";
const TXR_FILTER_NODE_ID_KEY = "filter[node]";
const TXR_FILTER_COMPANY_ID_KEY = "filter[company]";
const TXR_FILTER_STATUS_KEY = "filter[status]";
const TXR_FILTER_NODE_TYPE = "filter[nodeType]";
const TXR_FILTER_APP_TYPE = "filter[appType]";
const TXR_FILTER_SERVER_ONLINE = "filter[serverOnline]";
const TXR_FILTER_ITEMS_PER_PAGE_KEY = "itemsPerPage";
const TXR_FILTER_PAGE_KEY = "page";

const filterClearState: ITxrListStateFilter = {
    name: "",
    nodeId: null,
    companyId: null,
    status: null,
    pagination: {
        page: 1,
        itemsPerPage: EItemsPerPage.twentyFour,
        itemsCount: 0,
        pagesCount: 0,
    },
    appType: null,
    nodeType: null,
    serverOnline: null,
    urlSearchParams: "?page=1&itemsPerPage=24",
};
function prepareFilterState(): ITxrListStateFilter {
    const filter: ITxrListStateFilter = {
        ...filterClearState,
        pagination: {
            ...filterClearState.pagination,
        },
    };
    const {searchParams, updateSearchParams} = searchParamsHandler(window.location.search);
    if (window.location.search) {
        //todo: make a method to obtain this values
        const name = searchParams.get(TXR_FILTER_NAME_KEY);
        const nodeId = searchParams.get(TXR_FILTER_NODE_ID_KEY);
        const companyId = searchParams.get(TXR_FILTER_COMPANY_ID_KEY);
        const status = searchParams.get(TXR_FILTER_STATUS_KEY) as EAppGeneralStatus;
        const page = searchParams.get(TXR_FILTER_PAGE_KEY);
        const itemsPerPage = searchParams.get(TXR_FILTER_ITEMS_PER_PAGE_KEY);
        const nodeType = searchParams.get(TXR_FILTER_NODE_TYPE);
        const appType = searchParams.get(TXR_FILTER_APP_TYPE);
        const serverOnline = searchParams.get(TXR_FILTER_SERVER_ONLINE);
        if (name) filter.name = name;
        if (nodeId) filter.nodeId = Number.parseInt(nodeId) || null;
        if (companyId) filter.companyId = Number.parseInt(companyId) || null;
        if (status) filter.status = EAppGeneralStatus[status];
        if (page) filter.pagination.page = Number.parseInt(page) || 1;
        //@ts-ignore
        if (nodeType) filter.nodeType = nodeType;
        //@ts-ignore
        if (appType) filter.appType = appType;
        //@ts-ignore
        if (serverOnline) filter.serverOnline = serverOnline;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        //todo: make enum builder
        if (itemsPerPage) filter.pagination.itemsPerPage = EItemsPerPage[itemsPerPage] || EItemsPerPage.twentyFour;
        updateSearchParams(TXR_FILTER_NAME_KEY, filter.name);
        updateSearchParams(TXR_FILTER_NODE_ID_KEY, filter.nodeId);
        updateSearchParams(TXR_FILTER_COMPANY_ID_KEY, filter.companyId);
        updateSearchParams(TXR_FILTER_STATUS_KEY, filter.status);
        updateSearchParams(TXR_FILTER_APP_TYPE, filter.appType);
    }
    updateSearchParams(TXR_FILTER_PAGE_KEY, filter.pagination.page);
    updateSearchParams(TXR_FILTER_ITEMS_PER_PAGE_KEY, filter.pagination.itemsPerPage);
    filter.urlSearchParams = searchParams.toString();
    return filter;
}

const filterInitialState = prepareFilterState();
const initialState: ITxrListState = {
    mode: EListViewMode.card,
    filter: filterInitialState,
    data: [],
    status: EDataProcessingStatus.fetchRequired,
    error: null,
    action: null,
};
export const fetchTxrs = createAsyncThunk(`${TXR_LIST_SLICE_NAME}/fetchTxrs`, async (filter: ITxrListStateFilter) => {
    const response = await api.txr.getItems(filter.urlSearchParams);
    const result: IListData<ITxrListItem> = {
        data: response.data.map(txrListItemMapper),
        total: response.total,
    };
    return result;
});

//state slice itself
export const txrListSlice = createSlice({
    name: TXR_LIST_SLICE_NAME,
    initialState,
    reducers: {
        //change state
        reloadTxrListData(state) {
            state.status = EDataProcessingStatus.fetchRequired;
        },
        clearTxrListData(state) {
            state.status = EDataProcessingStatus.fetchRequired;
            state.data = [];
        },
        //list view mode
        setTxrListViewMode(state, action: PayloadAction<EListViewMode>) {
            state.mode = action.payload;
        },
        //pagination
        setTxrListPage: (state, action: PayloadAction<number>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            state.filter.pagination.page = action.payload;
            state.filter.urlSearchParams = updateSearchParams(TXR_FILTER_PAGE_KEY, action.payload).toString();
        },
        setTxrListItemsPerPage: (state, action: PayloadAction<EItemsPerPage>) => {
            const {updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            const itemsPerPage = action.payload;
            state.filter.pagination.itemsPerPage = itemsPerPage;
            state.filter.pagination.pagesCount =
                itemsPerPage === EItemsPerPage.all
                    ? 1
                    : Math.ceil(state.filter.pagination.itemsCount / Number.parseInt(itemsPerPage));
            state.filter.urlSearchParams = updateSearchParams(TXR_FILTER_ITEMS_PER_PAGE_KEY, itemsPerPage).toString();
        },
        //filter
        resetTxrListFilter: (state) => {
            state.filter = filterClearState;
        },
        setAction: (state, action: PayloadAction<keyof typeof ETxrChooseActions>) => {
            const {payload} = action;
            state.action = payload;
        },
        setTxrListFilter: (state, action: PayloadAction<Partial<ITxrListStateFilter>>) => {
            state.filter = {...state.filter, ...action.payload};
            const {searchParams, updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            updateSearchParams(TXR_FILTER_NAME_KEY, state.filter.name);
            updateSearchParams(TXR_FILTER_NODE_ID_KEY, state.filter.nodeId);
            updateSearchParams(TXR_FILTER_COMPANY_ID_KEY, state.filter.companyId);
            updateSearchParams(TXR_FILTER_STATUS_KEY, state.filter.status);
            updateSearchParams(TXR_FILTER_PAGE_KEY, state.filter.pagination.page);
            updateSearchParams(TXR_FILTER_ITEMS_PER_PAGE_KEY, state.filter.pagination.itemsPerPage);
            updateSearchParams(TXR_FILTER_APP_TYPE, state.filter.appType);
            updateSearchParams(TXR_FILTER_NODE_TYPE, state.filter.nodeType);
            updateSearchParams(TXR_FILTER_SERVER_ONLINE, state.filter.serverOnline);
            state.filter.urlSearchParams = searchParams.toString();
        },
        setTxrListFilterByKey: (state, action: PayloadAction<ITxrListStateFilterByKeyActionPayload>) => {
            const {searchParams, updateSearchParams} = searchParamsHandler(state.filter.urlSearchParams);
            const filterValue = action.payload.value;
            switch (action.payload.key) {
                case "name":
                    if (typeof filterValue === "string") {
                        state.filter.name = filterValue;
                        updateSearchParams(TXR_FILTER_NAME_KEY, filterValue);
                    }
                    break;
                case "nodeId":
                    if (filterValue === null || typeof filterValue === "number") {
                        state.filter.nodeId = filterValue;
                        updateSearchParams(TXR_FILTER_NODE_ID_KEY, filterValue);
                    }
                    break;
                case "companyId":
                    if (filterValue === null || typeof filterValue === "number") {
                        state.filter.companyId = filterValue;
                        updateSearchParams(TXR_FILTER_COMPANY_ID_KEY, filterValue);
                    }
                    break;
                case "status":
                    // eslint-disable-next-line no-case-declarations
                    const statusPayload = Object.values(EAppGeneralStatus).includes(filterValue as EAppGeneralStatus);
                    if (filterValue === null || statusPayload) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        state.filter.status = filterValue;
                        updateSearchParams(TXR_FILTER_STATUS_KEY, filterValue);
                    }
                    break;
            }
            state.filter.urlSearchParams = searchParams.toString();
        },
    },
    //data
    extraReducers(builder) {
        builder
            .addCase(fetchTxrs.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchTxrs.fulfilled, (state, action: PayloadAction<IListData<ITxrListItem>>) => {
                state.status = EDataProcessingStatus.succeeded;
                //@ts-ignore
                state.data = action.payload.data;
                state.filter.pagination.itemsCount = action.payload.total;
                state.filter.pagination.pagesCount =
                    state.filter.pagination.itemsPerPage === EItemsPerPage.all
                        ? 1
                        : Math.ceil(action.payload.total / Number.parseInt(state.filter.pagination.itemsPerPage));
            })
            .addCase(fetchTxrs.rejected, (state, action) => {
                state.status = EDataProcessingStatus.failed;
                state.error = action.error.message || null;
            })
            .addMatcher(
                isAnyOf(
                    commonActions.applicationActions.removeApplications.fulfilled,
                    txrEditActions.updateTxr.fulfilled,
                    commonActions.applicationActions.cloneApplications.fulfilled
                ),
                (state) => {
                    state.status = EDataProcessingStatus.fetchRequired;
                }
            );
    },
});
//export reducer by default
export default txrListSlice.reducer;
