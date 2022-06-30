import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {EAppType, EDataProcessingStatus, ICompaniesListItem, IListData} from "@nxt-ui/cp/types";
import api from "@nxt-ui/cp/api";

import {ICompaniesState} from "./types";
import {companyMapper} from "./utils";

export const COMPANIES_SLICE_NAME = "companies";

export const fetchCompanies = createAsyncThunk(`${COMPANIES_SLICE_NAME}/fetchCompanies`, async (appType?: EAppType) => {
    const response = await api.common.fetchCompanies(appType);
    const result: IListData<ICompaniesListItem> = {
        data: response.data.map(companyMapper),
        total: response.total,
    };
    return result;
});

export const companiesAdapter = createEntityAdapter<ICompaniesListItem>({
    sortComparer: (one, another) => one.name.localeCompare(another.name),
});

const initialState: ICompaniesState = {
    data: companiesAdapter.getInitialState(),
    status: EDataProcessingStatus.idle,
};

//state slice itself
export const companiesSlice = createSlice({
    name: COMPANIES_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = EDataProcessingStatus.loading;
            })
            .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<IListData<ICompaniesListItem>>) => {
                state.status = EDataProcessingStatus.succeeded;
                companiesAdapter.setAll(state.data, action.payload.data);
            })
            .addCase(fetchCompanies.rejected, (state) => {
                state.status = EDataProcessingStatus.failed;
            });
    },
});

//export reducer by default
export default companiesSlice.reducer;
